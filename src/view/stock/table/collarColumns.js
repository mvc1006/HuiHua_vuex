export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "领用编号",
    key: "drawNo",
    align: "center",
    minWidth: 100
  }, {
    title: "领用人",
    key: "drawPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "领用时间",
    key: "drawTime",
    align: "center",
    minWidth: 100
  }, {
    title: "记录人",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "状态",
    key: "drawStatus",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.drawStatus == 2 ? "已处理" : "未处理")
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
