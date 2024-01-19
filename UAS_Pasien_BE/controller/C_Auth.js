
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import M_User from "../models/M_User.js";

class C_Auth {
    async registrasi(req, res) {
        try {
            const { username, email, password } = req.body;
            const Fields = [];
            const requiredFields = ['username', 'email', 'password'];


            requiredFields.forEach(field => {
                if (!req.body[field]) {Fields.push(field);}
            });

            if (Fields.length > 0) {return res.status(422).json({
                    message: "Validation Error",errors: `Bidang wajib tidak ada: ${Fields.join(', ')}`});
            }

            const hash = await bcrypt.hash(password, 16);

            const newUser = await M_User.create({
                username: username, email: email, password: hash,
            });

            const ressponse = {
                massage: "Registrasi Berhasil", data: newUser,
            }

            res.status(201).json(ressponse);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Kesalahan server dari dalam" });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
        
            const requiredFields = ['username', 'password'];
            const Fields = [];

            requiredFields.forEach(field => {
                if (!req.body[field]) {Fields.push(field);
                }
            });

            if (Fields.length > 0) {
                return res.status(422).json({
                    message: "Validation Error",
                    errors: `Bidang wajib tidak ada: ${Fields.join(', ')}`
                });
            }

            const user = await M_User.findOne({
                where: {username: username}
            })

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!user || !isPasswordValid) {
                const response = {
                    message: "Username atau kata sandi tidak valid", data: null}
            }
            const pyload = {
                id: user.id,
                username: user.username,
            };
            const secret = process.env.SECRET_TOKEN;
            const token = jwt.sign(pyload, secret, { expiresIn: '2h' });
            const response = {message: "Login Berhasil",
                data: {
                    username: user.username,
                    email: user.email,
                    token: token
                }};

            return res.status(201).json(response);

        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Tidak sah" });
        }
    }
}

const AuthController = new C_Auth();
export default AuthController;