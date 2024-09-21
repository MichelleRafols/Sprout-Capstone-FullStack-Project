import express from "express";
import * as reflectionsController from "../controllers/reflections-controller.js";

const router = express.Router();

router
    .get('/:id', reflectionsController.getReflectionItem);

export default router;