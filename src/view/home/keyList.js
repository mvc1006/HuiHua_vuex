export const storeInfo = {
  "address": "1111111111111111111",
  "agent": "0000",
  "agentBalance": 0,
  "area": "静海区",
  "bussinessType": 5,
  "city": "天津市",
  "createTime": 1540279552000,
  "delFlag": 0,
  "id": 87672,
  "latitude": 39.900536,
  "linkEmail": "2858886751@qq.com",
  "linkMobile": "13161552159",
  "linkName": "大老黑",
  "loginPassword": "e10adc3949ba59abbe56e057f20f883e",
  "longitude": 116.39785,
  "mobileOrder": 1,
  "openFlag": 1,
  "province": "天津市",
  "status": 1,
  "storeCode": "10003019",
  "storeName": "黑作坊连锁",
  "token": "",
  "wxModel": 0,
  "businessTime": "09:00-23:00"
};

export function getBussinessType(key) {
  let val = '其他';
  if (key === 1) {
    val = "中餐"
  } else if (key === 2) {
    val = "快餐"
  } else if (key === 3) {
    val = "西餐"
  } else if (key === 4) {
    val = "火锅"
  } else if (key === 5) {
    val = "烧烤"
  } else if (key === 6) {
    val = "甜品店"
  } else if (key === 7) {
    val = "烤鱼"
  } else if (key === 8) {
    val = "咖啡"
  } else if (key === 9) {
    val = "自助"
  } else {
    val = "其他"
  }
  return val;
}
