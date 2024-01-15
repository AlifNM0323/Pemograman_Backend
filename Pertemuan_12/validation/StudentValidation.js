import { body, param, validationResult } from 'express-validator';

const StudentValidation = {
  create: [
    body('nama').notEmpty().withMessage('Nama is required'),
    body('nim').notEmpty().withMessage('NIM is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('jurusan').notEmpty().withMessage('Jurusan is required'),
  ],

  update: [
    body('nama').optional().notEmpty().withMessage('Nama is required'),
    body('nim').optional().notEmpty().withMessage('NIM wajib diisi'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('jurusan').optional().notEmpty().withMessage('Jurusan wajib diisi'),
  ],

  remove: [
    param('id').notEmpty().withMessage('ID  wajib diisi'),
  ],

  validateRequest: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  },
};

export default StudentValidation;
