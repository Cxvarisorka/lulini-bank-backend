import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    transactions: {
        type: Array
    },
    recipients: {
        type: Array
    },
    bankNumber: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;
