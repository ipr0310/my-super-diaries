import { useState } from "react";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import useSWR from "swr";

// THIS IS NOT THE MOST OPTIMAL WAY OF FETCHING THIS
// FOR POSSIBLE UPDATES YES, BUT FOR READING, NO
export const useSecrets = () => {
  const [secrets, setSecrets] = useState([]);
  const db = useDatabaseContext();

  const { mutate } = useSWR(
    "/fetchSecrets",
    () => {
      db.transaction(async (tx) => {
        tx.executeSql(
          "SELECT * FROM secrets LIMIT 250;",
          [],
          // @ts-ignore
          (result, resultSet) => setSecrets(resultSet.rows._array || [])
        );
      });
    },
    {
      refreshInterval: 5_000,
    }
  );

  return { secrets, mutate };
};
