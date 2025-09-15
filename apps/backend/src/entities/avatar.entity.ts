import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avatars')
export class AvatarEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  url!: string;
}
