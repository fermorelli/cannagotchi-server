import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        plants: {
            type: [Schema.Types.ObjectId],
            ref: 'Plants',
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Users', userSchema);
