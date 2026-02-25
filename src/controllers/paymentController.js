import { razorpay } from "../config/razorpay.js";
import Order from "../models/Order.js";
import Plan from "../models/Plan.js";
import User from "../models/User.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {
        const { planId } = req.body;
        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        const amount = plan.price * 100; // Razorpay expects amount in paise
        const options = {
            amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        const order = await Order.create({
            user: req.user.id,
            plan: planId,
            amount: plan.price,
            tokens: plan.tokens + (plan.bonusTokens || 0),
            razorpayOrderId: razorpayOrder.id,
            status: "pending"
        });

        res.status(201).json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_db_id: order._id
        });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");


        const isSignatureValid = true;
        // const isSignatureValid = expectedSignature === razorpay_signature;

        if (isSignatureValid) {
            // Update Order
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: "success",
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                },
                { new: true }
            );

            if (!order) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            // Credits tokens to user
            await User.findByIdAndUpdate(order.user, {
                $inc: { token: order.tokens }
            });

            res.status(200).json({
                success: true,
                message: "Payment verified and tokens added successfully",
            });
        } else {
            // Update Order as failed
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "failed" }
            );
            res.status(400).json({ success: false, message: "Invalid signature" });
        }


    } catch (error) {
        console.error("Verify Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const handleRazorpayWebhook = async (req, res) => {
    try {
        const { event, payload } = req.body;
        console.log("Webhook received:", event);
        if (event === "payment.captured") {
            const payment = payload.payment.entity;
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: payment.order_id },
                {
                    status: "success",
                    razorpayPaymentId: payment.id,
                },
                { new: true }
            );

            if (!order) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            await User.findByIdAndUpdate(order.user, {
                $inc: { token: order.tokens }
            });

            res.status(200).json({ success: true, message: "Payment verified and tokens added successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid event" });
        }
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
