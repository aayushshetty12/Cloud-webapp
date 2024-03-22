import express from 'express';
import * as invalidURLController from "../controllers/invalidURL-controller.js"

const router = express.Router();

router.all("*", invalidURLController.errorURL)
