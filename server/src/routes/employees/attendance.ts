import { Router } from "express";
import { employeeController } from "@controller";
import { catchAsync } from "@utils";

const router = Router()

/**
 * @swagger
 * /api/v1/employees/attendance/check-in:
 *   post:
 *     summary: Check in attendance for an employee.
 *     description: Creates a new attendance record for an employee if none exists for today.
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Bearer token for authentication.
 *               
 *     responses:
 *       '201':
 *         description: Successful check-in.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Attendance checked in successfully"
 *             check_in_time:
 *               type: string
 *               format: date-time
 *               example: "2023-07-05T08:30:00Z"
 *       '400':
 *         description: Bad request or attendance already checked in today.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Attendance already checked in for today"
 *       '401':
 *         description: Unauthorized access or invalid token.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access or invalid token"
 *       '500':
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Internal server error"
 */
router.post("/check-in",catchAsync(employeeController.attendance.checkIn))
/**
 * @swagger
 * /api/v1/employees/attendance/check-out:
 *   patch:
 *     summary: Check out attendance for an employee.
 *     description: Updates the check-out time for an employee's attendance record.
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: User ID of the employee.
 *               example: "609bfe2ccbc555001f3e5a6f"
 *     responses:
 *       '201':
 *         description: Successful check-out.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Attendance checked out successfully"
 *             check_out_time:
 *               type: string
 *               format: date-time
 *               example: "2023-07-05T12:34:56Z"
 *       '400':
 *         description: Bad request or attendance record not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Attendance check not found for today"
 *       '500':
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Internal server error"
 */

router.patch("/check-out",catchAsync(employeeController.attendance.checkOut))


export default router