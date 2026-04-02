import mongoose from 'mongoose';
import Plants from './plants.js';

const isValidId = (value) => mongoose.isValidObjectId(value);

const parseBoolean = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'string') {
        return ['true', '1', 'on'].includes(value.toLowerCase());
    }

    return Boolean(value);
};

const normalizePlantPayload = (body = {}) => ({
    user_id: body.user_id,
    plant_name: body.plant_name?.trim(),
    genetic: body.genetic?.trim(),
    grow_mode: body.grow_mode?.trim(),
    auto: parseBoolean(body.auto),
    germination_date: body.germination_date,
});

const getAllPlants = async (req, res) => {
    try {
        const plants = await Plants.find({}).sort({ germination_date: -1, createdAt: -1 }).lean();

        return res.status(200).json({
            message: 'Plants found',
            data: plants,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};

const getPlantById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid plant id',
                data: {},
                error: true,
            });
        }

        const plant = await Plants.findById(req.params.id).lean();

        if (!plant) {
            return res.status(404).json({
                message: 'Plant not found',
                data: {},
                error: true,
            });
        }

        return res.status(200).json({
            message: `Plant with ID ${req.params.id} found`,
            data: plant,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};

const createPlant = async (req, res) => {
    try {
        const payload = normalizePlantPayload(req.body);

        if (!isValidId(payload.user_id)) {
            return res.status(400).json({
                message: 'Valid user_id is required',
                data: {},
                error: true,
            });
        }

        if (!payload.plant_name || !payload.genetic || !payload.grow_mode || !payload.germination_date) {
            return res.status(400).json({
                message: 'user_id, plant_name, genetic, grow_mode and germination_date are required',
                data: {},
                error: true,
            });
        }

        const result = await Plants.create(payload);

        return res.status(201).json({
            message: 'Plant successfully added',
            data: result.toObject(),
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};

const deletePlant = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid plant id',
                data: {},
                error: true,
            });
        }

        const result = await Plants.findByIdAndDelete(req.params.id).lean();

        if (!result) {
            return res.status(404).json({
                message: `Plant with ID ${req.params.id} has not been found`,
                data: {},
                error: true,
            });
        }

        return res.status(200).json({
            message: 'Plant has been successfully deleted',
            data: result,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};

const updatePlant = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid plant id',
                data: {},
                error: true,
            });
        }

        const payload = normalizePlantPayload(req.body);

        if (!isValidId(payload.user_id)) {
            return res.status(400).json({
                message: 'Valid user_id is required',
                data: {},
                error: true,
            });
        }

        if (!payload.plant_name || !payload.genetic || !payload.grow_mode || !payload.germination_date) {
            return res.status(400).json({
                message: 'user_id, plant_name, genetic, grow_mode and germination_date are required',
                data: {},
                error: true,
            });
        }

        const result = await Plants.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
        }).lean();

        if (!result) {
            return res.status(404).json({
                message: 'Plant has not been found',
                data: {},
                error: true,
            });
        }

        return res.status(200).json({
            message: 'Plant successfully updated',
            data: result,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};

export default {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant,
};
