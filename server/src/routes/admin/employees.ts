import { Router } from 'express';
import { adminController } from '@controller';
import { catchAsync } from '@utils';
import upload from '../../middleware/multer-config'; // Update this path as necessary
import { createDayType } from 'src/controller/employees/addDaytpe';
import { approveAttendance, deleteEmployee } from 'src/controller/admin/employees';

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
 *                 nullable: true
 *               last_name:
 *                 type: string
 *                 description: The last name of the employee.
 *                 nullable: true
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the employee.
 *                 nullable: true
 *               gender:
 *                 type: string
 *                 description: The gender of the employee.
 *                 nullable: true
 *               nationality:
 *                 type: string
 *                 description: The nationality of the employee.
 *                 nullable: true
 *               marital_status:
 *                 type: string
 *                 description: The marital status of the employee.
 *                 nullable: true
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The photo of the employee.
 *                 nullable: true
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The path to a document associated with the employee.
 *                 description: List of paths to documents associated with the employee.
 *                 nullable: true
 *               designation:
 *                 type: string
 *                 description: The job designation of the employee.
 *                 nullable: true
 *               joining_date:
 *                 type: string
 *                 format: date
 *                 description: The joining date of the employee.
 *                 nullable: true
 *               ending_date:
 *                 type: string
 *                 format: date
 *                 description: The ending date of the employee.
 *                 nullable: true
 *               father_name:
 *                 type: string
 *                 description: The name of the employee's father.
 *                 nullable: true
 *               mother_name:
 *                 type: string
 *                 description: The name of the employee's mother.
 *                 nullable: true
 *               contact_information:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The email address of the employee.
 *                     nullable: true
 *                   phone_number:
 *                     type: string
 *                     description: The phone number of the employee.
 *                     nullable: true
 *                   address:
 *                     type: object
 *                     properties:
 *                       permanent:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                             nullable: true
 *                           city:
 *                             type: string
 *                             nullable: true
 *                           state:
 *                             type: string
 *                             nullable: true
 *                           zip_code:
 *                             type: string
 *                             nullable: true
 *                           country:
 *                             type: string
 *                             nullable: true
 *                       current:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                             nullable: true
 *                           city:
 *                             type: string
 *                             nullable: true
 *                           state:
 *                             type: string
 *                             nullable: true
 *                           zip_code:
 *                             type: string
 *                             nullable: true
 *                           country:
 *                             type: string
 *                             nullable: true
 *                   emergency_contact:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         nullable: true
 *                       relationship:
 *                         type: string
 *                         nullable: true
 *                       phone_number:
 *                         type: string
 *                         nullable: true
 *                 nullable: true
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
 *                           nullable: true
 *                         institution:
 *                           type: string
 *                           nullable: true
 *                         graduation_date:
 *                           type: string
 *                           format: date
 *                           nullable: true
 *                     nullable: true
 *                   certifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           nullable: true
 *                         institution:
 *                           type: string
 *                           nullable: true
 *                         date_obtained:
 *                           type: string
 *                           format: date
 *                           nullable: true
 *                     nullable: true
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                       nullable: true
 *                     nullable: true
 *                   languages_spoken:
 *                     type: array
 *                     items:
 *                       type: string
 *                       nullable: true
 *                     nullable: true
 *                   work_experience:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         employer:
 *                           type: string
 *                           nullable: true
 *                         job_title:
 *                           type: string
 *                           nullable: true
 *                         start_date:
 *                           type: string
 *                           format: date
 *                           nullable: true
 *                         end_date:
 *                           type: string
 *                           format: date
 *                           nullable: true
 *                     nullable: true
 *                 nullable: true
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the employee. Required for creation.
 *                 nullable: true
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
/**
 * @swagger
 * /api/v1/admin/employees/delete:
 *   delete:
 *     summary: Delete an employee
 *     description: Deletes an employee record based on the employee_id provided in the request body.
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
 *               employee_id:
 *                 type: string
 *                 description: The unique identifier of the employee to delete
 *                 example: "609bfe2ccbc555001f3e5a6f"
 *     responses:
 *       '200':
 *         description: Employee successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee deleted successfully
 *       '400':
 *         description: Bad request - employee_id not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee ID is required
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/employees/deactivate:
 *   patch:
 *     summary: Deactivate an employee
 *     description: Deactivates an employee record based on the employee_id provided in the request body.
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
 *               employee_id:
 *                 type: string
 *                 description: The unique identifier of the employee to deactivate
 *                 example: "609bfe2ccbc555001f3e5a6f"
 *     responses:
 *       '200':
 *         description: Employee successfully deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee deactivated successfully
 *       '400':
 *         description: Bad request - employee_id not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee ID is required
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /api/v1/admin/employees/inactive:
 *   get:
 *     summary: Get a paginated list of inactive employees
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
 *         description: The page number to retrieve.
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of records per page.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 totalCount:
 *                   type: integer
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /api/v1/admin/employees/approve:
 *   post:
 *     summary: Approve or reject attendance changes
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
 *               attendance_id:
 *                 type: string
 *                 description: The ID of the attendance record to approve
 *               approve:
 *                 type: boolean
 *                 description: True to approve, false to reject
 *     responses:
 *       '200':
 *         description: Attendance changes approved or rejected
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Attendance not found
 *       '500':
 *         description: Internal server error
 */
router.post('/approve', catchAsync(approveAttendance));
router.get("/inactive", catchAsync(adminController.employees.listInactive));
router.get("/", catchAsync(adminController.employees.list));
router.post("/upsert", upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'documents', maxCount: 10 }]), catchAsync(adminController.employees.upsert));
router.post('/daytype', catchAsync(createDayType));
router.delete('/delete', catchAsync(adminController.employees.deleteEmployee));
router.patch('/deactivate', catchAsync(adminController.employees.deactivateEmployee));
export default router;
