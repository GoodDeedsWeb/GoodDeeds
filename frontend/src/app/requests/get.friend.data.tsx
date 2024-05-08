import { useEffect, useState } from "react";
import UserData from "../interfaces/user.data.interface";

export function GetUsersData(): UserData[] | null {
    const [data, setData] = useState<UserData[]>();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("Bearer");
        const url = 'http://localhost:4000/user/other'; 
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': 'Bearer ' + token,
            }
          }
        fetch(url, options)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          })
      }
    });

    if (!data) {
        return null;
    }

    return data;
}