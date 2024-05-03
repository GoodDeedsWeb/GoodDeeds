import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoodDeedUser } from './good.deeds.user';

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

  @OneToMany(() => GoodDeedUser, (goodDeedUser) => goodDeedUser.User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  GoodDeedsUser: GoodDeedUser[];
}
