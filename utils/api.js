const axios = require("axios");
const config = require("./config");
module.exports = {
  //获取天气
  getWeather: () => {
    return new Promise((resolve, reject) => {
      // let data;
      axios({
        methods: "post",
        url: "http://api.tianapi.com/tianqi/index",
        params: {
          key: config.tianXin.key,
          city: "福州市",
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            // console.log(res.data.newslist[1]);
            resolve(res.data.newslist[1]);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(error);
        });
    });
  },
  //健康小提示
  getHealthtip: () => {
    return new Promise((resolve, reject) => {
      axios({
        methods: "post",
        url: "http://api.tianapi.com/healthtip/index",
        params: {
          key: config.tianXin.key,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            resolve(res.data.newslist[1]);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(error);
        });
    });
  },
};
