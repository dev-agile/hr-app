import { Router } from 'express'
import * as employees from './employees'


const router = Router()

router.use("/employees",employees.default)


export default router