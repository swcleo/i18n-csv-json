import papa from "papaparse";

import { CSVContent } from './interface'

export default class CSVReader {
  public static from(stream: Buffer): Promise<CSVContent> {
    return new Promise((resolve) => {
        papa.parse(stream.toString(), {
          complete: (results) => {
            resolve(results.data as CSVContent);
          },
        });
      });
  }
}
