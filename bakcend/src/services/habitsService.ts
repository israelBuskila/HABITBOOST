import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Habit } from "../entity/Habit";

// Get all habits
export const getAllHabits = async (req: Request, res: Response) => {
  try {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habits = await habitRepo.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve habits" });
  }
};

// Get a habit by ID
export const getHabitById = async (req: Request, res: Response) => {
  try {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habit = await habitRepo.findOneBy({ id: Number(req.params.id) });

    if (!habit) {
      res.status(404).json({ error: "Habit not found" });
      return;
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: "Failed to get habit by ID" });
  }
};

// Create a new habit
export const saveHabit = async (req: Request, res: Response) => {
  try {
    const habitRepo = AppDataSource.getRepository(Habit);
    const newHabit = habitRepo.create(req.body); // Create a new habit using request body
    const savedHabit = await habitRepo.save(newHabit); // Save the habit
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Failed to save habit" });
  }
};

// Update a habit by ID
export const updateHabit = async (req: Request, res: Response) => {
  try {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habitId = Number(req.params.id);

    // Find the habit by ID
    let habitToUpdate = await habitRepo.findOneBy({ id: habitId });

    if (!habitToUpdate) {
      res.status(404).json({ error: "Habit not found" });
      return;
    }

    // Update the habit fields
    habitRepo.merge(habitToUpdate, req.body);

    // Save the updated habit
    const updatedHabit = await habitRepo.save(habitToUpdate);
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ error: "Failed to update habit" });
  }
};


// Delete a habit by ID
export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const habitRepo = AppDataSource.getRepository(Habit);
    const { id } = req.params; // Extract habit ID from request params
    const result = await habitRepo.delete(id); // Delete the habit by ID

    if (result.affected === 0) {
      res.status(404).json({ error: "Habit not found" });
      return;
    }
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};
