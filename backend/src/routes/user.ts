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

  // Sign the JWT
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD,
    { expiresIn: "1h" }
  );

  // Store the token in an HTTP-only cookie
  res.cookie("access_token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    maxAge: 3600 * 1000,
  });

  return res.json({
    message: "Sign-in successful",
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

router.get("/auth/check", authMiddleware, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

router.post("/logout", (req: any, res: any) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
  });

  return res.status(200).json({
    message: "Successfully logged out",
  });
});

export const userRouter = router;
