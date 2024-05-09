/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function NavPanel() {
  const [userId, setId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('UserId');
      
    if (id) {
      setId(id);
    }
  }, [userId])

  const LogOutBtn = () => {
    localStorage.removeItem('Bearer');
    localStorage.removeItem('UserId');
    window.location.href = 'http://localhost:3000/auth?mode=login';
  }

  return (
    <nav className=" bg-gray-100 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap">Good deeds</span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" onClick={LogOutBtn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">
            Log out
          </button>
        </div>
        <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a href='http://localhost:3000/profile/my' className="block py-2 px-3 text-gray-900 rounded hover:text-blue-600">Home</a>
            </li>
            <li>
              <a href="http://localhost:3000/all-users-table" className="block py-2 px-3 text-gray-900 rounded hover:text-blue-600">Users</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}