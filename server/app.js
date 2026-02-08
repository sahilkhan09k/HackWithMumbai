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

// Global error handler - suppress expected 401 errors from logs
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Only log unexpected errors (not 401 unauthorized)
    if (statusCode !== 401) {
        console.error('Error:', err.message);
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        statusCode: statusCode
    });
});


export { app };