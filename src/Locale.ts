import { CSVContent } from "./interface";

export default class Locale {
  code: string;
  data: any;

  constructor(code: string) {
    this.code = code;
    this.data = {};
  }

  forge(data: CSVContent, idx: number) {
    data.forEach((item) => {
      this.data[item[0]] = item[idx];
    });

    return this;
  }

  toJSON(): string {
    return JSON.stringify(this.data);
  }
}
