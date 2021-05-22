const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();

const indexRouter = require("./router/indexRouter.js");
const gameRouter = require("./router/gameRouter.js");

// practice writing 'views' w/ a view engine
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

//practice writing static file route to serve static files
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/game", gameRouter);

app.listen("3000", function (req, res) {
  console.log(`Server is running on port: ${3000}!!!`);
});
