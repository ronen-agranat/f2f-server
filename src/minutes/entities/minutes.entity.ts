import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Minutes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  personId: number;

  @Column('text')
  newBusiness: string;

  @Column('text')
  followUps: string;

  @Column('text')
  nextTime: string;

  @Column({ length: 500 })
  date: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
