import { Router } from "express";
import {
  handlePurchase,
  getPurchasesByUser,
} from "../controllers/purchases.controllers";

const router = Router();

router.post("/", handlePurchase);
router.get("/", getPurchasesByUser);

export default router;
