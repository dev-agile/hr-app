import { Router } from "express";
import authRoutes from './auth'
import  middleware from '@middleware'
import adminRoutes from './admin'
import employeesRoutes from './employees'

const router = Router()
router.use("/admin",adminRoutes)
router.use("/auth", authRoutes)
router.use("/employees",employeesRoutes)

export default router