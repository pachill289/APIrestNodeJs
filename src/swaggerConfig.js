import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node.js Express API with Swagger",
            version: "1.0.0",
            description: "A simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Asegúrate de que la ruta aquí es correcta.
};

const specs = swaggerJSDoc(options);
export default specs;
