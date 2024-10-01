import express from 'express';
import {
  getAllHabits,
  getHabitById,
  saveHabit,
  updateHabit,
  deleteHabit,
} from "../services/habitsService";

const router = express.Router();

router.get('/', getAllHabits);

router.get('/:id', getHabitById);

router.post('/', saveHabit);

router.put("/", updateHabit);

router.delete('/:id', deleteHabit);


export default router;
