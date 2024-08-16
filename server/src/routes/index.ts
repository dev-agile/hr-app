import { Router } from "express";
import authRoutes from './auth'
import  middleware from '@middleware'
import adminRoutes from './admin'
import employeesRoutes from './employees'
import holidayRoutes from './holiday'
import userRoutes from './users'
import menuRoutes from './menu'
const router = Router()
router.use("/admin",adminRoutes)
router.use("/auth", authRoutes)
router.use("/employees",employeesRoutes)
router.use("/holiday",holidayRoutes)
router.use("/users",userRoutes)
router.use("/menu", menuRoutes)

export default router