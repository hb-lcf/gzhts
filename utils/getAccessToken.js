const fs = require("fs"); //引入文件操作模块
const axios = require("axios");
const config = require("./config");
const accessTokenJson = require("../datas/access_token.json");

//获取access_token
const getAccessToken = () => {
  const currentTime = new Date().getTime(); //获取当前时间
  const params = {
    grant_type: "client_credential",
    appid: config.wx.appId,
    secret: config.wx.appsecret,
  };
  return new Promise((resolve, reject) => {
    //判断是否失效，
    if (
      accessTokenJson.access_token === "" ||
      accessTokenJson.expires_time < currentTime
    ) {
      axios({
        method: "GET",
        url: " https://api.weixin.qq.com/cgi-bin/token",
        params: params, //传参
      })
        .then((res) => {
          console.log(12313, res.data);
          if (!res.data.errcode) {
            accessTokenJson.access_token = res.data.access_token; //更新
            accessTokenJson.expires_time =
              new Date().getTime() +
              (parseInt(res.data.expires_in) - 500) +
              1000;

            //重新保存到access_token.json
            fs.writeFileSync(
              "./../access_token.json",
              JSON.stringify(accessTokenJson)
            );
            resolve(res.data.access_token);
          }
          eles;
          {
          }
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      resolve(accessTokenJson.access_token);
    }
  });
};
//暴露函数
module.exports = getAccessToken;
