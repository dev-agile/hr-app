"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const controller_1 = require("../../controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user with email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Invalid credentials
 *       '500':
 *         description: Server error
 */
router.post("/login", (0, catchAsync_1.default)(controller_1.authController.default));
exports.default = router;
