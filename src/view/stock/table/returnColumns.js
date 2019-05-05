export default [{
  title: "序号",
  type: "index",
  width: 60,
  minWidth: 60,
  align: "center",
  className: "td-index"
}, {
  title: "退货编号",
  key: "returnNo",
  align: "center",
  minWidth: 160,
  width: 160,
  className: "td-index"
}, {
  title: "退货人",
  key: "returnPerson",
  align: "center",
  minWidth: 100
}, {
  title: "退货时间",
  key: "returnTime",
  align: "center",
  minWidth: 140,
  width: 140,
  className: "td-index"
}, {
  title: "记录人",
  key: "recordPerson",
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
  title: "退货总金额",
  key: "moneyAll",
  align: "center",
  minWidth: 100
}, {
  title: "实付总金额",
  key: "realMoneyAll",
  align: "center",
  minWidth: 100
}, {
  title: "供应商",
  key: "supplierName",
  align: "center",
  minWidth: 100
}, {
  title: "状态",
  key: "returnStatus",
  align: "center",
  minWidth: 100,
  render: (h, params) => {
    return h("div", [
      h("span", params.row.returnStatus == 2 ? "已出库" : "未出库")
    ]);
  }

}, {
  title: "备注",
  key: "remark",
  align: "center",
  minWidth: 100
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
