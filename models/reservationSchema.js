import mongoose from 'mongoose';
import validator from 'validator';

const reservationSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Please enter your first name"],
        minLength:[3, "First name must be at least 3 characters"],
        maxLength: [30, "First name cannot exceed 30 characters"],
    },

    lastName:{
        type: String,
        required: [true, "Please enter your last name"],
        minLength:[3, "Last name must be at least 3 characters"],
        maxLength: [30, "Last name cannot exceed 30 characters"],
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email"],
    },

    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        minLength:[10, "Phone number must be at least 10 characters"],
        maxLength: [10, "Phone number cannot exceed 10 characters"],
    },
    
    time:{
        type: String,
        required: [true, "Please enter your reservation time"],
    },

    date: {
        type: String,
        required: [true, "Please enter your reservation date"],
    },

})

export const Reservation = mongoose.model("Reservation", reservationSchema); // Reservation is the name of the collection (name of the table) in the database