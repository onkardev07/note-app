import express from "express";
import cors from "cors";
// @ts-ignore
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user";

const app = express();

const allowedOrigin = "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
