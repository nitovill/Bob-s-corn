import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const handlePurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      res.status(429).json({ message: "Too Many Requests" });
      return;
    }

    await prisma.purchase.create({
      data: {
        userId: user.id,
      },
    });

    res.status(201).json({ message: "Compra realizada con éxito" });
    return;
  } catch (err) {
    next(err);
  }
};

export const getPurchasesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userEmail: any = req.query.email;

    if (!userEmail) {
      throw new Error("Missing user email");
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const purchases = await prisma.purchase.count({
      where: {
        userId: user.id,
      },
    });

    res.status(200).json({ purchases });
    return;
  } catch (err) {
    next(err);
  }
};
