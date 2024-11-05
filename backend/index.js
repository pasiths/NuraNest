const { createConnection } = require("typeorm");
const ormConfig = require("./config/ormconfig.js");
const express = require("express");

const app = express();

// Load the environment variables
require("dotenv").config();

async function startServer() {
    try{
        // Establish a connection to the database
        await createConnection(ormConfig);
        console.log("Database connected successfully!");

        // Start the server
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(error){
        console.log("Error while connecting to the database", error);
        process.exit(1); // Exit the application if the connection fails
    }
}

startServer();