import express from "express"
import authRoutes from "./userRoutes.js"
import businessRoutes from './businessRoutes.js'
import teamRoutes from './teamRoutes.js'

const router = express.Router()

router.use("/user", authRoutes)
router.use("/business", businessRoutes)
router.use("/teams", teamRoutes)

export default router
