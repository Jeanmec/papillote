import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @Column({ primary: true, unique: true })
  mobileId!: string;

  @Column({ unique: true })
  generatedId!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  avatar!: string;
}
