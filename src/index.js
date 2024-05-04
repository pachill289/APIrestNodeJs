import app from "./app.js";
import dotenv from "dotenv";

// Se carga la configuración
dotenv.config();
app.listen(process.env.PORT);
console.log(`Servidor escuchando en el puerto: ${process.env.PORT}`);
