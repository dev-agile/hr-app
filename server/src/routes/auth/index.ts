import { Router } from "express";
import {catchAsync} from "@utils";
import { authController } from "@controller";
import { refreshToken } from "src/controller/auth/refreshToken";
const router = Router()


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
 *               email_address:
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

router.post("/login",catchAsync(authController.default))

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Access denied
 *       403:
 *         description: Invalid token
 */
router.post('/refresh-token', refreshToken);

export default router