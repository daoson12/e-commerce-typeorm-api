import { Router } from "express";
const router = Router();
const verifyToken=require("../config/verifyToken")

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  

} from "../controllers/User.controller";
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser, verifyToken);
router.delete("/users/:id", deleteUser, verifyToken);

export default router;