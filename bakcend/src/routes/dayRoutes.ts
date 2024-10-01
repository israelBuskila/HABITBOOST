import express from "express";
import {
  deleteDay,
  getAllDays,
  getDayById,
  saveDay,
  updateDay,
} from "../services/dayService";

const router = express.Router();

router.get("/", getAllDays);

router.get("/:id", getDayById);

router.post("/", saveDay);

router.put("/", updateDay);

router.delete("/:id", deleteDay);

export default router;
