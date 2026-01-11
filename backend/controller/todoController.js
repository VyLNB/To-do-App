import ToDoModel from "../model/ToDoModel.js";

// lấy tất cả công việc
export const getAllToDos = async (req, res) => {
    try {
        const todos = await ToDoModel.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách công việc", error });
    }
};

export const getToDoById = async (req, res) => {
    try {
        const todo = await ToDoModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Không tìm thấy công việc" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy công việc", error });
    }
}

// tạo công việc mới
export const createToDo = async (req, res) => {

    const newToDo = new ToDoModel({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed ?? false
    });

    try {
        const savedToDo = await newToDo.save();
        res.status(201).json(savedToDo);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo công việc", error });
    }
};

// cập nhật công việc
export const updateTodo = async (req, res) => {
    try {       
        const todo = await ToDoModel.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }  
        );
        
        if (!todo) {
            return res.status(404).json({ message: "Không tìm thấy công việc" });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Lỗi khi cập nhật công việc", error: error.message });
    }
};