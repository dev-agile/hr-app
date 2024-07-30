import { Router } from "express";
import { adminController } from "@controller";
import { catchAsync } from "@utils";


const router = Router()


/**
 * @swagger
 * /api/v1/admin/employees/upsert:
 *   put:
 *     summary: Create or update an employee
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               salary:
 *                 type: number
 *               aadhar_image:
 *                 type: string
 *               pan_image:
 *                 type: string
 *               qualification_images:
 *                 type: array
 *                 items:
 *                   type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/admin/employees:
 *   get:
 *     summary: Get a paginated list of employees
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         required: false
 *         description: |
 *           Number of items per page (default: 10)
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Server error
 *        
 */

router.get("/", catchAsync(adminController.employees.list))
router.post("/upsert", catchAsync(adminController.employees.upsert))









export default router