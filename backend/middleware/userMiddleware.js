import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const Token = req.headers.authorization?.split(" ")[1];

    if (!Token) {
        res.status(401).json({ massage: "No Token , not allowed!" });
    }
    try {
        const decode = jwt.verify(Token, "TodoAPP");
        req.userId = decode.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token!" });
    }
}