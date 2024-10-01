import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Habit } from "../entity/Habit";
import { Day } from "../entity/Day";

// Initialize the DataSource for PostgreSQL
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "postgres",
  synchronize: true, // In production, use migrations instead
  logging: true,
  entities: [User, Habit, Day],
});

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });
