import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { authController } from "../../controller";
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

router.post("/login",catchAsync(authController.default))

export default router