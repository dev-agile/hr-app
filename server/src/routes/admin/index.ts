import { Router } from 'express'
import * as employees from './employees'
import accessToken from 'src/middleware/access-token';
import { createRole, editRole, getRoles } from 'src/controller/roleController';
import { authorizeFeature } from 'src/middleware/authMiddleware';


const router = Router()
/**
 * @swagger
 * /api/v1/admin/role:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - featurePermissions
 *             properties:
 *               name:
 *                 type: string
 *               featurePermissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - feature
 *                     - permissions
 *                   properties:
 *                     feature:
 *                       type: string
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [read, write, delete, update]
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/role', accessToken,authorizeFeature('role', ['write']), createRole);


/**
 * @swagger
 * /api/v1/admin/role:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/role', accessToken,authorizeFeature('role', ['read']), getRoles);
/**
 * @swagger
 * /api/v1/admin/role/{id}:
 *   put:
 *     summary: Edit an existing role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: manager
 *               featurePermissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     feature:
 *                       type: string
 *                       example: holiday
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["read", "write", "update"]
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66b1f2fdb2816deaef8fc0fd
 *                     name:
 *                       type: string
 *                       example: manager
 *                     featurePermissions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           feature:
 *                             type: string
 *                             example: holiday
 *                           permissions:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["read", "write", "update"]
 *                     __v:
 *                       type: number
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.put('/role/:id',accessToken,authorizeFeature('role', ['update']) , editRole);

router.use("/employees",employees.default)


export default router