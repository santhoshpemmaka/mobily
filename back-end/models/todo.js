import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: String,
    description : String,
    dueDate : String,
    isCompeted : {
        type : Boolean,
        default : false
    }
});


const Todo = mongoose.model("todo", todoSchema);

export default Todo;