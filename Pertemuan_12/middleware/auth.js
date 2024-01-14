import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authrorization = req.get("Authrorization");

    const token = authrorization && authrorization.split(" ")[1];

    if (!authrorization){
        const response = {
            message: "Please Provide Token",
        };

        res.status(401).json(response);
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    }catch (error){
        const response = {
            message: "Authentication Failed",
        };
        res.status(401).json(response);
    }
};

export default auth;