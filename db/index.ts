import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default async function connect() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        // await mongoose.connect(process.env.DB_URL!);
        await mongoose.connect("mongodb+srv://olivier:20Olli07@games.pvwimyj.mongodb.net/games");

        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
}
