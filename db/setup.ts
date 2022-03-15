import createDbContext, {
  IDatabase,
  IQueryResultItem,
  IBaseModule,
} from 'expo-sqlite-wrapper';
import * as SQLite from 'expo-sqlite';
import { createContext } from 'react';
import { Cattle, TableNames } from './cattle';

const tables = [Cattle.GetTableStructor()];
export class Database {
  databaseName = 'calves.db';

  database: IDatabase<TableNames>;

  constructor() {
    this.database = createDbContext<TableNames>(tables, async () =>
      SQLite.openDatabase(this.databaseName),
    );
  }
}

export const DatabaseContext = createContext<Database | null>(null);
