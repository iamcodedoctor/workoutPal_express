import express from "express";
import errorHandler from "../middlewares/errorHandler.js";
import cors from "cors";
import { corsOptions } from "../config/corsOptions.js";
import ExerciseRouter from "../routes/ExercisesRoute.js"

const app = express();

// Middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors(corsOptions));




// Server test route
app.get("/", (req, res) => {
    res.status(200).send("Uphar Gruh Server reached.");
});

// Routes
app.use('/exercise', ExerciseRouter);

// Error handler middleware
app.use(errorHandler);

export default app;
