import GoodDeed from "../interfaces/good.deed.interface";
import GoodDeedsDataWithPagingMetaData from "../interfaces/good.deeds.data.with.paging.meta.data.interface";

export default async function GetUserGoodDeeds(userId : string, currentPage: number): Promise<GoodDeedsDataWithPagingMetaData | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("Bearer");

  const url = 'http://localhost:4000/good-deed?userId=' + userId + '&pageSize=5&currentPage=' + currentPage; 
  const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token,
    }
  };

  const response = await fetch(url, options);

  const goodDeeds = await response.json();
  
  const metaData = response.headers.get('X-Pagination');

  if (!metaData) {
    return null;
  }

  const jsonMetaData = JSON.parse(metaData);

  return { GoodDeeds: goodDeeds, MetaData : { CurrentPage: jsonMetaData.CurrentPage, PageSize: jsonMetaData.PageSize, HasNext: jsonMetaData.HasNext, HasPrevious: jsonMetaData.HasPrevious } }
}