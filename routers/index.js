const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../utils/config");
const getAccessToken = require("../utils/getAccessToken");
const apis = require("../utils/api");
const common = require("../utils/common");

//获取全部用户信息
router.get("/", (req, res) => {
  (async () => {
    try {
      const accessToken = await getAccessToken();
      const result = await axios({
        method: "GET",
        url: "https://api.weixin.qq.com/cgi-bin/user/get",
        params: {
          access_token: accessToken,
        },
      });
      if (!result.data.errcode) {
        res.json({
          state: "200",
          mag: "获取用户信息成功",
          data: result.data,
        });
      } else {
        res.json({
          state: "0",
          mag: "获取信息失败",
          err: result.data,
        });
      }
    } catch (e) {
      res.json({
        state: "0",
        msg: "获取用户信息失败",
        err: e,
      });
    }
  })();
});
//推送模板
router.get("/template", (req, res) => {
  (async () => {
    try {
      const accessToken = await getAccessToken();
      const weather = await apis.getWeather();
      const lzmy = await apis.getLzmy();
      const result = await axios({
        method: "POST",
        url:
          "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" +
          accessToken,
        data: {
          touser: config.users.openid,
          template_id: config.template_id,
          data: {
            date: {
              value: "XX",
              color: common.randomHexColor(),
            },
            city: {
              value: weather.area,
              color: common.randomHexColor(),
            },
            weather: {
              value: weather.weather,
              color: common.randomHexColor(),
            },
            min_temperature: {
              value: weather.lowest,
              color: common.randomHexColor(),
            },
            max_temperature: {
              value: weather.highest,
              color: common.randomHexColor(),
            },
            pop: {
              value: weather.pop,
              color: common.randomHexColor(),
            },
            tips: {
              value: weather.tips,
              color: common.randomHexColor(),
            },
            mineBirthDays: {
              value: common.getDaysToBirthday(
                config.users.month,
                config.users.day
              ),
              color: common.randomHexColor(),
            },
            lizhi: {
              value: lzmy.saying + " ——— " + lzmy.source,
              color: common.randomHexColor(),
            },
          },
        },
      });
      console.log("查看模板消息返回结果", result.data);
      res.send("推送成功");
    } catch (err) {
      console.log(err);
    }
  })();
});

//抛出这个api模块
module.exports = router;
