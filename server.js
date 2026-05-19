import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/db/db_conect.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { urlencoded } from "express";

dotenv.config();

app.use(cors({
    origin:process.env.CORS_ORIGIN
}));

app.use(express.json({limit:"16kb"}))

app.use(urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

connectDB()
.then(
    app.listen(process.env.PORT || 8000,()=>{
        console.log('THE SERVER IS UP AND RUNNING');
    })
)
.catch((err)=>{
    console.log(err);
})