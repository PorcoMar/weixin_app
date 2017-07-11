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
module.exports = {
  formatTime: formatTime,
  formatTimestamp: formatTimestamp,
  secondTimestamp: secondTimestamp,
  stringNum:stringNum,
  toMoney: toMoney,
  thirdTimestamp: thirdTimestamp
}
