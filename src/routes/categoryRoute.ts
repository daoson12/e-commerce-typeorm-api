import { Router } from "express";
const router = Router();
const verifyToken=require("../config/verifyToken")

import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,

} from "../controllers/Category.controller";
router.get("/categories", getCategories,verifyToken);
router.get("/category/:id", getCategoryById,verifyToken);
router.post("/category", createCategory,verifyToken);
router.put("/category/:id", updateCategory, verifyToken);
router.delete("/category/:id",  deleteCategory, verifyToken);

export default router;