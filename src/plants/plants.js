import mongoose from 'mongoose';

const { Schema } = mongoose;

const plantSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
            index: true,
        },
        plant_name: {
            type: String,
            required: true,
            trim: true,
        },
        genetic: {
            type: String,
            required: true,
            trim: true,
        },
        grow_mode: {
            type: String,
            required: true,
            trim: true,
        },
        auto: {
            type: Boolean,
            required: true,
        },
        germination_date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Plants', plantSchema);
