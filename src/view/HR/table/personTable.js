export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "姓名",
    key: "scrapNo",
    align: "center",
    minWidth: 160,
    width: 160,
    className: "td-index"
  }, {
    title: "职级",
    key: "scrapPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "手机号",
    key: "scrapTime",
    align: "center",
    minWidth: 100
  }, {
    title: "部门",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "部用工类型",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "用工状态",
    key: "scrapStatus",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.scrapStatus == 2 ? "已处理" : "未处理")
      ]);
    }

  }, {
    title: "健康证到期时间",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "合同到期时间",
    key: "recordPerson",
    align: "center",
    minWidth: 100
  }, {
    title: "操作",
    slot: "actions",
    align: "center",
    width: 240,
    minWidth: 240,
    className: "td-index"
  }

];
