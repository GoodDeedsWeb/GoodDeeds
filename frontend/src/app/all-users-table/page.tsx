/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import './page.scss'
import UserTable from '../components/tables/user.table';
import NavPanel from '../components/nav/panel';

// eslint-disable-next-line @next/next/no-async-client-component
export default function Users() {
  return (
    <div>
      <NavPanel/>
      <div className='container'>
        <UserTable/>
      </div>
    </div>
  );
}
