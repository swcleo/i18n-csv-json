import path from "path";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

declare global {
  function base_path(routes: string): string;
}

global.base_path = (routes: string) => {
  return routes.length === 0 ? __dirname : path.resolve(__dirname, routes)
}

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/assets", express.static(base_path('assets')));
app.use("/files", express.static(base_path('../dist')));

app.get("/", (req, res) => {
  res.render("index", { title: "i18n-csv-json", message: "Hello i18n!" });
});

export default app;
