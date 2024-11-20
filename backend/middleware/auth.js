import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    // Check if token exists
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please log in again." });
    }

    try {
        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to the request object
        req.body.userId = token_decode._id;
        next();

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error with authentication" });
    }
};

export default authMiddleware;
