import express from "express";
import index from "./routes/index.js";

const app = express();
// middlewares
// Entender el formato JSON
app.use(express.json());
// Entender datos de formularios sin tomar en cuenta datos de imágenes
app.use(express.urlencoded({extended: false}));

// definir rutas en index.js (servidor)
app.use(index);

export default app;