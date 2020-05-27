import app from "./app";

import * as uploadController from "./controllers/upload";

app.get("/upload", uploadController.index);
app.post("/upload", uploadController.handle);

app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});
