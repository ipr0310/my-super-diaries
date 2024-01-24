import * as SQLite from "expo-sqlite";
import { createContext, type ReactNode, useEffect } from "react";

const db = SQLite.openDatabase("database.sqlite");

export const DatabaseContext = createContext(db);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists diaries (id integer primary key not null, title text, description text);"
      );
    });
  }, []);

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};
