import express from "express";
import { authMiddleware } from "../middleware/userMiddleware.js";
import { handelUserSignin, handelUserSignup } from "../controller/userController.js";

const routers = express();

routers.post("/signup", handelUserSignup);
routers.post("/signin", handelUserSignin);

routers.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your profile!",
        userId: req.userId, // comes from authMiddleware
    });
});

export default routers;

