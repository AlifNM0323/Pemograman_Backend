import  express  from "express"
import AuthController from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get('/students', auth, StudentController.index);

const router = express.Router();

import StudentController from '../controllers/StudentController.js'
router.get('/students',StudentController.displayAllStudents)
router.post('/students',StudentController.addStudent)
router.put('/students/:id',StudentController.updateStudent)
router.delete('/students/:id',StudentController.removeStudent)

export default router;