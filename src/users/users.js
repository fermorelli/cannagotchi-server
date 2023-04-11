import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    plants : {
        type: Array,
        required: false
    }
})

export default mongoose.model('Users', userSchema);
