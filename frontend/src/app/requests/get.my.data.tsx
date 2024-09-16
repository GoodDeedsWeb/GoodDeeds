import UserData from "../interfaces/user.data.interface";

export default async function GetMyData(): Promise<UserData | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem('Bearer');
  const myId = localStorage.getItem('UserId');

  const url = 'https://good-deeds.zapto.org/api/user/my?id=' + myId;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + token,
    }
  }
  const response = await fetch(url, options);

  return await response.json();
}