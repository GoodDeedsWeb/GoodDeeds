import { AutoMap } from '@automapper/classes';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity('UsersFriends')
export class UserFriend {
  @PrimaryColumn({
    nullable: false,
  })
  @AutoMap()
  UserId: number;

  @PrimaryColumn({
    nullable: false,
  })
  @AutoMap()
  FriendId: number;

  @ManyToOne(() => User, (user) => user.Users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'Id' }])
  User: User;

  @ManyToOne(() => User, (user) => user.Friends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FriendId', referencedColumnName: 'Id' }])
  Friend: User;
}
