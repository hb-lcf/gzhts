const xml2js = require("xml2js");

module.exports = {
  //把xml转换json
  toJson: (xml) => {
    return new Promise((resolve, reject) => {
      const xmlParser = new xml2js.Parser({
        explicitArray: false, //默认把子节点的值转为数组，所以要设置false
        ignoreAttrs: true, //忽略xml属性，仅创建文本
      });
      xmlParser.parseString(xml, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },
  //把json转换成xml
  toXml: (strObj) => {
    const builder = new xml2js.Builder();

    return builder.buildObject(strObj);
  },
  //回复用户消息
  resText: (res, obj) => {
    const resMsg = {
      xml: {
        ToUserName: obj.FromUserName,
        FromUserName: obj.ToUserName,
        CreateTime: new Date().getTime(),
        MsgType: "text",
        Content: "已经收到您的消息，您发送的消息时：" + obj.Content,
      },
    };
    const resMsgXml = toXml(resMsg);
    console.log("回复消息：", resMsgXml);
    res.send(resMsgXml);
  },
  //回应菜单点击事件
  resEvent: (res, obj) => {
    const resMsg = null;
    if (obj.EventKey === "V1001") {
      resMsg = {
        xml: {
          ToUserName: obj.FromUserName,
          FromUserName: obj.ToUserName,
          CreateTime: new Date().getTime(),
          MsgType: "text",
          Content: "收到的是第一个点击事件",
        },
      };
      const resMsgXml = toXml(resMsg);
      res.send(resMsgXml);
    } else if (obj.EventKey === "V1002") {
      resMsg = {
        xml: {
          ToUserName: obj.FromUserName,
          FromUserName: obj.ToUserName,
          CreateTime: new Date().getTime(),
          MsgType: "text",
          Content: "收到的是第二个点击事件",
        },
      };
      const resMsgXml = toXml(resMsg);
      res.send(resMsgXml);
    }
  },
  //随机颜色
  randomHexColor: () => {
    //随机生成十六进制颜色
    const hex = Math.floor(Math.random() * 16777216).toString(16);
    //生成ffffff以内16进制数
    while (hex.length < 6) {
      //while循环判断hex位数，少于6位前面加0凑够6位
      hex = "0" + hex;
    }
    return "#" + hex; //返回‘#'开头16进制颜色
  },

  //计算距离生日的天数
  getDaysToBirthday: (month = 01, day = 01) => {
    const nowTime = new Date();
    const thisYear = nowTime.getFullYear();
    //今年的生日
    const birthday = new Date(thisYear, month - 1, day);

    //今年生日已过，则计算距离明年生日的天数
    if (birthday < nowTime) {
      birthday.setFullYear(nowTime.getFullYear() + 1);
    }
    const timeDec = birthday - nowTime;
    const days = timeDec / (24 * 60 * 60 * 1000);
    return Math.ceil(days);
  },
};
