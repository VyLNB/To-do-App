import mongoose from 'mongoose';

const ToDoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const ToDoModel = mongoose.model('ToDoItems', ToDoSchema, 'ToDoItems');

export default ToDoModel;