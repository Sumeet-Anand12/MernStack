import mongoose from "mongoose";


const connectDb= async ()=>{
      
    try {
          const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
          console.log(`connected to database !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("DB connection FAiled !! from db/index.js file", err);
        process.exit(1);
        
    }

}
export default connectDb