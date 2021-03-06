import express from "express";
import { productController } from "../controllers";

const router = express.Router();

router.get("", productController.findProducts);

export default router;
