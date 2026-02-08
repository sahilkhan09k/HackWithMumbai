import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN, 'https://hack-with-mumbai.vercel.app'],
    credentials: true
}))

app.use(express.json({
    limit: '50kb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '50kb'
}));

app.use(express.static('public'));

app.use(cookieParser());


import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import issueRoutes from "./routes/issue.route.js";


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/issue", issueRoutes);



export { app };