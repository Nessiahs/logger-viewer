/* eslint-disable camelcase */
import Dexie from "dexie";
export interface IConsoleLog {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  extras: string;
}

export interface IConsoleError {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  callstack: string;
}

export interface IConsoleInfo {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  extras: string;
}

export interface IConsoleWarning {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  extras: string;
}

export interface IScriptError {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  stacktrace: string;
  react_info: string;
}

export interface IPagestart {
  id?: number;
  time: string;
  url: string;
}

const logIncludes = {
  all: ["log", "info", "warn", "error"],
  info: ["info", "warn", "error"],
  warn: ["warn", "error"],
  error: ["error"],
};

export type TLogLevel = keyof typeof logIncludes;

export type TInsertTypes = "log" | "error" | "warn" | "info";

type TBulk = {
  tableName: "log" | "info" | "error" | "warning" | "history" | "scriptError";
  rows:
    | IConsoleLog[]
    | IConsoleInfo[]
    | IConsoleError[]
    | IConsoleWarning[]
    | IPagestart[]
    | IScriptError[];
};

type TTableDefinition = {
  name: string;
  schema: string;
  rowCount: number;
};

export class ImportDb extends Dexie {
  private log: Dexie.Table<IConsoleLog, number>;
  private error: Dexie.Table<IConsoleError, number>;
  private warning: Dexie.Table<IConsoleWarning, number>;
  private info: Dexie.Table<IConsoleInfo, number>;
  private history: Dexie.Table<IPagestart, number>;
  private scriptError: Dexie.Table<IScriptError, number>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      log: "++id, page_id, time, message, extras",
      info: "++id, page_id, time, message, extras",
      error: "++id,page_id, time, message, callstack",
      warning: "++id, page_id, time, message, extras",
      history: "++id, time, url",
      scriptError: "++id, page_id, time, message, stacktrace, react_info",
    });

    this.history = this.table("history");
    this.log = this.table("log");
    this.error = this.table("error");
    this.warning = this.table("warning");
    this.info = this.table("info");
    this.scriptError = this.table("scriptError");
  }

  private bulkByTable(data: TBulk) {
    switch (data.tableName) {
      case "log":
        return this.log.bulkAdd(data.rows as IConsoleLog[]);

      case "info":
        return this.info.bulkAdd(data.rows as IConsoleInfo[]);

      case "error":
        return this.error.bulkAdd(data.rows as IConsoleError[]);

      case "warning":
        return this.warning.bulkAdd(data.rows as IConsoleWarning[]);

      case "history":
        return this.history.bulkAdd(data.rows as IPagestart[]);

      case "scriptError":
        return this.scriptError.bulkAdd(data.rows as IScriptError[]);

      default:
        throw new Error(`Can't find a import for ${data.tableName}`);
    }
  }

  private getSchema(ref: TTableDefinition) {
    const TableSchema = this.tables.find((table) => table.name === ref.name);
    const importedSchema = ref.schema.replace("++", "").split(",");

    if (!TableSchema) {
      throw new Error(`No schema fount for ${ref.name}`);
    }

    const schema = TableSchema.schema;

    if (importedSchema.includes(schema.primKey.name) === false) {
      throw new Error(
        `Can't find index ${schema.primKey.name} in table ${ref.name}`
      );
    }

    for (const key of schema.indexes) {
      if (importedSchema.includes(key.name) === false) {
        throw new Error(`Can't find index ${key.name} in table ${ref.name}`);
      }
    }
  }

  async import(data: any) {
    if (data.hasOwnProperty("dexie") && data.dexie.formatName === "dexie") {
      const toImport = data.dexie.data.data;
      const importReference = data.dexie.data.tables;

      for (const item of toImport) {
        const ref: TTableDefinition = importReference.find(
          (i: TTableDefinition) => i.name === item.tableName
        );

        this.getSchema(ref);
        const imported = (await this.bulkByTable(item)) ?? 0;

        if (imported !== ref.rowCount) {
          throw new Error("Import dif error");
        }
      }
    }

    return true;
  }
}
