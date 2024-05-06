import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity('GoodDeeds')
export class GoodDeed {
  @PrimaryGeneratedColumn()
  @AutoMap()
  Id: number;

  @Column({
    nullable: false,
  })
  @AutoMap()
  UserId: string;

  @Column({
    nullable: false,
  })
  @AutoMap()
  GoodDeed: string;

  @ManyToOne(() => User, (user) => user.GoodDeeds, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'Id' }])
  User: User;
}
