const express = require("express");
const app = express();
//引入
const access = require("./routers/access");
const index = require("./routers/index");

app.all("*", function (req, res, next) {
  //设置跨域访问
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/access", access);
app.use("/index", index);

//测试
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3300;
app.listen(port, () => {
  console.log(`运行成功 port ${port}`);
});
