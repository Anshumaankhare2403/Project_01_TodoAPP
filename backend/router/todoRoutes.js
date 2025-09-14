import express from "express";
import { authMiddleware } from "../middleware/userMiddleware.js";
import { handelTodoListCreate, handelTodoListDeleting, handelTodoListGet } from "../controller/userTodoController.js";
const Todorouter = express();

// All routes need login
Todorouter.post("/todocreate", authMiddleware, handelTodoListCreate);   // Create todo
Todorouter.get("/todoget", authMiddleware, handelTodoListGet); // Get all
Todorouter.delete("/tododeleting/:id", authMiddleware, handelTodoListDeleting); // Delete
// Todorouter.get("/", authMiddleware, getTodos);      // Get all todos
// Todorouter.put("/:id", authMiddleware, updateTodo); // Update todo
// Todorouter.delete("/:id", authMiddleware, deleteTodo); // Delete todo

export default Todorouter;
