import express from 'express';
import { createToDo, getAllToDos, updateTodo, getToDoById } from '../controller/todoController.js';


const router = express.Router();

router.get('/getAll', getAllToDos);
router.get('/:id', getToDoById);
router.post('/createNew', createToDo)
router.put('/:id', updateTodo)

export default router;