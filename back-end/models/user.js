import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    createdAt : Date
})

const User  = mongoose.model("user",userSchema);

export default User;