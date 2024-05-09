/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import NavPanel from "../../components/nav/panel";
import MyProfileDataContainer from "../../containers/my.profile.data.container";

// eslint-disable-next-line @next/next/no-async-client-component
export default function MyProfile() {
  return (
    <>
      <NavPanel/>
      <MyProfileDataContainer/>
    </>
  );
}
