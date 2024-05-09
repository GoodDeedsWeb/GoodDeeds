/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import UserData from '../../interfaces/user.data.interface';
import './user.table.scss'
import { useEffect, useState } from 'react';
import MetaData from '@/app/interfaces/meta.data';
import GetOtherUsersData from '@/app/requests/get.other.users.data';

export default function UserTable() {
  const [usersData, setUsersData] = useState<UserData[] | null>(null);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  let [currentPage, setCurrentPage] = useState<number>(1);

  if (typeof window === "undefined") {
    return null;
  }

  const myId = String(localStorage.getItem('UserId'));

  if (!myId) {
    window.location.href = 'http://localhost:3000/auth?mode=login';
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetOtherUsersData(currentPage);
      console.log(userData);
      if (userData) {
        setUsersData(userData.UsersData);
        setMetaData(userData.MetaData);
      }
    };

    fetchData();
  }, [currentPage]);

  if (!usersData || !metaData) {
    return null
  }
  
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  metaData.HasNext ? nextBtn?.classList.remove('disable') : nextBtn?.classList.add('disable');
  metaData.HasPrevious ? prevBtn?.classList.remove('disable') : prevBtn?.classList.add('disable');

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <table>
        <caption className='title'>User Information</caption>
        <thead className='border-y uppercase'>
          <th className='cell'>Id</th>
          <th className='cell'>Name</th>
          <th className='cell'>Email</th>
        </thead>
        <tbody>
          {usersData.map((user: UserData) => (
            <tr key={user.Id}>
              <td className='cell'><a href={'http://localhost:3000/profile/user?id=' + user.Id} className='link'>{user.Id}</a></td>
              <td className='cell'>{user.Name}</td>
              <td className='cell'>{user.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="btn-panel">
        <nav>
          <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button onClick={previousPage} id='prev-btn' className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              Previous
            </button>
          </li>
          <li>
            <p className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>{currentPage}</p>
          </li>
          <li>
            <button onClick={nextPage} id='next-btn' className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
              Next
            </button>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}