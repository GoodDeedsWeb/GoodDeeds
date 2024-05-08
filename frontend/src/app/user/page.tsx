'use client';

import UserTable from "../_components/tables/user.table";
import './page.scss';
import ProfileData from "../_components/account/profile.data";
import { useSearchParams } from "next/navigation";
import GoodDeedData from "../_components/good_deed_data/good_deed_data";
import NavPanel from "../_components/nav/panel";

// eslint-disable-next-line @next/next/no-async-client-component
export default function UserProfile() {
  const searchParams = useSearchParams();
    
  const userId = searchParams.get('userId');

  if (!userId) {
    return <div></div>
  }
  return (
    <div>
        <NavPanel/>
      <div className="container">
        <div id="user-data" className="userData">
          <ProfileData userId={userId}/>
          <GoodDeedData/>
        </div>
        <div id="users-table" className="big-table">
          <UserTable/>
        </div>  
      </div>
    </div>

  );
}
