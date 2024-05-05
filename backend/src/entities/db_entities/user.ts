import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoodDeed } from './good.deed';
import { UserFriend } from './user.friend';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  Id: number;

  @Column({
    nullable: false,
  })
  @AutoMap()
  Name: string;

  @Column({
    nullable: false,
  })
  @AutoMap()
  Password: string;

  @OneToMany(() => GoodDeed, (goodDeed) => goodDeed.User)
  GoodDeeds: GoodDeed[];

  @OneToMany(() => UserFriend, (userFriend) => userFriend.User)
  Users: UserFriend[];

  @OneToMany(() => UserFriend, (userFriend) => userFriend.Friend)
  Friends: UserFriend[];
}
