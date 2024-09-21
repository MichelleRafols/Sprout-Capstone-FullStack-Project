import express from "express";
import * as reflectionsController from "../controllers/reflections-controller.js";
import * as reflectionsValidation from '../validations/reflectionValidations.js';

const router = express.Router();

router
    // Route for fetching all reflections
    .get('/', reflectionsController.getAllReflections)
    
    // Route for fetching one reflection
    .get('/:id', reflectionsController.getReflectionItem)
    
    // Route/s for adding, updating and deleting a reflection
    .post('/', reflectionsController.addReflection, reflectionsValidation.reflectionValidationRules)
    .put('/:id', reflectionsController.editReflection)
    .delete('/:id', reflectionsController.deleteReflection);

export default router;