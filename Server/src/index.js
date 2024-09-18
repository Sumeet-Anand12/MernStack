import { app } from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv"


dotenv.config({
    path:'./.env'
})

connectDb().then(()=>{
    app.listen(process.env.PORT || 9000,()=>{
        console.log(`server running on port : ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(" Connection Failed from Index.js File May be wifi not connected", err)
});