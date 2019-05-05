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
    slot: "depotCode"
  },
  {
    title: "颜色编号",
    slot: "colorCode",
    align: "center",
    minWidth: 140
  },
  {
    title: "尺码编号",
    slot: "sizeCode",
    align: "center",
    minWidth: 140
  },
  {
    title: "领用数量",
    slot: "drawNum",
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
