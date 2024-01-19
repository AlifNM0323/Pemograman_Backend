

import { Router } from "express";
import patientsController from "../controller/C_Pasien.js";
import AuthController from "../controller/C_Auth.js";
import auth from "../middleware/auth.js";

const router = Router();


router.get("/", (req, res) => {
    res.send("Hello Express Json");
});


router.post("/registrasi", AuthController.registrasi);
router.post("/login", AuthController.login);


router.get("/patients", auth, patientsController.index);
router.get("/patients/:id", auth, patientsController.get);
router.post("/patients", auth, patientsController.store);
router.get("/patients/specific", auth, patientsController.specific);
router.put("/patients/:id", auth, patientsController.update);
router.delete("/patients/:id", auth, patientsController.destroy);

export default router;