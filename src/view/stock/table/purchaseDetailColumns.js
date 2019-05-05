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
    minWidth: 100,
    className: "td-index"
  }, {
    title: "商品名称",
    key: "productName",
    align: "center",
    minWidth: 100,
    className: "td-index"
  },
  {
    title: "分类名称",
    slot: "typeName",
    align: "center",
    minWidth: 140
  },
  {
    title: "颜色名称",
    slot: "colorCode",
    align: "center",
    minWidth: 120
  },
  {
    title: "尺码名称",
    slot: "sizeCode",
    align: "center",
    minWidth: 120
  },
  {
    title: "商品单位",
    key: "unitName",
    align: "center",
    minWidth: 100,
    className: "td-index"
  },
  {
    title: "采购数量",
    slot: "purchaseNum",
    align: "center",
    minWidth: 100
  },
  {
    title: "采购单价",
    slot: "purchasePrice",
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
    key: "purchaseMoney",
    align: "center",
    minWidth: 100
  },
  {
    title: "优惠金额",
    slot: "preferentialMoney",
    align: "center",
    minWidth: 100
  },
  {
    title: "明细备注 ",
    slot: "detailRemark",
    align: "center",
    minWidth: 150
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
