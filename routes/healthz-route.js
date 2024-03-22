import express from 'express';
import * as healthzController from '../controllers/healthz-controller.js';

const router = express.Router();

router.all("/", healthzController.checkHealthz)

export default router
