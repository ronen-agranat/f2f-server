import { Person } from 'src/persons/entities/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Minutes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, person => person.minutes)
  person: Person;

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
