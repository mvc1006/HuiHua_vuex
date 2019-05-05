export const productColumns = [
  {
    title: "序号",
    type: "selection",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "商品编号",
    width: 160,
    key: "productCode",
    sortable: true
  },
  {
    title: "商品名称",
    width: 160,
    key: "productName",
    sortable: true
  },
  {
    title: "单位",
    width: 80,
    key: "productUnit",
    sortable: true
  },
  {
    title: "条形码",
    width: 160,
    key: "productBarcode",
    sortable: true
  },
  {
    title: "零售价",
    width: 80,
    key: "salePrice",
    sortable: true
  },
  {
    title: "批发价",
    width: 80,
    key: "wholesalePrice",
    sortable: true
  },
  {
    title: "会员价",
    width: 80,
    key: "memberPrice",
    sortable: true
  },
  {
    title: "成本价",
    width: 80,
    key: "costPrice",
    sortable: true
  },
  {
    title: "规格",
    width: 80,
    key: "specifications",
    sortable: true
  },
  {
    title: "品牌",
    width: 100,
    key: "brand",
    sortable: true
  }

];
export const productStockColumns = [
  {
    title: "序号",
    type: "selection",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "商品编号",
    width: 160,
    key: "productCode",
    sortable: true
  },
  {
    title: "商品名称",
    width: 160,
    key: "productName",
    sortable: true
  },
  {
    title: "所在仓库",
    width: 80,
    slot: "depotCode",
    sortable: true
  },
  {
    title: "库存成本价",
    width: 80,
    key: "stockPrice",
    sortable: true
  },
  {
    title: "库存数量",
    width: 80,
    key: "stockNum",
    sortable: true
  },
  {
    title: "颜色",
    width: 80,
    slot: "colorCode",
    sortable: true
  },
  {
    title: "尺码",
    width: 80,
    slot: "sizeCode",
    sortable: true
  }
];
