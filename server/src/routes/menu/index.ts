import { Router } from 'express';
import { createMenu } from '../../controller/menu/createMenu'; // Adjust the import path based on your project structure
import { catchAsync } from '@utils';
import { getAllMenus } from 'src/controller/menu/getAllMenus';
import { createUserMenu } from 'src/controller/menu/createUserMenu';
import { getUserMenu } from 'src/controller/menu/getUserMenu';

const router = Router();

/**
 * @swagger
 * /api/v1/menu:
 *   post:
 *     summary: Create a new menu
 *     description: Creates a new menu item.
 *     tags:
 *       - Menu
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
 *                 description: The name of the menu
 *               icon:
 *                 type: string
 *                 description: The icon for the menu
 *               tooltip:
 *                 type: string
 *                 description: The tooltip for the menu
 *               description:
 *                 type: string
 *                 description: A description of the menu
 *               url:
 *                 type: string
 *                 description: The URL for the menu
 *               sortOrder:
 *                 type: number
 *                 description: The order of the menu
 *               ParentId:
 *                 type: number
 *                 description: The ID of the parent menu (optional)
 *               subMenu:
 *                 type: boolean
 *                 description: Indicates if this menu has submenus
 *               isMenu:
 *                 type: boolean
 *                 description: Indicates if this is a menu item
 *     responses:
 *       '201':
 *         description: Menu created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Server error
 */

router.post('/', catchAsync(createMenu));

/**
 * @swagger
 * /api/v1/menu:
 *   get:
 *     summary: Get all menus
 *     description: Retrieves all menu items, including their children.
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Server error
 */
router.get('/', catchAsync(getAllMenus));
/**
 * @swagger
 * /api/v1/menu/role-menu:
 *   post:
 *     summary: Create or update a role menu
 *     description: Creates or updates a role menu with associated menu IDs.
 *     tags:
 *       - UserMenu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *                 description: The unique identifier for the role
 *               menuIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of menu IDs associated with the user
 *     responses:
 *       '201':
 *         description: Role menu created successfully
 *       '200':
 *         description: Role menu updated successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Server error
 */
router.post('/role-menu', catchAsync(createUserMenu));
/**
 * @swagger
 * /api/v1/menu/getRoleMenu:
 *   post:
 *     summary: Get role menu
 *     description: Retrieves the menu IDs associated with a role.
 *     tags:
 *       - UserMenu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *                 description: The unique identifier for the role
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Role menu not found
 *       '500':
 *         description: Server error
 */
router.post('/getRoleMenu', catchAsync(getUserMenu));

export default router;
