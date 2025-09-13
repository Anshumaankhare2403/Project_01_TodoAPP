import express from "express";


import dbConnection from "./connection/dbConnection.js";
import routers from "./router/userRoutes.js";
import Todorouter from "./router/todoRoutes.js";



const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/Project_01_TODOAPP";

app.use(express.json());
// DB is connected 
dbConnection(url)


app.use("/", routers);
app.use("/todoList", Todorouter);




app.listen(PORT, console.log("Server is Started"));