import express from 'express';
import Todo from '../models/todo.js';
import authMiddleware from '../middleware/index.js';
const routes = express.Router();


routes.get("/", async(req,res) => {
    try{
        const todoLists = await Todo.find({});
        if(!todoLists){
            return res.status(200).json({
                message : "Todo list is empty right now. Try with add todo list!"
            })
        }
        return res.status(200).json({
            todos : todoLists
        });
    }
    catch(err){
        return res.status(500).json({
            message : "Error occured" + err ??  "todo get router"
        })
    }
});

routes.post("/",async(req,res) => {
    try{
        const {title,description,dueDate} = req.body;
        if(!title || !description || !dueDate){
            return res.status(411).json({
                message : "Give me all input mandatory fields"
            })
        }
        const createTodo = await Todo.create({
            title,
            description,
            dueDate
        });
        return res.status(200).json({
            message : "Todo list created successfully!",
            id : createTodo._id
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Error occured" + err ??  "todo post router"
        })
    }
})



export default routes;