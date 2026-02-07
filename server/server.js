import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config({
    path: './.env'
});

import { app } from "./app.js";
import { connectDB } from "./db/index.js";

connectDB().then(() => {
    const port = process.env.PORT || 5000;

    app.on('error', (error) => {
        console.error(`Error starting server: ${error.message}`);
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
});