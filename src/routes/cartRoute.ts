import { Router } from "express";
const router = Router();
const verifyToken=require("../config/verifyToken")

import {
  getAllCarts

} from "../controllers/Cart.controller";
router.get("/carts",getAllCarts,verifyToken);
// router.get("/product/:id", getProductById,verifyToken);
// router.post("/product", createNewProduct,verifyToken);
// router.put("/product/:id", updateProduct, verifyToken);
// router.delete("/product/:id",   deleteProduct, verifyToken);

export default router;