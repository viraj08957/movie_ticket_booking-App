import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js"; // Ensure the DB_NAME constant is correctly set

const connectDB = async () => {
    try {
        const connectionString = `${process.env.MONGODB_URI}${DB_NAME}`;
        const connectionInstance = await mongoose.connect(connectionString);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;
