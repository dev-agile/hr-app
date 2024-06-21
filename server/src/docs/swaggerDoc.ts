import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HR app API with Swagger',
    version: '1.0.0',
    description: 'Documentation for HR app API using Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3003', // Replace with your server URL
      description: 'Development server',
    },
  ],
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
