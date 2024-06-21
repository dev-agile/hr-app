"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const options = {
    swaggerDefinition,
    apis: ['./src/routes/**/*.ts'], // Path to your API routes
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
