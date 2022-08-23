const express = require("express");
const router = express.Router();
const config = require("../utils/config"); //引入config.js文件
const crypto = require("crypto"); //引入加密模块
const common = require("../utils/common");

//加密函数
const sha1 = (str) => {
  return crypto.createHash("sha1").update(str).digest("hex");
};
//接入微信验证
router.get("/", (req, res) => {
  console.log(req.query);
  const token = config.wx.token;
  const { signature, timestamp, nonce, echostr } = req.query;
  //）将三个参数进行字典序排序,三个参数字符串拼接成一个字符串
  const arrStr = [token, timestamp, nonce].sort().join("");
  //获得加密后的字符串与 signature 对比
  if (sha1(arrStr) === signature) {
    //返回echostr
    res.send(echostr);
  } else {
    req.send("连接失败");
  }
});
//接收微信服务器转发的消息（用户发送的消息）
router.post("/", (req, res) => {
  console.log("接收到用户消息的请求");
  let buff = "";
  req.on("data", (data) => {
    buff = buff + data;
  });
  req.on("end", () => {
    //监听数据传输结束
    (async () => {
      try {
        const result = await common.toJson(buff);
        console.log("接收到用户发送的消息");
        //判断消息类型
        switch (result.xml.MsgType) {
          case "text":
            resText(res, result.xml);
            break;
          case "event":
            resEvent(res, result.xml);
            break;
        }
      } catch (e) {
        console.log("解析用户消息失败", e);
      }
    })();
  });
});

//抛出这个模块
module.exports = router;
