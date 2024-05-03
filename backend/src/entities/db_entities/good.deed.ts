import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoodDeedUser } from './good.deeds.user';

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

}
