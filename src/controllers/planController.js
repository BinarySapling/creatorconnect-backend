import Plan from "../models/Plan.js";

export const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ isActive: true }).sort({ price: 1 });
        res.status(200).json({
            success: true,
            plans,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const seedPlans = async (req, res) => {
    try {
        const plans = [
            {
                name: "Basic",
                price: 9,
                tokens: 10,
                bonusTokens: 0,
                features: ["10 Creative Tokens", "Standard Support", "Basic Assets Access"],
                isActive: true,
            },
            {
                name: "Pro",
                price: 29,
                tokens: 50,
                bonusTokens: 5,
                features: ["50 Creative Tokens", "5 Bonus Tokens", "Priority Support", "Exclusive Assets Access"],
                isActive: true,
            },
            {
                name: "Elite",
                price: 99,
                tokens: 200,
                bonusTokens: 25,
                features: ["200 Creative Tokens", "25 Bonus Tokens", "24/7 Dedicated Support", "All-Access Lifetime Pass"],
                isActive: true,
            },
        ];

        await Plan.deleteMany(); // Clear existing
        await Plan.insertMany(plans);

        res.status(201).json({
            success: true,
            message: "Plans seeded successfully with new schema",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
