const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn");

app.use(express.json());

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", list);


app.listen(1000, () => {
  console.log("Server Started");
});