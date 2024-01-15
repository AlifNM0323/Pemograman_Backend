import { body } from 'express-validator';

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
];

const AuthValidation = {
  login: loginValidation,
  register: registerValidation,
};

export default AuthValidation;
