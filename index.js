const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

const config = {
  token:'hanbao',
  appID:'wx3fd1ed9a525a15b3',
  appsecret:'a1a20a429d7a24e3670ce88c7c47068e'
}

app.use((req,res)=>{
  console.log(req.query);
  
  const {signature,echostr,timestamp,nonce} = req.query;
  const {token} = config;

  const arr = [timestamp,nonce,token];
  const arrSort = arr.sort();
  console.log(arrSort)
})

// 首页
// app.get("/", async (req, res) => {
//   // res.sendFile(path.join(__dirname, "index.html"));
//   res.send({
//         code: 0,
//         data: 'aaaa',
//       });
//   console.log(123456)
// });

// // 更新计数
// app.post("/api/count", async (req, res) => {
//   const { action } = req.body;
//   if (action === "inc") {
//     await Counter.create();
//   } else if (action === "clear") {
//     await Counter.destroy({
//       truncate: true,
//     });
//   }
//   res.send({
//     code: 0,
//     data: await Counter.count(),
//   });
// });

// // 获取计数
// app.get("/api/count", async (req, res) => {
//   const result = await Counter.count();
//   res.send({
//     code: 0,
//     data: result,
//   });
// });

// // 小程序调用，获取微信 Open ID
// app.get("/api/wx_openid", async (req, res) => {
//   if (req.headers["x-wx-source"]) {
//     res.send(req.headers["x-wx-openid"]);
//   }
// });

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
