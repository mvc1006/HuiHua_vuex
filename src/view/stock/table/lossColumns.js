export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "报损编号",
    key: "scrapNo",
    align: "center",
    minWidth: 160,
    width: 160,
    className: "td-index"
  }, {
    title: "报损人",
    key: "scrapPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "报损时间",
    key: "scrapTime",
    align: "center",
    minWidth: 100
  }, {
    title: "记录人",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "状态",
    key: "scrapStatus",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.scrapStatus == 2 ? "已处理" : "未处理")
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
