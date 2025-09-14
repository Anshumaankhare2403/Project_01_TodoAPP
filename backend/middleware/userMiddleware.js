import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token, not allowed!" }); // ✅ return
    }

    try {
        const decoded = jwt.verify(token, "TodoAPP"); // use process.env.JWT_SECRET in real apps
        req.userId = decoded.id;
        return next(); // ✅ only call next if everything is fine
    } catch (error) {
        return res.status(401).json({ message: "Invalid token!" }); // ✅ return
    }
};
