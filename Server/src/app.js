import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
const app=express();

app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"20kb"}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//  import Router 
import userRouter from "./routes/user.routes.js"
import { ApiError } from "./utils/ApiError.js";

//  route declaration
app.use("/api/v1/users", userRouter);
app.use((err, _, res, next) => {
    if (err instanceof ApiError) {
        // Use the error's status code and message
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

});
export {app}