import mongoose from 'mongoose';

const { Schema } = mongoose;

const plantSchema = new Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    plant_name : {
        type: String,
        required: true,
    },
    genetic : {
        type: String,
        required: true,
    },
    grow_mode : {
        type: String,
        required: true
    },
    auto : {
        type: Boolean,
        required: true,
    },
    germination_date : {
        type: Date,
        required: true,
    },
})

export default mongoose.model('Plants', plantSchema);