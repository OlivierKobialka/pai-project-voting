import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL!);

        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
}
