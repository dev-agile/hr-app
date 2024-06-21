import { Router } from "express";
import authRoutes from './auth'
import  middleware from './../middleware'
import adminRoutes from './admin'

const router = Router()

router.use("/admin",middleware.accessToken,adminRoutes)
router.use("/auth", authRoutes)

export default router