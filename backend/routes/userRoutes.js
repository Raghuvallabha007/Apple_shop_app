import express from "express";
const userRouter = express.Router()
import {
    authUser, authUserProfile, registerUser, updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


userRouter.route('/').post(registerUser)
userRouter.route('/login').post(authUser)
userRouter.route('/profile').get(protect, authUserProfile).put(protect, updateUserProfile)

export default userRouter