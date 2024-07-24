import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getConversations,
  createConversation,
  updateConversation,
  getSingleConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.put("/:id", verifyToken, updateConversation);
router.get("/single/:id", verifyToken, getSingleConversation);

export default router;
