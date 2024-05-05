/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFriend } from 'src/entities/db_entities/user.friend';
import { IUserFriendRepository } from 'src/interfaces/repositories/user.friend.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserFriendRepository implements IUserFriendRepository {  
  constructor(@InjectRepository(UserFriend) private readonly userFriendStorage: Repository<UserFriend>) {}

    async create(userFriend: UserFriend): Promise<boolean> {
        let isCompleted = false;

        const tempUserId = userFriend.UserId; 
        const tempFriendId = userFriend.FriendId; 

        const queryRunner = this.userFriendStorage.createQueryBuilder().connection.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(userFriend);

            userFriend.FriendId = tempUserId;
            userFriend.UserId = tempFriendId;

            await queryRunner.manager.save(userFriend);
        

            await queryRunner.commitTransaction();
            isCompleted = true;
        }
        catch {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }

        return isCompleted;
    }

    async findByUserId(userId: number): Promise<UserFriend[]> {
        return await this.userFriendStorage.find({ where: { UserId: userId }, relations: ['User', 'Friend'] })
    }

    async findUserFriend(userFriend: UserFriend): Promise<UserFriend | null> {
        return await this.userFriendStorage.findOne({ where: { UserId: userFriend.UserId, FriendId: userFriend.FriendId } });
    }

    async delete(userFriend: UserFriend): Promise<boolean> {
        let isCompleted = false;

        const tempUserId = userFriend.UserId; 
        const tempFriendId = userFriend.FriendId; 

        const queryRunner = this.userFriendStorage.createQueryBuilder().connection.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.remove(userFriend);

            userFriend.FriendId = tempUserId;
            userFriend.UserId = tempFriendId;

            await queryRunner.manager.remove(userFriend);
        

            await queryRunner.commitTransaction();
            isCompleted = true;
        }
        catch {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }

        return isCompleted;
    }
}
