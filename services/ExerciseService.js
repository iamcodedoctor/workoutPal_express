import { Exercise } from "../models/Exercise.js";
import createError from "../utils/createError.js";

const create = ({ name, bodyPart, equipment, gifUrl, target }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newExercise = await Exercise.create({
                name,
                bodyPart,
                equipment,
                gifUrl,
                target,
            });
            return resolve(newExercise);
        } catch (error) {
            return reject(error);
        }
    });
};

const bulkCreate = (exerciseData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const failure = [];

            Promise.all(
                exerciseData.map(async (exercise) => {
                    try {
                        const newExercise = await Exercise.create({
                            name: exercise.name,
                            bodyPart: exercise.bodyPart,
                            equipment: exercise.equipment,
                            gifUrl: exercise.gifUrl,
                            target: exercise.target,
                        });
                        success.push(newExercise);
                    } catch {
                        failure.push(exercise);
                    }
                })
            );

            const failureCount = failure.length;
            return resolve({ failureCount, failure });
        } catch (error) {
            return reject(error);
        }
    });
};

const getDistinctParameters = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const bodyParts = await Exercise.distinct("bodyPart");
            const targets = await Exercise.distinct("target");
            const equipments = await Exercise.distinct("equipment");
            return resolve({ bodyParts, targets, equipments });
        } catch (error) {
            return reject(error);
        }
    });
};

const filter = ({ bodyPart, target, equipment, page, limit }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queryArray = [];
            bodyPart.length && queryArray.push({ bodyPart });
            target.length && queryArray.push({ target });
            equipment.length && queryArray.push({ equipment });

            if (queryArray.length === 0) {
                const exercises = await Exercise.find()
                    .skip(page * limit)
                    .limit(limit)
                    .lean();
                const count = await Exercise.countDocuments();
                return resolve({count, exercises});
            } else {
                const exercises = await Exercise.find({
                    $and: queryArray,
                })
                    .skip(page * limit)
                    .limit(limit)
                    .lean();
                const count = await Exercise.countDocuments({$and: queryArray});
                return resolve({count, exercises});
            }
        } catch (error) {
            return reject(error);
        }
    });
};

const list = ({ page, limit }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exercises = await Exercise.find()
                .skip(page * limit)
                .limit(limit)
                .lean();
            return resolve(exercises);
        } catch (error) {
            return reject(error);
        }
    });
};

const getOne = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exercise = await Exercise.findById(id)
            if(!exercise) {
                return reject(createError(404, "Exercise Not found"));
            }
            return resolve(exercise)
        } catch (error) {
            return reject(error)
        }
    })
}

export { create, bulkCreate, getDistinctParameters, filter, list, getOne };
