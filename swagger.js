import swaggerAutogen from "swagger-autogen";

const outputFile = './swagger_output.json';
const endpointsFiles = ['src/routes/index.js'];

(async () => {
    const swaggerAutogenInstance = await swaggerAutogen();
    swaggerAutogenInstance(outputFile, endpointsFiles);
})();
