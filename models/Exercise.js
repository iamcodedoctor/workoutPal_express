import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    name: String,
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    target: String,

})

export const Exercise = mongoose.model("Exercise", ExerciseSchema);