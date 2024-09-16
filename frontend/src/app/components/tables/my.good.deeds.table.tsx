/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import './my.good.deeds.table.scss'
import { useEffect, useState } from 'react';
import MetaData from '@/app/interfaces/meta.data';
import GetUserGoodDeeds from "@/app/requests/get.user.good.deeds";
import GoodDeed from '@/app/interfaces/good.deed.interface';
import DeleteGoodDeed from '@/app/requests/delete.good.deed';
import ModalWindow from '../popup/modal.window';
import UpdateGoodDeedForm from '../forms/update.good.deed.form';
import CreateGoodDeedForm from '../forms/create.good.deed.form';

export default function MyGoodDeedsTable() {
  const [goodDeeds, setGoodDeeds] = useState<GoodDeed[] | null>(null);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [isOpenUpdateModal, SwitchStateUpdateModal] = useState<boolean>(false);
  const [isOpenCreateModal, SwitchStateCreareModal] = useState<boolean>(false);
  let [currentPage, setCurrentPage] = useState<number>(1);
  const [goodDeedId, setGoodDeedId] = useState<number | null>(null);

  if (typeof window === "undefined") {
    return null;
  }

  const myId = String(localStorage.getItem('UserId'));

  if (!myId) {
    window.location.href = 'https://good-deeds.zapto.org/auth?mode=login';
  }

  useEffect(() => {
    const fetchData = async () => {
      const goodDeedsData = await GetUserGoodDeeds(myId, currentPage);

      if (goodDeedsData) {
        setGoodDeeds(goodDeedsData.GoodDeeds);
        setMetaData(goodDeedsData.MetaData);
      }
    };

    fetchData();
  }, [currentPage]);

  if (!goodDeeds || !metaData) {
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

  const switcherUpdateModal = () => {
    SwitchStateUpdateModal(!isOpenUpdateModal);
  };

  const switcherCreateModal = () => {
    SwitchStateCreareModal(!isOpenCreateModal);
  };

  const deleteGoodDeed = async (goodDeedId: number) => {
    const result = await DeleteGoodDeed(goodDeedId);

    if (result) {
      window.location.reload();
    }
  }

  const updateForm = (
    <UpdateGoodDeedForm closeForm={switcherUpdateModal} goodDeedId={Number(goodDeedId)}/>
  );

  const createForm = (
    <CreateGoodDeedForm closeForm={switcherCreateModal}/>
  );


  return (
    <>
      <div className='flex flex-col items-center gap-10'>
        <table>
          <caption className='title'>My good deeds
            <button type="button" onClick={switcherCreateModal} className="flex py-2.5 px-5 mx-2 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-500 hover:bg-gray-100 hover:text-green-700">
              Create
            </button>
          </caption>
          <thead className='border-y uppercase'>
            <th className='cell'>Number</th>
            <th className='cell'>Good deed</th>
            <th className='cell'>Action</th>
          </thead>
          <tbody>
            {goodDeeds.map((goodDeed: GoodDeed, index: number) => (
              <tr key={goodDeed.Id}>
                <td className='cell'>{(metaData.CurrentPage - 1) * metaData.PageSize + (index + 1)}</td>
                <td className='cell'>{goodDeed.GoodDeed}</td>
                <td className='cell cell-btn'>                
                  <button type="button" onClick={() => { setGoodDeedId(goodDeed.Id); switcherUpdateModal(); }} className="py-2.5 px-5 mx-2 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-500 hover:bg-gray-100 hover:text-green-700">
                    Update
                  </button>
                  <button type="button" onClick={() => deleteGoodDeed(goodDeed.Id)} className="py-2.5 px-5 mx-2 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-500 hover:bg-gray-100 hover:text-red-700">
                    Delete
                  </button>
                </td>
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
      <ModalWindow ClassName='update-good-deed-modal' Children={updateForm} IsOpen={isOpenUpdateModal} SwitchState={switcherUpdateModal}/>
      <ModalWindow ClassName='create-good-deed-modal' Children={createForm} IsOpen={isOpenCreateModal} SwitchState={switcherCreateModal}/>
    </>
  );
}