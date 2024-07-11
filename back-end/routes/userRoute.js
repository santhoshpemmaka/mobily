import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import cookieParser from 'cookie-parser'
const routes = express.Router();

const app = express();

app.use(cookieParser());

routes.post("/signup",async(req,res) => {
    try{
        const {email,firstName,lastName,password} = req.body;
        if(!email || !firstName || !lastName || !password){
            return res.status(411).json({
                message : "Incorrect inputs"
            })
        };
        const existingUser = await User.findOne({email : email});
        if(existingUser){
            return res.status(200).json({
                message : "User already exists, Try with different Email Id"
            })
        };

        const createUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });
        const token = jwt.sign({id:createUser._id},"secret");
        res.cookie("token",token);
        return res.status(200).json({
            message : "User created sucessfully",
            token : token
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Error occured" + err ??  "signup router"
        })
    }
});


routes.post("/signin", async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(411).json({
                message : "Invalid inputs"
            })
        }
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(411).json({
                message : "Error while loggin in"
            })
        }
        const token = jwt.sign({id:userExists._id},"secret");
        res.cookie("token",token)
        return res.status(200).json({
            token : token
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Error occured "+ err ?? "Sigin router"
        })
    }
});

routes.post("/signout",async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(411).json({
                message : "Invalid inputs"
            })
        }
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(411).json({
                message : "Error while log out"
            })
        }
        res.clearCookie("token");
        return res.status(200).json({
            message : "user logout successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            message : "Error occured "+ err ?? "signout router"
        })
    }
})

export default routes;