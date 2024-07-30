import { catchAsync } from '@utils';
import { Router } from 'express';
import { employeeController } from '@controller';
import  attendanceRoutes from './attendance'

const router = Router();


/**
 * @swagger
 * /api/v1/employees/get-profile:
 *   get:
 *     summary: Get employee profile by ID from token
 *     tags:
 *       - Employee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of employee profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     dob:
 *                       type: string
 *                       format: date
 *                     tech_stack:
 *                       type: string
 *                     joining_date:
 *                       type: string
 *                       format: date
 *                     ending_date:
 *                       type: string
 *                       format: date
 *                       nullable: true
 *                     pan_image:
 *                       type: string
 *                       nullable: true
 *                     aadhaar_image:
 *                       type: string
 *                       nullable: true
 *                     group:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                     currently_working:
 *                       type: boolean
 *                     father_name:
 *                       type: string
 *                     mother_name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     tenth_certificate:
 *                       type: string
 *                       nullable: true
 *                     twelfth_certificate:
 *                       type: string
 *                       nullable: true
 *                     graduation_certificate:
 *                       type: string
 *                       nullable: true
 *                     __v:
 *                       type: number
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server error
 */
router.get('/get-profile', catchAsync(employeeController.getProfile));
router.use("/attendance",attendanceRoutes)

export default router;
