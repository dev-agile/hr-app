import express from 'express';
import { createEmployeeLeaves } from 'src/controller/leaves/createEmployeeLeaves';
import { createLeave } from 'src/controller/leaves/createLeave';

const router = express.Router();

/**
 * @swagger
 * /api/v1/leaves:
 *   post:
 *     summary: Create employee leaves record
 *     tags:
 *       - Leaves
 *     description: Creates a new employee leaves record with the given user ID and number of pending holidays.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - holidaysPending
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The unique identifier of the employee
 *               holidaysPending:
 *                 type: integer
 *                 description: The number of pending holidays for the employee
 *     responses:
 *       '201':
 *         description: Employee leaves record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Employee leaves record created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d5ecb74f52a531fc3c9528
 *                     user_id:
 *                       type: string
 *                       example: "12345"
 *                     holidaysPending:
 *                       type: integer
 *                       example: 10
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal server error
 */
router.post('/', createEmployeeLeaves);
/**
 * @swagger
 * /api/v1/leaves/leaveApply:
 *   post:
 *     summary: Create a new leave request
 *     tags:
 *       - Leaves
 *     description: Creates a new leave request for an employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - holidayType
 *               - duration
 *               - document
 *               - leaveDate
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The unique identifier of the employee
 *               holidayType:
 *                 type: string
 *                 enum: ['Half Day', 'Full Day']
 *                 description: Type of leave
 *               description:
 *                 type: string
 *                 description: Optional description for the leave
 *               duration:
 *                 type: number
 *                 description: Duration of the leave
 *               document:
 *                 type: string
 *                 description: Document related to the leave
 *               leaveDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the leave (YYYY-MM-DD)
 *     responses:
 *       '201':
 *         description: Leave request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Leave request created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Leave'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/leaveApply', createLeave);

export default router;