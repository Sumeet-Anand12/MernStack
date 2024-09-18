import mongoose, { Types }  from "mongoose";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
       unique:true,
       validate(value){
        if(!validator.isEmail(value)){
            throw new Error("not a valid Email");
        }
       }
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
    },
   
    refreshToken: {
        type: String
    }

},{
    timestamps:true
})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next();

})
userSchema.pre("save",async function(next){
    if(!this.isModified("cpassword")) return next();
    this.cpassword=await bcrypt.hash(this.cpassword,10)
    next();

})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export  const User=mongoose.model("User", userSchema)