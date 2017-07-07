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
  stringNum:stringNum
}
