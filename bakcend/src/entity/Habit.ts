import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id!: number; // Add `!` to tell TypeScript this will be initialized by TypeORM

  @Column()
  habitName!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  selectedDays!: string;

}
