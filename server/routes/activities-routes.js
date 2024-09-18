import express from "express";
import * as activitiesController from "../controllers/activities-controller.js";

const router = express.Router();

// Route to get indoor activities for a specific energy level
router
    .get('/indoor-activities/:energyLevel', activitiesController.getIndoorActivities);

// Route to get outdoor activities for a specific energy level
router
    .get('/outdoor-activities/:energyLevel', activitiesController.getOutdoorActivities);

// Route to fetch distinct indoor and outdoor activities
router
    .get('/distinct-activities', activitiesController.getDistinctActivities);

    export default router;