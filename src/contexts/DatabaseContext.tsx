import * as SQLite from "expo-sqlite";
import { createContext, type ReactNode, useEffect } from "react";

const db = SQLite.openDatabase("database.sqlite");

export const DatabaseContext = createContext(db);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS diaries (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, timestamp INTEGER);"
      );
    });
  }, []);

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};
