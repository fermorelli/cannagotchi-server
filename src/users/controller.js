import mongoose from 'mongoose';
import Users from './users.js';

const isValidId = (value) => mongoose.isValidObjectId(value);

const normalizeUserPayload = (body = {}) => ({
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    email: body.email?.trim().toLowerCase(),
});

const serializeUser = (user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    plants: user.plants || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({}).sort({ createdAt: -1 }).lean();

        return res.status(200).json({
            message: 'Users found',
            data: users.map(serializeUser),
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

const getUserById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid user id',
                data: {},
                error: true,
            });
        }

        const user = await Users.findById(req.params.id).lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                data: {},
                error: true,
            });
        }

        return res.status(200).json({
            message: `User with ID ${req.params.id} found`,
            data: serializeUser(user),
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

const createUser = async (req, res) => {
    try {
        const payload = normalizeUserPayload(req.body);

        if (!payload.firstName || !payload.lastName || !payload.email) {
            return res.status(400).json({
                message: 'firstName, lastName and email are required',
                data: {},
                error: true,
            });
        }

        const existingUser = await Users.findOne({ email: payload.email }).lean();

        if (existingUser) {
            return res.status(409).json({
                message: 'A user with this email already exists',
                data: {},
                error: true,
            });
        }

        const result = await Users.create(payload);

        return res.status(201).json({
            message: 'User successfully created',
            data: serializeUser(result.toObject()),
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

const deleteUser = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid user id',
                data: {},
                error: true,
            });
        }

        const result = await Users.findByIdAndDelete(req.params.id).lean();

        if (!result) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} has not been found`,
                data: {},
                error: true,
            });
        }

        return res.status(200).json({
            message: 'User has been successfully deleted',
            data: serializeUser(result),
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

const updateUser = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid user id',
                data: {},
                error: true,
            });
        }

        const payload = normalizeUserPayload(req.body);

        if (!payload.firstName || !payload.lastName || !payload.email) {
            return res.status(400).json({
                message: 'firstName, lastName and email are required',
                data: {},
                error: true,
            });
        }

        const existingUser = await Users.findOne({
            email: payload.email,
            _id: { $ne: req.params.id },
        }).lean();

        if (existingUser) {
            return res.status(409).json({
                message: 'Another user with this email already exists',
                data: {},
                error: true,
            });
        }

        const result = await Users.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
        }).lean();

        if (!result) {
            return res.status(404).json({
                message: 'User has not been found',
                data: {},
                error: true,
            });
        }

        return res.status(200).json({
            message: 'User successfully updated',
            data: serializeUser(result),
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
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
