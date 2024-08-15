import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    payment: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'done'],
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['gpay', 'cash'],
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'done'],
        required: true
    }
});



export default mongoose.model("User", userSchema);