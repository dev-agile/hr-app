"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.envConfig = void 0;
const envConfig_1 = __importDefault(require("./envConfig"));
exports.envConfig = envConfig_1.default;
const db_1 = __importDefault(require("./db"));
exports.connectDB = db_1.default;
