import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto por la URL de tu servidor
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde se encuentran tus archivos de ruta
};

export default swaggerJsdoc(options);
