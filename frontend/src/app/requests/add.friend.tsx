export default async function AddFriend(userId: string): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }
    
  const token = localStorage.getItem('Bearer');
  const myId = localStorage.getItem('UserId');

  const data = {
    UserId: myId,
    FriendId : userId,
  }

  const jsonData = JSON.stringify(data);

  const url = 'https://good-deeds.zapto.org/api/friend';

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + token,
    },
    body: jsonData,
  };
  
  const response = await fetch(url, option);

  return response.status == 201 ? true : false;
}