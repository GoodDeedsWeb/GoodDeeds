/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import './my.profile.data.container.style.scss';
import { useEffect, useState } from "react";
import ProfileData from "../components/account/profile.data";
import UserData from '../interfaces/user.data.interface';
import GetMyData from '../requests/get.my.data';
import ModalWindow from '../components/popup/modal.window';
import UpdateUserForm from '../components/forms/update.user.form';
import DeleteUserForm from '../components/forms/delete.user.form';
import MyGoodDeedsTable from '../components/tables/my.good.deeds.table';

export default function MyProfileDataContainer() {
  
  const [myData, setUserData] = useState<UserData | null>(null);
  const [isOpenUpdateModal, SwitchStateUpdateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, SwitchStateDeleteModal] = useState<boolean>(false);

  if (typeof window === "undefined") {
    return null;
  }

  const myId = String(localStorage.getItem('UserId'));

  if (!myId) {
    window.location.href = 'https://good-deeds.zapto.org/auth?mode=login';
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetMyData();
      setUserData(userData);
    };

    fetchData();
  }, [myId]);

  if (!myData) {
    return null
  }

  const switcherUpdateModal = () => {
    SwitchStateUpdateModal(!isOpenUpdateModal);
  };

  const switcherDeleteModal = () => {
    SwitchStateDeleteModal(!isOpenDeleteModal);
  };

  const updateForm = (
    <UpdateUserForm closeForm={switcherUpdateModal}/>
  );

  const deleteForm = (
    <DeleteUserForm closeForm={switcherDeleteModal}/>
  );

  return ( 
    <div>
      <div className='page-container'>
        <div>
          <div id='my-data' className='my-data-container'>
            <ProfileData userData={myData}/>
          </div>
          <div id='buttons' className='btns-container'>
              <button type="button" onClick={switcherUpdateModal} className="py-2.5 px-5 mt-8 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-500 hover:bg-gray-100 hover:text-green-700">Update data</button>
              <button type="button" onClick={switcherDeleteModal} className="py-2.5 px-5 mt-8 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-500 hover:bg-gray-100 hover:text-red-700">Delete account</button>
          </div>
        </div>
        <MyGoodDeedsTable/>
        <ModalWindow ClassName='update-user-modal' Children={updateForm} IsOpen={isOpenUpdateModal} SwitchState={switcherUpdateModal}/>
        <ModalWindow ClassName='delete-user-modal' Children={deleteForm} IsOpen={isOpenDeleteModal} SwitchState={switcherDeleteModal}/>
      </div>
    </div>
  );
}