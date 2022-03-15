import {
  IBaseModule,
  TableStructor,
  ColumnType,
  IQueryResultItem,
} from 'expo-sqlite-wrapper';

export type TableNames = 'Cattle';

export class Cattle extends IBaseModule<TableNames> {
  tag: string;

  sex: string;

  dateOfBirth: string;

  description: string;

  parentSire: string;

  parentDame: string;

  purchaseDate: string;

  purchasedFrom: string;

  constructor(
    tag: string,
    sex: string,
    dateOfBirth: string,
    description: string,
    parentSire: string,
    parentDame: string,
    purchaseDate: string,
    purchasedFrom: string,
  ) {
    super('Cattle');
    this.tag = tag;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.description = description;
    this.parentSire = parentSire;
    this.parentDame = parentDame;
    this.purchaseDate = purchaseDate;
    this.purchasedFrom = purchasedFrom;
  }

  static GetTableStructor() {
    return new TableStructor<Cattle, TableNames>('Cattle', [
      {
        columnName: x => x.id,
        columnType: ColumnType.Number,
        nullable: false,
        isPrimary: true,
        autoIncrement: true,
      },
      { columnName: x => x.tag, columnType: ColumnType.String },
      { columnName: x => x.sex, columnType: ColumnType.String },
      { columnName: x => x.dateOfBirth, columnType: ColumnType.String },
      { columnName: x => x.description, columnType: ColumnType.String },
      { columnName: x => x.parentSire, columnType: ColumnType.String },
      { columnName: x => x.parentDame, columnType: ColumnType.String },
      { columnName: x => x.purchaseDate, columnType: ColumnType.String },
      { columnName: x => x.purchasedFrom, columnType: ColumnType.String },
    ]);
  }
}
