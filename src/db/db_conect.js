import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB(){
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is connected");
} catch (error) {
    console.log(error);
}
}

export {connectDB}