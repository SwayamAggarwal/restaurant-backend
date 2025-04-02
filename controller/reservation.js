import ErrorHandler from "../error/error.js";
import {Reservation} from "../models/reservationSchema.js";

export const sendReservation = async(req,res,next)=>{  //next is used for error handling
  const {firstName, lastName, email, phone, date, time} = req.body; 

  if(!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill all the fields", 400)); //400 is the status code for bad request
  }

  try{         // creating table in DB if everything goes ok 
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time
    });

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
    });
  }
  catch(error){
    if(error.name === "ValidationError"){
        const validationErrors = Object.values(error.errors).map(
            (err) => err.message
        );
        return next(new ErrorHandler(validationErrors.join(", "), 400)); //400 is the status code for bad request
    }
  }
}