import express from "express";
import * as reflectionsController from "../controllers/reflections-controller.js";

const router = express.Router();

// Route for fetching all reflections
router
    .get('/all', reflectionsController.getAllReflections);
    
// Route for fetching one reflection item
router
    .get('/:id', reflectionsController.getReflectionItem);


export default router;