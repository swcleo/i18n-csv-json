import path from "path";
import fs from "fs";
import { Request, Response } from "express";

import Locale from "../Locale";
import CSVReader from "../CSVReader";

const gap = 2;

export const index = (req: Request, res: Response) => {
  res.render("upload");
};

export const handle = (req: Request, res: Response) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
      return;
    }

    const file = req.files.csv_file;

    CSVReader.from(file.data).then((data) => {
      const hash = Date.now().toString();

      const filePath = path.resolve(base_path("../dist"), hash);

      fs.mkdirSync(filePath);

      const files = (data.shift() || [])
        .slice(gap)
        .map((code, index) => new Locale(code).forge(data, index + gap))
        .map((locale) => {
          const output = path.join(filePath, locale.code + ".json");
          fs.writeFileSync(output, locale.toJSON());
          return locale;
        })
        .reduce<any[]>((arr, locale) => {
          arr.push({
            url: `/files/${hash}/${locale.code}.json`,
            name: `${locale.code}.json`
          });
          return arr
        }, [])

      res.send({
        status: true,
        message: 'OK',
        files
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
