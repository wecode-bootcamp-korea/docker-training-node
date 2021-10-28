import express from "express";
import productRouter from "./productRouter";

const router = express.Router();

router.use("/ping", (req, res) => {
  console.log('pong')
  return (res.status(200).json({ message: 'pong' }
))})

router.use("/products", productRouter)

export default router
