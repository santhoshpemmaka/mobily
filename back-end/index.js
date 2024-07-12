import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoute.js';
import todoRoutes from './routes/todoRoute.js';

const mognooseURI = "mongodb+srv://santhoshpemmaka:ygbqtxWRdusk1KKD@cluster0.qyzqtwb.mongodb.net/todoList";

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
    return res.status(200).json({
        healtht: "UP"
    })
});

app.use("/api/v1",userRoutes);
app.use("/api/v1", todoRoutes);
// To reduce preflight deplay add logic

const corsOptions = {
    optionsSuccessStatus: 204,
  };
  app.options("*", cors(corsOptions)); // Enable preflight requests for all routes
  app.use(cors(corsOptions)); // Enable CORS for all routes
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    // Set caching headers for preflight response
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Max-Age", "86400"); // Cache preflight response for 1 hour (in seconds)
    }
    req.next();
});
  
mongoose.set("strictQuery", false); // overcome deploy error


mongoose.connect(mognooseURI).then(() => {
    console.log("mongoose is connected")
    app.listen(3000, () => {
        console.log("Server is running port on 3000");
    })
});


