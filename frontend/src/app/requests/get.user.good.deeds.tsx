import { useEffect, useState } from "react";
import GoodDeed from "../interfaces/good.deed.interface";

export function GetUserGoodDeeds(): GoodDeed[] | null {
    const [data, setData] = useState<GoodDeed[]>();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("Bearer");
        const url = 'http://localhost:4000/good-deed'; 
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