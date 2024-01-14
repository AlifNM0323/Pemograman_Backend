import bcrypt from "bcrypt";
import User from "../models/User.js";

class AuthController {
    async register(req, res){
        const {username, email, password} = req.body;

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
        });

        const response = {
            message: "User created successfull",
            data: newUser,
        };
        return res.status(201).json(response);
    }


    async login(req, res){
        // const { username, password } = req.body;

        // const user = await User.findOne({ where: { username: username }});
        // const match = await bcrypt.compare(password, user.password);

        // if (!user || !match) {
        //     const response = {
        //         message: "Authentication Failed",
        //     };
        //     return res.status(401).json(response);
        // }

        const payload = {
            id: user.id,
            username: user.username,
        };

        const secret = process.env.TOKEN_SECRET;
        const token = jwt.sign(patload, secret, {expiresIn: "lh" });
        
        const response = {
            message: "Login Success",
            data: {
                token: token,
            },
        };

        return res.status(200).json(response);

    }
}

const auth = new AuthController();

export default auth;