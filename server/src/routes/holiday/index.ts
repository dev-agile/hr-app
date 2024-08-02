import express from 'express';
import {
  createHoliday,
  getHolidays,
  getHolidayById,
  updateHoliday,
  deleteHoliday,
} from "../../controller/holiday";

const router = express.Router();

/**
 * @swagger
 * /api/v1/holiday/holidays:
 *   post:
 *     summary: Create a new holiday
 *     tags: [Holiday]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the holiday
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the holiday
 *               description:
 *                 type: string
 *                 description: A description of the holiday
 *               type:
 *                 type: string
 *                 enum:
 *                   - Public
 *                   - Company
 *                   - Optional
 *                 description: The type of holiday
 *               createdBy:
 *                 type: number
 *                 description: The ID of the user who created the holiday
 *               updatedBy:
 *                 type: number
 *                 description: The ID of the user who last updated the holiday
 *     responses:
 *       201:
 *         description: Holiday created successfully
 *       500:
 *         description: Server error
 */
router.post('/holidays', createHoliday);

/**
 * @swagger
 * /api/v1/holiday/holidays:
 *   get:
 *     summary: Get all holidays
 *     tags: [Holiday]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Server error
 */
router.get('/holidays', getHolidays);

/**
 * @swagger
 * /api/v1/holiday/holidays/{id}:
 *   get:
 *     summary: Get a holiday by ID
 *     tags: [Holiday]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The holiday ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Holiday not found
 *       500:
 *         description: Server error
 */
router.get('/holidays/:id', getHolidayById);

/**
 * @swagger
 * /api/v1/holiday/holidays/{id}:
 *   put:
 *     summary: Update a holiday by ID
 *     tags: [Holiday]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The holiday ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the holiday
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the holiday
 *               description:
 *                 type: string
 *                 description: A description of the holiday
 *               type:
 *                 type: string
 *                 enum:
 *                   - Public
 *                   - Company
 *                   - Optional
 *                 description: The type of holiday
 *               createdBy:
 *                 type: number
 *                 description: The ID of the user who created the holiday
 *               updatedBy:
 *                 type: number
 *                 description: The ID of the user who last updated the holiday
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Holiday not found
 *       500:
 *         description: Server error
 */
router.put('/holidays/:id', updateHoliday);

/**
 * @swagger
 * /api/v1/holiday/holidays/{id}:
 *   delete:
 *     summary: Delete a holiday by ID
 *     tags: [Holiday]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The holiday ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Holiday not found
 *       500:
 *         description: Server error
 */
router.delete('/holidays/:id', deleteHoliday);

export default router;
