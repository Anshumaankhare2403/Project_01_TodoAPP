import express from "express";
import cors from "cors";

import dbConnection from "./connection/dbConnection.js";
import routers from "./router/userRoutes.js";
import Todorouter from "./router/todoRoutes.js";



const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/Project_01_TODOAPP";

app.use(cors());
app.use(express.json());
// DB is connected 
dbConnection(url)


app.use("/api/users", routers);
app.use("/todolist", Todorouter);




app.listen(PORT, console.log("Server is Started"));