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

function secondTimestamp(timestamp){
  var date = new Date(timestamp);
  console.log(date)
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
function stringNum(num){
  if (typeof num=="number"){
    let str = num.toString();
    return str.substr(0, 3) + "****" + str.substr(8, 10);
  }else{
    return num.substr(0, 3) + "****" + num.substr(8, 10);
  }
 
}
module.exports = {
  formatTime: formatTime,
  formatTimestamp: formatTimestamp,
  secondTimestamp: secondTimestamp,
  nextWeek:nextWeek,
  stringNum:stringNum
}
