/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import './user.profile.data.container.style.scss';
import { useEffect, useState } from "react";
import ProfileData from "../components/account/profile.data";
import GoodDeed from "../interfaces/good.deed.interface";
import UserDataWithFriendStatus from '../interfaces/user.data.with.friends.status';
import GetUserDataWithFriendStatus from '../requests/get.user.data.with.friend.status';
import AddFriendButton from '../components/buttons/add.friend.button';
import DeleteFriendButton from '../components/buttons/delete.friend.button';
import UserGoodDeedsTable from '../components/tables/user.good.deeds.table';

export default function UserProfileDataContainer({ userId }: { userId: string }) {
  const [userDataWithFriendStatus, setUserDataWithFriendStatus] = useState<UserDataWithFriendStatus | null>(null);
  const [goodDeeds, setGoodDeeds] = useState<GoodDeed[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userDataWithFriendStatus = await GetUserDataWithFriendStatus(userId);
      setUserDataWithFriendStatus(userDataWithFriendStatus);
    };

    fetchData();
  }, [userId]);

  if (!userDataWithFriendStatus) {
    return null
  }

  return ( 
    <div id='user-data' className='user-data-container'>
      <div>
      <ProfileData userData={userDataWithFriendStatus.UserData}/>
      {userDataWithFriendStatus.IsFriend ? <DeleteFriendButton userId={userId}/> : <AddFriendButton userId={userId}/>}
      </div>
      {userDataWithFriendStatus.IsFriend && <UserGoodDeedsTable userId={userDataWithFriendStatus.UserData.Id}/>}
    </div>
  );
}