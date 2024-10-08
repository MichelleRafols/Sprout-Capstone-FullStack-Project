import "dotenv/config";
import express from "express";
import cors from "cors";
import eLevelsRoutes from './routes/energy-level-routes.js';
import activitiesRoutes from './routes/activities-routes.js';
import reflectionsRoutes from './routes/reflection-routes.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

// all energy levels routes
app.use('/levels', eLevelsRoutes);

// all activities routes
app.use('/activities', activitiesRoutes);

// all reflections routes
app.use('/reflections', reflectionsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})

