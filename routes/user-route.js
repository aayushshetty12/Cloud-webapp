import express from 'express';
import * as userController from '../controllers/user-controller.js';
import * as invalidURLController from "../controllers/invalidURL-controller.js"
import checkAuth from "../services/authentication-service.js"

const router = express.Router();

router.get("/self", checkAuth, userController.getUser)
router.put("/self", checkAuth, userController.updateUser)
router.post("/", userController.createUser)

router.post("*", invalidURLController.errorURL)

export default router