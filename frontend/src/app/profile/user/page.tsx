/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import NavPanel from "../../components/nav/panel";
import { useSearchParams } from 'next/navigation';
import UserProfileDataContainer from '@/app/containers/user.profile.data.container';

// eslint-disable-next-line @next/next/no-async-client-component
export default function UserProfile() {
  const searchParams = useSearchParams()
 
  const userId = searchParams.get('id')

  if (!userId) {
    return <div>404 PAGE NOT FOUND</div>
  }

  return (
    <div>
        <NavPanel/> 
      <div>
        <UserProfileDataContainer userId={userId}/>
      </div>
    </div>
  );
}
