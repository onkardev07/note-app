import { Router } from "express";
import { authMiddleware } from "../middleware";
import { prismaClient } from "../db";
import { z } from "zod";
import { NoteCreateSchema } from "../types";

const router = Router();
//@ts-ignore

router.post("/create", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id: string = req.id;
  const body = req.body;

  const parsedData = NoteCreateSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  try {
    const note = await prismaClient.note.create({
      data: {
        data: parsedData.data.data,
        userId: parseInt(id),
      },
    });

    return res.status(201).json({ noteId: note.id });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//@ts-ignore
router.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id: string = req.id;

  try {
    const notes = await prismaClient.note.findMany({
      where: { userId: parseInt(id) },
      select: { id: true, data: true },
    });

    return res.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//@ts-ignore
router.delete("/:id", authMiddleware, async (req, res) => {
  //@ts-ignore
  const userId: string = req.id;
  const noteId = parseInt(req.params.id);

  if (isNaN(noteId)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const note = await prismaClient.note.findUnique({
      where: { id: noteId },
    });

    if (!note || note.userId !== parseInt(userId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized or note not found" });
    }

    await prismaClient.note.delete({
      where: { id: noteId },
    });

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const noteRouter = router;
