import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserGoodDeed } from './user.good.deeds';

@Entity('GoodDeeds')
export class GoodDeed {
  @PrimaryGeneratedColumn()
  @AutoMap()
  Id: number;

  @Column({
    nullable: false,
  })
  @AutoMap()
  DeedInfo: string;

  @OneToMany(() => UserGoodDeed, (goodDeedUser) => goodDeedUser.GoodDeed, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  GoodDeedsUser: UserGoodDeed[];
}
