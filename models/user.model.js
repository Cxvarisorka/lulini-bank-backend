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
    bankNumber: {
        
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
    }
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
