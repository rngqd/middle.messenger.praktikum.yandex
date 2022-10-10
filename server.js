const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.static("./dist"));
app.get(/(.*?)/, (req, res) => {
  res.sendFile(__dirname + "dist/index.html");
});

app.listen(PORT, function () {
  console.log(`server running at ${PORT} port`);
});
