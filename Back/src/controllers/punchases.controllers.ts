import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const handlePurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const userEmail: string = req.body.email;

    if (!userEmail) {
      throw new Error("Missing email");
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const recentPurchase = await prisma.purchase.findFirst({
      where: {
        userId: user.id,
        purchaseTime: {
          gte: oneMinuteAgo,
        },
      },
    });

    if (recentPurchase) {
      return res.status(429).json({ message: "Too Many Requests" });
    }
    await prisma.purchase.create({
      data: {
        userId: user.id,
      },
    });

    res.status(201).json({ message: "Done" });
  } catch (err) {
    next(err);
  }
};
