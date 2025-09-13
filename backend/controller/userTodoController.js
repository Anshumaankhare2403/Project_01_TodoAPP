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



