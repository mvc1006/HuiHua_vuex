export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "商品编码",
    key: "productCode",
    align: "center",
    minWidth: 100
  }, {
    title: "商品名称",
    key: "productName",
    align: "center",
    minWidth: 100
  },
  {
    title: "所在仓库",
    width: 80,
    slot: "depotCode",
    sortable: true
  },
  {
    title: "退货数量",
    key: "returnNum",
    slot: "returnNum",
    align: "center",
    minWidth: 100
  },
  {
    title: "退货单价",
    key: "returnPrice",
    slot: "returnPrice",
    align: "center",
    minWidth: 100
  },
  {
    title: "实付金额",
    key: "realMoney",
    align: "center",
    minWidth: 100
  },
  {
    title: "应付金额",
    key: "returnMoney",
    slot: "returnMoney",
    align: "center",
    minWidth: 100
  },
  {
    title: "优惠金额",
    key: "preferentialMoney",
    slot: "preferentialMoney",
    align: "center",
    minWidth: 100
  },
  {
    title: "明细备注 ",
    slot: "detailRemark",
    align: "center",
    minWidth: 100
  },
  {
    title: "操作",
    slot: "detailaction",
    align: "center",
    width: 140,
    minWidth: 140,
    className: "td-index"
  }

];
