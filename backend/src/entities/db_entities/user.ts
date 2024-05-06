import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { GoodDeed } from './good.deed';
import { UserFriend } from './user.friend';

@Entity('Users')
export class User {
  @PrimaryColumn({ length: 15 })
  @AutoMap()
  Id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @AutoMap()
  Email: string;

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
