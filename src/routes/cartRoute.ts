import { Router } from "express";
const router = Router();
const verifyToken=require("../config/verifyToken")

import {
  getAllCarts,
  getCartById,
  createNewCart,
  updateCart,
  deleteCart

} from "../controllers/Cart.controller";
router.get("/carts",getAllCarts,verifyToken);
router.get("/cart/:id", getCartById,verifyToken);
router.post("/cart", createNewCart,verifyToken);
router.put("/product/:id", updateCart, verifyToken);
router.delete("/product/:id",   deleteCart, verifyToken);

export default router;