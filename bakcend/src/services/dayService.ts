import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Day } from "../entity/Day";

// Get all habits
export const getAllDays = async (req: Request, res: Response) => {
  try {
    const dayRepo = AppDataSource.getRepository(Day);
    const days = await dayRepo.find();
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve days" });
  }
};

// Get a habit by ID
export const getDayById = async (req: Request, res: Response) => {
  try {
    const dayRepo = AppDataSource.getRepository(Day);
    const day = await dayRepo.findOneBy({ id: Number(req.params.id) });

    if (!day) {
      res.status(404).json({ error: "Day not found" });
      return;
    }

    res.json(day);
  } catch (error) {
    res.status(500).json({ error: "Failed to get day by ID" });
  }
};

// Create a new habit
export const saveDay = async (req: Request, res: Response) => {
  try {
    const dayRepo = AppDataSource.getRepository(Day);
    const newDay = dayRepo.create(req.body); // Create a new habit using request body
    const savedDay = await dayRepo.save(newDay); // Save the habit
    res.status(201).json(savedDay);
  } catch (error) {
    res.status(500).json({ error: "Failed to save day" });
  }
};

// Update a habit by ID
export const updateDay = async (req: Request, res: Response) => {
  try {
    const dayRepo = AppDataSource.getRepository(Day);
    const dayId = Number(req.params.id);

    // Find the habit by ID
    let dayToUpdate = await dayRepo.findOneBy({ id: dayId });

    if (!dayToUpdate) {
      res.status(404).json({ error: "Day not found" });
      return;
    }

    // Update the habit fields
    dayRepo.merge(dayToUpdate, req.body);

    // Save the updated habit
    const updatedDay = await dayRepo.save(dayToUpdate);
    res.json(updatedDay);
  } catch (error) {
    res.status(500).json({ error: "Failed to update habit" });
  }
};


// Delete a habit by ID
export const deleteDay = async (req: Request, res: Response) => {
  try {
    const dayRepo = AppDataSource.getRepository(Day);
    const { id } = req.params; // Extract habit ID from request params
    const result = await dayRepo.delete(id); // Delete the habit by ID

    if (result.affected === 0) {
      res.status(404).json({ error: "Day not found" });
      return;
    }
    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};
