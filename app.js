import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbConnection} from "./database/dbConnection.js";
import {errorMiddleware} from "./error/error.js"; 
import reservationRouter from "./routes/reservationRoute.js";

const app = express()
dotenv.config();

// Set up CORS for both development and production
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://restaurant-frontend-five-gilt.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter);

// Health check endpoint for Vercel
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

dbConnection();

app.use(errorMiddleware);

export default app;