import express from 'express';
import cors from 'cors'
import connectDB from '../config/db.js';
import cookieParser from "cookie-parser"
import routes from './routes/index.js';
import { SERVER_PORT, SERVER_HOST } from './utils/constants.js';
import { deleteExpiredTokens } from './utils/databaseTriggers.js';

const app = express()

const allowedOrigins = [
    "http://208.110.83.16",
    "http://localhost:5173"
];
  
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
app.options(/(.*)/, cors());
  
app.use(cookieParser())
app.use(express.static("public"))
app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString()
        },
    }),
)
app.use(express.urlencoded({ extended: true }))
  
app.use('/', routes)

connectDB()

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`)
})