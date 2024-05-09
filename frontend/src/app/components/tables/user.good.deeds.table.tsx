/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import './my.good.deeds.table.scss'
import { useEffect, useState } from 'react';
import MetaData from '@/app/interfaces/meta.data';
import GetUserGoodDeeds from "@/app/requests/get.user.good.deeds";
import GoodDeed from '@/app/interfaces/good.deed.interface';

export default function UserGoodDeedsTable({ userId }: {userId: string}) {
  const [goodDeeds, setGoodDeeds] = useState<GoodDeed[] | null>(null);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  let [currentPage, setCurrentPage] = useState<number>(1);

  if (typeof window === "undefined") {
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      const goodDeedsData = await GetUserGoodDeeds(userId, currentPage);

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

  return (
    <>
      <div className='flex flex-col items-center gap-10'>
        <table>
          <caption className='title'>User good deeds
          </caption>
          <thead className='border-y uppercase'>
            <th className='cell'>Number</th>
            <th className='cell'>Good deed</th>
          </thead>
          <tbody>
            {goodDeeds.map((goodDeed: GoodDeed, index: number) => (
              <tr key={goodDeed.Id}>
                <td className='cell'>{(metaData.CurrentPage - 1) * metaData.PageSize + (index + 1)}</td>
                <td className='cell'>{goodDeed.GoodDeed}</td>
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
    </>
  );
}