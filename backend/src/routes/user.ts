import { Router } from "express";
import { prismaClient } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SigninSchema, SignupSchema } from "../types";
import { JWT_PASSWORD } from "../config";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", async (req: any, res: any) => {
  const body = req.body;

  const parsedData = SignupSchema.safeParse(body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { name, dob, email, password } = parsedData.data;

  const userExists = await prismaClient.user.findFirst({
    where: { email },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prismaClient.user.create({
    data: {
      name,
      dob,
      password: hashedPassword,
      email,
    },
  });

  return res.status(200).json({
    message: "Your account has been created successfully.",
    userId: newUser.id,
  });
});

router.post("/signin", async (req: any, res: any) => {
  const body = req.body;

  const parsedData = SigninSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { email, password } = parsedData.data;

  const user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user) {
    return res.status(403).json({
      message: "Sorry, credentials are incorrect",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({
      message: "Sorry, credentials are incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "Sign-in successful",
    token,
  });
});

router.get("/", authMiddleware, async (req: any, res: any) => {
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
