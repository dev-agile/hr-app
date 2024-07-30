import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HR app APIs',
    version: '1.0.0',
    description: 'Documentation for Hr-app APIs',
  },
  servers: [
    {
      url: 'http://localhost:3003', // Replace with your server URL
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
