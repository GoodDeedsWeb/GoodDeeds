import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';
import { GoodDeed } from './good.deed';

@Entity('UsersGoodDeeds')
export class UserGoodDeed {
  @PrimaryColumn()
  UserId: number;

  @PrimaryColumn()
  GoodDeedId: number;

  @ManyToOne(() => User, (user) => user.GoodDeedsUser)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'Id' }])
  User: User;

  @ManyToOne(() => GoodDeed, (goodDeed) => goodDeed.GoodDeedsUser)
  @JoinColumn([{ name: 'GoodDeedId', referencedColumnName: 'Id' }])
  GoodDeed: GoodDeed;
}
