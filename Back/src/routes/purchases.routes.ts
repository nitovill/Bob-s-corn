import { Router } from "express";
import { handlePurchase } from "../controllers/punchases.controllers";

const router = Router();

router.post("/", handlePurchase);

export default router;
