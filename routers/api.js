const express = require("express");
const router = express.Router();
const config = require('../config')//引入config.js文件
const crypto = require('crypto');//引入加密模块

//加密函数
function sha1(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
}
//接入微信验证
router.get("/access", (req, res) => {
  console.log(req.query)

  const token = config.token
  const {} = req.query
  //）将三个参数进行字典序排序,三个参数字符串拼接成一个字符串
  const arrStr = [token,timestamp,nonce].sort().join('');
  //获得加密后的字符串与 signature 对比
  if (sha1(arrStr)===req.signature) {
    //返回echostr
    res.send(req.query.echostr)
  }else{
    req.send('连接失败');
  }

})
//抛出这个api模块
module.exports = router;