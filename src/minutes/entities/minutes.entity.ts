import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
