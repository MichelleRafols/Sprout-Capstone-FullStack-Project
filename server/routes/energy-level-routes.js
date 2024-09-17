import express from "express";
import * as eLevelsController from "../controllers/energy-levels-controller.js";

const router = express.Router();

router
.get('/', eLevelsController.getELevelsList);

// Route for fetching all content for one energy level
router
.get('/:id', eLevelsController.getELevelItem);

export default router;