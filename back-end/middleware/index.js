import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';


const app = express();

app.use(cookieParser());

const authMiddleware = (req,res) => {
    try {
        console.log("reached -------->", req.Cookies);
        const authToken = req.cookies.token;
        console.log("authToken ----->", authToken);
        if(!authToken){
            return res.status(403).json({
                message : "unaunthorised request"
            })
        }
        const decoded = jwt.verify(authToken,'secret');
        req.userId = decoded.id;
        next();
    }
    catch(err){
        return res.status(403).json({
            message : "Error occured auth-middler route"
        })
    }
};

export default authMiddleware;