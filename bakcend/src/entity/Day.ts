import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id!: number; // Add `!` to tell TypeScript this will be initialized by TypeORM

  @Column()
  habitName!: string;

  @Column()
  done!: boolean; 
  
}
