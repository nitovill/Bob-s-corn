import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email: userEmail, name: userName } = req.body;

    if (!userEmail) {
      throw new Error("Missing email");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      throw new Error("Email already exists");
    }
    await prisma.user.create({
      data: { name: userName, email: userEmail },
    });

    res.status(201).json({ message: "Done" });
  } catch (err) {
    next(err);
  }
};
