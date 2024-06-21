"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// Function to generate JWT access token
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.envConfig.JWT_SECRET, { expiresIn: config_1.envConfig.JWT_EXPIRATION_ACCESS });
};
exports.generateAccessToken = generateAccessToken;
// Function to generate JWT refresh token
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.envConfig.JWT_SECRET, { expiresIn: config_1.envConfig.JWT_EXPIRATION_REFRESH });
};
exports.generateRefreshToken = generateRefreshToken;
