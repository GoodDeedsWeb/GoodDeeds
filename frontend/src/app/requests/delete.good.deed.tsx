export default async function DeleteGoodDeed(goodDeedId: number): Promise<boolean> {
    if (typeof window === "undefined") {
        return false;
      }
        
      const token = localStorage.getItem('Bearer');
      const myId = localStorage.getItem('UserId')
    
      const data = {
        Id : goodDeedId,
        UserId: myId,
      }
    
      const jsonData = JSON.stringify(data);
    
      const url = 'http://localhost:4000/good-deed';
    
      const option = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': 'Bearer ' + token,
        },
        body: jsonData,
      };
      
      const response = await fetch(url, option);
  
      return response.status == 200 ? true : false;
  }