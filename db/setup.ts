import createDbContext, { IDatabase, IQueryResultItem, IBaseModule } from 'expo-sqlite-wrapper'
import * as SQLite from 'expo-sqlite';
import { Cattle, TableNames } from './cattle';
import { createContext } from 'react';
const tables = [Cattle.GetTableStructor()]
export class Database {
  databaseName: string = "calves.db";
  database: IDatabase<TableNames>;
  constructor() {
    this.database = createDbContext<TableNames>(tables, async () => SQLite.openDatabase(this.databaseName));
  }
}


export const DatabaseContext = createContext<Database | null>(null);

