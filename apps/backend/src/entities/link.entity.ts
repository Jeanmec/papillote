import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum LinkStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('links')
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fromUserId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'fromUserId', referencedColumnName: 'mobileId' })
  fromUser!: UserEntity;

  @Column()
  toUserId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'toUserId', referencedColumnName: 'mobileId' })
  toUser!: UserEntity;

  @Column({ nullable: true })
  fromUserPseudo!: string;

  @Column({ nullable: true })
  toUserPseudo!: string;

  @Column({
    type: 'enum',
    enum: LinkStatus,
    default: LinkStatus.PENDING,
  })
  status!: LinkStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
