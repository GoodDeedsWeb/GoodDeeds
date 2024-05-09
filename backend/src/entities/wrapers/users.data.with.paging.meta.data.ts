import { MetaData } from '../pagination/meta.data';
import { UserDto } from '../user_dto/user.dto';

export class UsersDataWithPagingMetaData {
  UsersDto: UserDto[];

  MetaData: MetaData;
}
