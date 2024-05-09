import UserData from "./user.data.interface";

export default interface UserDataWithFriendStatus {
    UserData: UserData;
    
    IsFriend: boolean;
  }