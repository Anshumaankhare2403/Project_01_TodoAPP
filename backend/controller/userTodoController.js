import Todo from "../model/todoList.js";

export const handelTodoListCreate = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        const todoData = await Todo.create({
            user: req.userId,
            title,
            description,
            dueDate,
            priority
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo: todoData,
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });

    }

}





export const handelTodoListGet = async (req, res) => {
    try {
        const todosData = await Todo.find({ user: req.userId });
        res.status(200).json(todosData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error: error.message });
    }

}


export const handelTodoListDeleting = async (req, res) => {
    try {
        const { id } = req.params; // take id from URL like /todos/:id

        const deletedTodo = await Todo.findOneAndDelete({
            _id: id,
            user: req.userId, // ensure user can delete only their own todo
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



