
//apiを通して、JSON情報を取得
const ACCESS_TOKEN = "2/UAzLVrzTwPBGktim8YHRgOnt4iP5DantXRx86H6Y3bL9bFslMC3ecL5kKqLkM3HPMuglIdWXBxKpFZtbIrr397r676+KcpgCqUfsFptPbavkboJJTK3GYpu2S7KY3rDZqkkurUNiIg1e6O4KhgOAdB04t89/1O/w1cDnyilFU=";
function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }
  else {
    let json = JSON.parse(e.postData.contents);
    reply(json)
  }
}

function reply(data) {
 
  let reply_token = data.events[0].replyToken;
  const user_lon = data.events[0].message.longitude
  const user_lat = data.events[0].message.latitude

   let URL = UrlFetchApp.fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${user_lat}&lon=${user_lon}&lang=ja&appid=70231f04896404eaf5c37b7bf3bb63ee`);
   //let use_json = JSON.parse(URL.getContentText());//取得できた情報をparseすることで
  let options = JSON.stringify({
    "replyToken": reply_token,
    'messages': [{
      'type': 'text',
      "text": `${JSON.parse(URL).name}の現在の気温は${Math.round((JSON.parse(URL).main.temp-273)*100)/100}度です`+"\n"+
      `最高気温は${Math.round((JSON.parse(URL).main.temp_max-273)*100)/100}度です`+"\n"+
      `最低気温は${Math.round((JSON.parse(URL).main.temp_min-273)*100)/100}度です`+"\n"+
      `湿度は${JSON.parse(URL).main.humidity}%です`+"\n"+
      `風速は${JSON.parse(URL).wind.speed}m/sです`+"\n"+
      `気圧は${JSON.parse(URL).main.pressure}hPaです`
    }],
  })
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + ACCESS_TOKEN,
  }
  let option = {
    "method": "post",
    "headers": header,
    "payload": options,
  }
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", option)
}


