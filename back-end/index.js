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
    console.log("-----reached");
    return res.status(200).json({
        healtht: "UP"
    })
});

app.use("/api/v1",userRoutes);
app.use("/api/v1",todoRoutes);


mongoose.connect(mognooseURI).then(() => {
    console.log("mongoose is connected")
    app.listen(3000, () => {
        console.log("Server is running port on 3000");
    })
});


