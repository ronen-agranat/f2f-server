import { Minutes } from 'src/minutes/entities/minutes.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  role: string;

  @Column({ length: 500 })
  imageUrl: string;

  @Column({ length: 25 })
  phone: string;

  @Column({ length: 255 })
  team: string;

  @Column()
  userId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Minutes, minutes => minutes.person)
  minutes: Minutes[];
}
