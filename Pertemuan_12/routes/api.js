import  express  from "express"
import AuthController from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get('/students', auth, StudentController.index);

const router = express.Router();

import StudentController from '../controllers/StudentController.js'
router.get('/students',StudentController.index)
router.post('/students',StudentController.store)
router.put('/students/:id',StudentController.update)
router.delete('/students/:id',StudentController.delete)

export default router;