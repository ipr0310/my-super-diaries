import { useEffect, createContext, type ReactNode } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";
import * as SplashScreen from "expo-splash-screen";

const expoDb = openDatabaseSync("database.db");
const db = drizzle(expoDb);

export const DatabaseContext = createContext(db);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success || error) return;

    SplashScreen.hideAsync();
  }, [success]);

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};
