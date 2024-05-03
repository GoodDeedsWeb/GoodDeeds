import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({
    nullable: false,
  })
  @AutoMap()
  name: string;

  @Column({
    nullable: false,
  })
  @AutoMap()
  password: string;
}
