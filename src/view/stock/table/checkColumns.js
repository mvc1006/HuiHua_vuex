export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "盘点编号",
    key: "checkNo",
    align: "center",
    minWidth: 160,
    width: 160,
    className: "td-index"
  }, {
    title: "盘点人",
    key: "checkPerson",
    align: "center",
    minWidth: 100
  },{
    title: "盘点时间",
    key: "checkTime",
    align: "center",
    minWidth: 100
  },{
    title: "记录人",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  },{
    title: "状态",
    key: "checkStatus",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.checkStatus == 2 ? "已处理" : "未处理")
      ]);
    }

  },{
    title: "操作",
    slot: "actions",
    align: "center",
    width: 240,
    minWidth: 240,
    className: "td-index"
  }

];
