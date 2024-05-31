import app from "./app.js";
import dotenv from "dotenv";
//import ServerlessHttp from "serverless-http";

//const express = require('express');

// Cargar la configuración del archivo .env
dotenv.config();

//const serverless = require(serverless-http);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

//module.exports.handler = serverless(app)