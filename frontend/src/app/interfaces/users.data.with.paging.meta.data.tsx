import MetaData from "./meta.data";
import UserData from "./user.data.interface";

export default interface UsersDataWithPagingMetaData {
  UsersData: UserData[];

  MetaData: MetaData | null;
}
