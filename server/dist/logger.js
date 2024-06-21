"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/logger.ts
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info', // Set the logging level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(), // Log to the console
    ],
});
exports.default = logger;
