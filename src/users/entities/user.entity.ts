import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  // Do not share hashed password!
  @Column({ length: 500 })
  hashedPassword: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ length: 500, nullable: true })
  imageUrl: string;

  @Column({ length: 25, nullable: true })
  phone: string;

  @Column()
  isAdmin: boolean = false;

  @CreateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}
