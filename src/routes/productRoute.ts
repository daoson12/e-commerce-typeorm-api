import { Router } from "express";
const router = Router();
const verifyToken=require("../config/verifyToken")

import {
  createNewProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  updateProduct

} from "../controllers/Product.controller";
router.get("/products",  getAllProducts,verifyToken);
router.get("/product/:id", getProductById,verifyToken);
router.post("/product", createNewProduct,verifyToken);
router.put("/product/:id", updateProduct, verifyToken);
router.delete("/product/:id",   deleteProduct, verifyToken);

export default router;