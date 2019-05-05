export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "调拨编号",
    key: "allocationNo",
    align: "center",
    minWidth: 160,
    width: 160,
    className: "td-index"
  }, {
    title: "调拨人",
    key: "allocationPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "调拨时间",
    key: "allocationTime",
    align: "center",
    minWidth: 100
  }, {
    title: "记录人",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "状态",
    key: "allocationStatus",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.allocationStatus == 2 ? "已处理" : "未处理")
      ]);
    }

  }, {
    title: "操作",
    slot: "actions",
    align: "center",
    width: 240,
    minWidth: 240,
    className: "td-index"
  }

];
