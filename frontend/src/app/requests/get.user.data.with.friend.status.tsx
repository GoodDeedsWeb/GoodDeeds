import UserDataWithFriendStatus from "../interfaces/user.data.with.friends.status";

export default async function GetUserDataWithFriendStatus(userId: string): Promise<UserDataWithFriendStatus | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("Bearer");

  const url = 'http://localhost:4000/user?userId='+userId;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + token,
    }
  }
  const response = await fetch(url, options);

  const headers = response.headers;

  const headerValue = headers.get('X-IsFriend');

  if (!headerValue) {
    return null;
  }

  const isFriend = JSON.parse(headerValue.toLowerCase());

  const userData = await response.json();

  return { UserData: userData, IsFriend : isFriend};
}