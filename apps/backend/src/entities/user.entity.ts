import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AvatarEntity } from './avatar.entity';

@Entity('users')
export class UserEntity {
  @Column({ primary: true, unique: true })
  mobileId!: string;

  @Column({ unique: true })
  generatedId!: string;

  @Column()
  password!: string;

  @ManyToOne(() => AvatarEntity)
  @JoinColumn({ name: 'avatarId' })
  avatar!: AvatarEntity;
}
