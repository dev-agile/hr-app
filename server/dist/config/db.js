"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("./envConfig"));
const logger_1 = __importDefault(require("./../logger"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUrl = envConfig_1.default.DB_URL;
        yield mongoose_1.default.connect(dbUrl);
        logger_1.default.info('MongoDB connected successfully');
    }
    catch (error) {
        logger_1.default.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // Exit process with failure
    }
});
exports.default = connectDB;
