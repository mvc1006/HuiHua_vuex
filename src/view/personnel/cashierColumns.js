export default [
  {
    title: "序号",
    type: "index",
    width: 60,
    minWidth: 60,
    align: "center",
    className: "td-index"
  },{
    title: "编号",
    key: "cashierCode",
    align: "center",
    minWidth: 100
  },
  {
    title: "姓名",
    key: "cashierName",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许变价",
    key: 'changePrice',
    slot: "changePrice",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许赠送",
    key: 'give',
    slot: "give",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许使用会员卡",
    key: "memberCard",
    slot: "memberCard",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许补票打印",
    key: "repeatReport",
    slot: "repeatReport",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许读取报表",
    key: "report",
    slot: "report",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许退货",
    key: "retreat",
    slot: "retreat",
    align: "center",
    minWidth: 150
  },
  {
    title: "是否允许签单结账",
    key: "signing",
    slot: "signing",
    align: "center",
    minWidth: 150
  },
  {
    title: "允许最低折扣",
    key: "minDiscount",
    align: "center",
    minWidth: 120
  },
  {
    title: "最大优惠金额",
    key: "maxDiscountyh",
    align: "center",
    minWidth: 120
  },
  {
    title: "操作",
    slot: "actions",
    align: "center",
    width: 240,
    minWidth: 240,
    className: "td-index",
    fixed: 'right'
  }
];
