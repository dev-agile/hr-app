import { Router } from 'express';
import { adminController } from '@controller';
import { catchAsync } from '@utils';
import upload from '../../middleware/multer-config'; // Update this path as necessary
import { createDayType } from 'src/controller/employees/addDaytpe';

const router = Router();

/**
 * @swagger
 * /api/v1/admin/employees/upsert:
 *   post:
 *     summary: Create or update an employee
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier for the employee. Required for updates.
 *                 nullable: true
 *               first_name:
 *                 type: string
 *                 description: The first name of the employee.
 *               last_name:
 *                 type: string
 *                 description: The last name of the employee.
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the employee.
 *               gender:
 *                 type: string
 *                 description: The gender of the employee.
 *               nationality:
 *                 type: string
 *                 description: The nationality of the employee.
 *               marital_status:
 *                 type: string
 *                 description: The marital status of the employee.
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The photo of the employee.
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The path to a document associated with the employee.
 *                 description: List of paths to documents associated with the employee.
 *               designation:
 *                 type: string
 *                 description: The job designation of the employee.
 *               joining_date:
 *                 type: string
 *                 format: date
 *                 description: The joining date of the employee.
 *               ending_date:
 *                 type: string
 *                 format: date
 *                 description: The ending date of the employee.
 *               father_name:
 *                 type: string
 *                 description: The name of the employee's father.
 *               mother_name:
 *                 type: string
 *                 description: The name of the employee's mother.
 *               contact_information:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The email address of the employee.
 *                   phone_number:
 *                     type: string
 *                     description: The phone number of the employee.
 *                   address:
 *                     type: object
 *                     properties:
 *                       permanent:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           zip_code:
 *                             type: string
 *                           country:
 *                             type: string
 *                       current:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           zip_code:
 *                             type: string
 *                           country:
 *                             type: string
 *                   emergency_contact:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       relationship:
 *                         type: string
 *                       phone_number:
 *                         type: string
 *               skills_and_qualifications:
 *                 type: object
 *                 properties:
 *                   educational_background:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         degree:
 *                           type: string
 *                         institution:
 *                           type: string
 *                         graduation_date:
 *                           type: string
 *                           format: date
 *                   certifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         institution:
 *                           type: string
 *                         date_obtained:
 *                           type: string
 *                           format: date
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                   languages_spoken:
 *                     type: array
 *                     items:
 *                       type: string
 *                   work_experience:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         employer:
 *                           type: string
 *                         job_title:
 *                           type: string
 *                         start_date:
 *                           type: string
 *                           format: date
 *                         end_date:
 *                           type: string
 *                           format: date
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the employee. Required for creation.
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '201':
 *         description: Employee created successfully
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
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *           required: false
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/admin/employees/daytype:
 *   post:
 *     summary: Add a new DayType.
 *     description: Creates a new DayType record in the database.
 *     tags:
 *       - DayType
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Status:
 *                 type: string
 *                 description: The status of the day type.
 *                 example: "Holiday"
 *               Description:
 *                 type: string
 *                 description: A description of the day type.
 *                 example: "A public holiday observed nationwide."
 *               WorkingHours:
 *                 type: integer
 *                 description: The number of working hours associated with the day type.
 *                 example: 0
 *     responses:
 *       '201':
 *         description: DayType successfully created.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "DayType created successfully."
 *             dayType:
 *               $ref: '#/components/schemas/DayType'
 *       '400':
 *         description: Bad request or validation error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Validation failed or missing fields."
 *       '500':
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Internal server error."
 */
router.get("/", catchAsync(adminController.employees.list));
router.post("/upsert", upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'documents', maxCount: 10 }]), catchAsync(adminController.employees.upsert));
router.post('/daytype', catchAsync(createDayType));
export default router;
