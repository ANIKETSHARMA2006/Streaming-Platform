import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/db/db_conect.js";

dotenv.config();

app.listen(process.env.PORT,async ()=>{
    await connectDB()
    console.log(`The server is up and running ${process.env.PORT}`);
})