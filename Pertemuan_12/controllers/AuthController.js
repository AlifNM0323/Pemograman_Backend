import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import AuthValidation from '../validation/AuthValidation.js';
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt";



class AuthController {
  async userRegistration(req, res) {
    try {
      await Promise.all(AuthValidation.registerValidation.map((validation) => validation.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));

        return res.status(422).json({ errors: formattedErrors, message: "All fields are required" });
      }

      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      const newUser = await UserModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      const response = {
        message: "User Created Successfully",
        data: newUser,
      };

      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async userLogin(req, res) {
    try {
      await Promise.all(AuthValidation.loginValidation.map((validation) => validation.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));

        return res.status(422).json({ errors: formattedErrors, message: "Username and Password are required" });
      }

      const { username, password } = req.body;

      const user = await UserModel.findOne({
        where: { username: username },
      });

      if (!user) {
        const response = {
          message: "Authentication Failed",
        };
        return res.status(401).json(response);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        const response = {
          message: "Authentication Failed",
        };
        return res.status(401).json(response);
      }

      const payload = {
        id: user.id,
        username: user.username,
      };

      const secretKey = process.env.TOKEN_SECRET;
      console.log(secretKey);

      const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });

      const response = {
        message: "Login Success",
        data: {
          token: token,
          username: payload.username,
        },
      };
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const authenticationController = new AuthController();

export default authenticationController;
