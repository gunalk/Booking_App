import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import UserRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import mongoose from 'mongoose';
import cookieParser from "cookie-parser"
const app = express();
app.use(cookieParser())
const connectDB = async () => {
    try {
      // Connect to MongoDB without specifying useNewUrlParser and useUnifiedTopology
      await mongoose.connect(process.env.MONGODB_URL as string);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit process with failure code
    }
  };
  
  connectDB();
const port = 3000;
console.log(process.env.MONGODB_URL )
// Enable CORS
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
})); 

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use("/api/user",UserRoutes)
app.use("/api/auth",authRoutes)
// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express, CORS, and Body Parsers!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
