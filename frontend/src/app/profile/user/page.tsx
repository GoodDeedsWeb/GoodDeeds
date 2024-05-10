/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import NavPanel from "../../components/nav/panel";
import { useSearchParams } from 'next/navigation';
import UserProfileDataContainer from '@/app/containers/user.profile.data.container';
import { Suspense } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
export default function UserProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfileInner />
    </Suspense>
  );
};

function UserProfileInner() {
  const searchParams = useSearchParams();

  const userId = searchParams.get('id');

  if (!userId) {
    return <div>404 PAGE NOT FOUND</div>;
  }

  return (
    <div>
      <NavPanel />
      <div>
        <UserProfileDataContainer userId={userId} />
      </div>
    </div>
  );
}
