import express from "express";
import cors from "cors"; //it is used to connect the frontend and backend as they are runningh on different ports
import dotenv from "dotenv";
import {dbConnection} from "./database/dbConnection.js";
import {errorMiddleware} from "./error/error.js"; 
import reservationRouter from "./routes/reservationRoute.js";

const app = express()
dotenv.config(); // Changed to use root .env file

// app.use(cors({
//     origin: [process.env.FRONTEND_URL],  // Added deployed frontend URL
//     methods: ["POST"],
//     credentials: true,
// }));

app.use(cors({ origin: "https://restaurant-frontend-five-gilt.vercel.app" })); // Added deployed frontend URL

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter); // api ka prefix hai jo humne reservationRoute.js me define kiya hai

dbConnection(); // database connect

app.use(errorMiddleware); // error middleware

export default app;