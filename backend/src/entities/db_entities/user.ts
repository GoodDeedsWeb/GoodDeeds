import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserGoodDeed } from './user.good.deeds';

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

  @OneToMany(() => UserGoodDeed, (goodDeedUser) => goodDeedUser.User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  GoodDeedsUser: UserGoodDeed[];
}
