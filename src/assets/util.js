
// 时间戳转换yy-MM-dd hh:mm:ss 格式
export function Format(str,fmt) {
  const date = new Date(+str);
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")); }
  for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }
  return fmt;
}
// 递归查询树结构
export function buildTree(data, parentId) {
  var itemArr = [];
  for (var i = 0; i < data.length; i++) {
    var node = data[i];
    if (node.pid == parentId) {
      var newNode = {};
      newNode.id = node.id;
      newNode.storeCode = node.storeCode;
      newNode.classCode = node.classCode;
      newNode.title = node.className;
      newNode.className = node.className;
      newNode.pid = node.pid;
      newNode.pids = node.pids;
      newNode.level = node.level;
      newNode.hasChildNode = node.hasChildNode;
      newNode.children = buildTree(data, node.id);
      itemArr.push(newNode);
    }
  }
  return itemArr;
}
