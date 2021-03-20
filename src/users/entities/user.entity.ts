import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  // Do not share hashed password!
  @Column({ length: 500 })
  @Exclude()
  hashedPassword: string;

  @Column({
    nullable: true
  })
  // FIXME: Exclude() does not appear to be doing diddly squat
  @Exclude()
  public currentHashedRefreshToken?: string;

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
