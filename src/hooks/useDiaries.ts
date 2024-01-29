import { useState } from "react";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { diaries, type Diary } from "@/types/database";
import useSWR from "swr";

// THIS IS NOT THE MOST OPTIMAL WAY OF FETCHING THIS
// FOR POSSIBLE UPDATES YES, BUT FOR READING, NO
export const useDiaries = () => {
  const [data, setData] = useState<Diary[]>([]);
  const db = useDatabaseContext();

  const { mutate } = useSWR(
    "/fetchDiaries",
    async () => {
      const result: Diary[] = await db.select().from(diaries);
      setData(result);
    },
    {
      refreshInterval: 5_000,
    }
  );

  return { data, mutate };
};
