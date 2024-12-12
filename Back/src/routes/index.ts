import { Router, Request, Response } from "express";
import punchasesRoutes from "./purchases.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/buy", punchasesRoutes);
router.use("/users", usersRoutes);

router.use((req: Request, res: Response): void => {
  res.status(404).json({
    error: true,
    message: "Endpoint not found",
  });
});

export default router;
