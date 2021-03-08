/* eslint-disable camelcase */
import Dexie from "dexie";
import { v4 as uuidv4 } from "uuid";

export type TDbBrowser = {
  name: string;
  version: string;
  versionNumber: string;
  mobile: boolean;
  os: string;
};

export type TDbScreen = {
  width: number;
  height: number;
};

export interface IAppDB {
  id?: number;
  name: string;
  dbName: string;
  createDate: Date;
  browser: TDbBrowser;
  screen: TDbScreen;
}

class AppDb extends Dexie {
  private importedDB: Dexie.Table<IAppDB, number>;

  constructor() {
    super("app-db");
    this.version(1).stores({
      importedDb: "++id, name, createDate",
    });

    this.importedDB = this.table("importedDb");
  }

  async addDump(name: string, data: any) {
    if (!this.isBrowser(data.browser)) {
      throw new Error(`Browserdate has wrong properties`);
    }

    if (!this.isScreen(data.screen)) {
      throw new Error("Screendata has wrong properties");
    }

    const dbName = uuidv4();
    await this.importedDB.add({
      name,
      createDate: new Date(),
      browser: data.browser,
      screen: data.screen,
      dbName,
    });

    return dbName;
  }

  private isScreen(data: any): data is TDbScreen {
    return (
      data != null &&
      data.constructor.name === "Object" &&
      typeof data.width === "number" &&
      typeof data.height === "number"
    );
  }

  private isBrowser(data: any): data is TDbBrowser {
    return (
      data != null &&
      data.constructor.name === "Object" &&
      typeof data.name === "string" &&
      typeof data.version === "string" &&
      typeof data.versionNumber === "number" &&
      typeof data.mobile === "boolean" &&
      typeof data.os === "string"
    );
  }

  getAll() {
    return this.importedDB.toArray();
  }
}

export const appDb = new AppDb();
