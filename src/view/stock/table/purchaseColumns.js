export default [{
  title: "序号",
  type: "index",
  width: 60,
  minWidth: 60,
  align: "center",
  className: "td-index"
}, {
  title: "采购编号",
  key: "purchaseNo",
  align: "center",
  minWidth: 150,
  className: "td-index"
}, {
  title: "采购人",
  key: "purchasePerson",
  align: "center",
  minWidth: 100
}, {
  title: "采购时间",
  key: "purchaseTime",
  align: "center",
  minWidth: 120,
  className: "td-index"
}, {
  title: "记录人",
  key: "recordPerson",
  align: "center",
  minWidth: 100
}, {
  title: "订单总金额",
  key: "moneyAll",
  align: "center",
  minWidth: 100
}, {
  title: "实付总金额",
  key: "realMoneyAll",
  align: "center",
  minWidth: 100
}, {
  title: "支付方式",
  key: "payModel",
  align: "center",
  minWidth: 100,
  render: (h, params) => {
    return h("div", [
      h("span", getPayModel(params.row.payModel))
    ]);
  }
}, {
  title: "供应商",
  key: "supplierName",
  align: "center",
  minWidth: 100
}, {
  title: "状态",
  key: "purchaseStatus",
  align: "center",
  minWidth: 100,
  render: (h, params) => {
    return h("div", [
      h("span", params.row.purchaseStatus == 2 ? "已入库" : "未入库")
    ]);
  }

}, {
  title: "操作",
  slot: "actions",
  align: "center",
  width: 240,
  minWidth: 240,
  className: "td-index"
}];

function getPayModel(index) {
  let names = ['现金', '支付宝', '微信', '欠款', '免单', '优惠券', '会员余额支付', '会员积分抵现', '会员优惠券支付'];
  return names[+index - 1]
};
