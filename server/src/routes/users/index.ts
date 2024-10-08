import express from 'express';
import { createUser, getUsers } from '../../controller/user';
import { getConfigUser } from 'src/controller/user/getConfig';
import { catchAsync } from '@utils';
import { getUserById } from 'src/controller/user/getUserById';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - email_address
 *               - role
 *               - password
 *             properties:
 *               user_id:
 *                 type: string
 *               email_address:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getUsers);
/**
 * @swagger
 * /api/v1/users/{user_id}:
 *   get:
 *     summary: Get a user by user_id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user_id of the user to retrieve
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:user_id', getUserById);

/**
 * @swagger
 * /api/v1/users/config:
 *   get:
 *     summary: Get user configuration
 *     description: Retrieves all details of the user based on the access token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.get('/config', catchAsync(getConfigUser));


export default router;
