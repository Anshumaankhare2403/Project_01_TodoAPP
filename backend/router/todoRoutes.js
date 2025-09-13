import express from "express";
import { authMiddleware } from "../middleware/userMiddleware.js";
import { handelTodoListCreate } from "../controller/userTodoController.js";
const Todorouter = express();

// All routes need login
Todorouter.post("/todocreate", authMiddleware, handelTodoListCreate);   // Create todo
// Todorouter.get("/", authMiddleware, getTodos);      // Get all todos
// Todorouter.put("/:id", authMiddleware, updateTodo); // Update todo
// Todorouter.delete("/:id", authMiddleware, deleteTodo); // Delete todo

export default Todorouter;
