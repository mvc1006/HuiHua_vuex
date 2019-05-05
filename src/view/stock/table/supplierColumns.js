export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  }, {
    title: "供应商名称",
    key: "supplierName",
    align: "center",
    minWidth: 100
  }, {
    title: "电话",
    key: "telNo",
    align: "center",
    minWidth: 100
  }, {
    title: "联系人姓名",
    key: "contactName",
    align: "center",
    minWidth: 100
  }, {
    title: "简称",
    key: "shortName",
    align: "center",
    minWidth: 100
  },
  {
    title: "地址",
    key: "address",
    align: "center",
    minWidth: 100
  },{
    title: "备注",
    key: "remark",
    align: "center",
    minWidth: 100
  },{
    title: "状态",
    key: "status",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.status == 1 ? "正常" : "禁用")
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
