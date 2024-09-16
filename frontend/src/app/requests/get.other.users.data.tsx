import UsersDataWithPagingMetaData from "../interfaces/users.data.with.paging.meta.data";

export default async function GetOtherUsersData(currentPage: number): Promise<UsersDataWithPagingMetaData | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem('Bearer');

  const url = 'https://good-deeds.zapto.org/api/user/other?pageSize=5&currentPage=' + currentPage; 
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + token,
    }
  }
  const response = await fetch(url, options);

  const users = await response.json();

  const metaData = response.headers.get('X-Pagination');

  if (!metaData) {
    return null;
  }

  const jsonMetaData = JSON.parse(metaData);

  return { UsersData: users, MetaData : { CurrentPage: jsonMetaData.CurrentPage, PageSize: jsonMetaData.PageSize, HasNext: jsonMetaData.HasNext, HasPrevious: jsonMetaData.HasPrevious } }
}