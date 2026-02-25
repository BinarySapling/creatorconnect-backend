import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dropIndex = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/creatorconnect"); // Assuming default URI, check if needed
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const collection = db.collection("plans");

        await collection.dropIndex("planId_1");
        console.log("Successfully dropped planId_1 index");

        process.exit(0);
    } catch (error) {
        console.error("Error dropping index:", error.message);
        process.exit(1);
    }
};

dropIndex();
