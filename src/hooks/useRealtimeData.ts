"use client";

import { useEffect, useState } from "react";
import { database } from "@/firebase/config";
import { off, onValue, ref } from "firebase/database";

function useRealtimeData<T>(path: string) {
  const [data, setData] = useState<T | undefined>(undefined);
  // console.log(stockData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, path);

        onValue(dbRef, (snapshot) => {
          setData(snapshot.val());
        });

        return () => off(dbRef);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [path]);

  return data;
}

export default useRealtimeData;
