import express from "express";
import {
    bulkCreateExercise,
    createExercise,
    filterExercises,
    findDistinctParameters,
    getById,
    listExercises,
} from "../controllers/ExerciseController.js";
const router = express.Router();

router.post("/", createExercise);
router.post("/bulk", bulkCreateExercise);
router.get("/filter", filterExercises);
router.get("/list", listExercises);
router.get("/distinct", findDistinctParameters);
router.get("/:id", getById);

export default router;
