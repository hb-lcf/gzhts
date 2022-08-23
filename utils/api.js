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
          city: config.users.city,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            // console.log(res.data.newslist[1]);
            resolve(res.data.newslist[1]); //今天的天气，0是昨天 2是明天
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
            resolve(res.data.newslist[0]);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(error);
        });
    });
  },
  // 励志古言
  getLzmy: () => {
    return new Promise((resolve, reject) => {
      axios({
        methods: "post",
        url: "http://api.tianapi.com/lzmy/index",
        params: {
          key: config.tianXin.key,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            resolve(res.data.newslist[0]);
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
