"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const tokenSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: config_1.envConfig.JWT_EXPIRATION_REFRESH },
    updatedAt: { type: Date, default: Date.now },
});
const Token = mongoose_1.default.model('Token', tokenSchema);
exports.default = Token;
