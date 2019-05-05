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
    title: "颜色",
    slot: "colorCode",
    align: "center",
    minWidth: 140
  },
  {
    title: "尺码",
    slot: "sizeCode",
    align: "center",
    minWidth: 140
  },
  {
    title: "调出库房",
    slot: "outDepotCode",
    align: "center",
    minWidth: 140
  },
  {
    title: "调拨数量",
    slot: "stockAllocationNum",
    align: "center",
    minWidth: 100
  },
  {
    title: "调入库房",
    slot: "inDepotCode",
    align: "center",
    minWidth: 140
  }, {
    title: "明细备注 ",
    slot: "detailRemark",
    align: "center",
    minWidth: 150
  }, {
    title: "操作",
    slot: "detailaction",
    align: "center",
    width: 140,
    minWidth: 140,
    className: "td-index"
  }

];
