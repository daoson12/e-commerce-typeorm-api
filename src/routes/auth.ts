
import { Router } from "express";
const router = Router();
const verifyToken=require("../config/verifyToken")

import {
    signIn,
    changePassword
 
  
  } from "../controllers/Auth.controller";
router.post('/login', signIn)

router.post('/change-password', verifyToken, changePassword)

export default router;
