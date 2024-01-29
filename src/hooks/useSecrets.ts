import { useState } from "react";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { secrets, type Secret } from "@/types/database";

import useSWR from "swr";

// THIS IS NOT THE MOST OPTIMAL WAY OF FETCHING THIS
// FOR POSSIBLE UPDATES YES, BUT FOR READING, NO
export const useSecrets = () => {
  const [data, setData] = useState<Secret[]>([]);
  const db = useDatabaseContext();

  const { mutate } = useSWR(
    "/fetchSecrets",
    async () => {
      const result: Secret[] = await db.select().from(secrets);
      setData(result);
    },
    {
      refreshInterval: 5_000,
    }
  );

  return { data, mutate };
};
