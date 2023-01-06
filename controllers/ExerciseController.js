import {
    bulkCreate,
    create,
    filter,
    getDistinctParameters,
    getOne,
    list,
} from "../services/ExerciseService.js";

const createExercise = async (req, res, next) => {
    try {
        const { name, bodyPart, equipment, gifUrl, target } = req.body;
        const response = await create({
            name,
            bodyPart,
            equipment,
            gifUrl,
            target,
        });
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const bulkCreateExercise = async (req, res, next) => {
    try {
        const { exerciseData } = req.body;
        const response = await bulkCreate(exerciseData);
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const findDistinctParameters = async (req, res, next) => {
    try {
        const response = await getDistinctParameters();
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const filterExercises = async (req, res, next) => {
    try {
        let { bodyPart, target, equipment, page, limit } = req.query;

        bodyPart = bodyPart ? bodyPart.trim().toLowerCase() : '';
        target = target ? target.trim().toLowerCase() : '';
        equipment = equipment ? equipment.trim().toLowerCase() : '';
        page = page || 0;
        limit = limit || 12;

        const response = await filter({
            bodyPart,
            target,
            equipment,
            page,
            limit,
        });
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const listExercises = async (req, res, next) => {
    try {
        let { page, limit } = req.query;
        page = page || 0;
        limit = limit || 12;

        const response = await list({page, limit});

        return res.status(200).json({
            success:true,
            data: response
        })

    } catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await getOne(id);
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export { createExercise, bulkCreateExercise, findDistinctParameters, filterExercises, listExercises, getById };
