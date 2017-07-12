function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时间戳转换
function formatTimestamp(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = date.getDate()
  return Y + M + D;
}
//年月日时分秒
function secondTimestamp(timestamp){
  var date = new Date(timestamp);
  //console.log(date)
  var Year = date.getFullYear();
  var Month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var day = date.getDate();
  var Hour = date.getHours();
  var Min = date.getMinutes();
  var seconds = date.getSeconds();
  return Year + "-" + Month + "-" + day + " " + Hour + ":" + Min + ":" +seconds
}
//获取接下来的一周时间
function nextWeek(date){
    // var date = new Date();
    var week = [];
    var showDate = (date.getMonth() + 1) + '/' + date.getDate();
    console.log(showDate)
    for (var i = 1; i <= 7; i++) {//后7天
        var obj = {};
        date.setDate(date.getDate() + 1);
        var mon = (date.getMonth() + 1);
        var day =  date.getDate();
        showDate =  (mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        var weekDay =  getDayName(date.getDay());
        obj.date = showDate;
        obj.weekDay = weekDay;
        obj.year = date.getFullYear();
        // console.log(showDate);
        week.push(obj);
    }
    week[0].weekDay = "明天";
    return week;
}
function getDayName(day)
{
    var day=parseInt(day);
    if(isNaN(day) || day<0 || day>6)
        return false;
    var weekday=["周日","周一","周二","周三","周四","周五","周六"];
    return weekday[day];
}
//年月日
function thirdTimestamp(timestamp) {
  var date = new Date(timestamp);
  //console.log(date)
  var Year = date.getFullYear();
  var Month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var day = date.getDate();
  return Year + "." + Month + "." + day
}
function stringNum(num){
  if (typeof num=="number"){
    let str = num.toString();
    return str.substr(0, 3) + "****" + str.substr(8, 10);
  }else{
    return num.substr(0, 3) + "****" + num.substr(8, 10);
  }
 
}
//转换钱币格式以及小数点保留两位
function toMoney(a){
  let aa = parseFloat(a).toLocaleString()
  if(aa.indexOf(".")>0){
    let splt = aa.split(".")[1];
    let len = splt.length;
    if(len==1){
      return aa+"0"
    }else if(len>1){
      return aa.split(".")+"."+splt.substr(0,2)
    }
  }else{
    return aa
  }
}
// 图片地址
function imgUrl(a){
  return "http://appimg.yizhenjia.com"+a
}
module.exports = {
  formatTime: formatTime,
  formatTimestamp: formatTimestamp,
  secondTimestamp: secondTimestamp,
  nextWeek:nextWeek,
  stringNum:stringNum,
  toMoney: toMoney,
  thirdTimestamp: thirdTimestamp,
  imgUrl:imgUrl
}
