import { useState } from "react";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import useSWR from "swr";

// THIS IS NOT THE MOST OPTIMAL WAY OF FETCHING THIS
// FOR POSSIBLE UPDATES YES, BUT FOR READING, NO
export const useDiaries = () => {
  const [diaries, setDiaries] = useState([]);
  const db = useDatabaseContext();

  useSWR(
    "/fetchDiaries",
    () => {
      db.transaction(async (tx) => {
        tx.executeSql(
          "SELECT * FROM diaries LIMIT 500;",
          [],
          // @ts-ignore
          (result, resultSet) => setDiaries(resultSet.rows._array || [])
        );
      });
    },
    {
      refreshInterval: 5_000,
    }
  );

  return diaries;
};
