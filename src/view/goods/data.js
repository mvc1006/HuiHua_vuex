export const treeList = {
  "auth": 0,
  "code": 0,
  "data": [
    /*  {
       title: "家电类",
       children: [
         {
           title: "电视",
           children: [
             {
               title: "小米电视",
               children: [
                 {
                   title: "54寸",
                   children: [
                     {
                       title: "曲面屏",
                       children: [
                         {
                           title: "360度",
                           children: [
                             {
                               title: "触摸式",
                               children: [
                                 {
                                   title: "全屏触摸",
                                   children: [
                                     {
                                       title: "进口的",
                                       children: [
                                         {
                                           title: "德国",
                                           children: [
                                             {
                                               title: "德国1212121"
                                             }
                                           ]
                                         }
                                       ]
                                     },
                                     {
                                       title: "国产的",
                                       children: [
                                         {
                                           title: "1212"
                                         }
                                       ]
                                     }
                                   ]
                                 }
                               ]
                             },
                             {
                               title: "非触摸式"
                             }
                           ]
                         }
                       ]
                     },
                     {
                       title: "液晶屏",
                       children: [
                         {
                           title: ""
                         }
                       ]
                     },
                     {
                       title: "平面屏",
                       children: [
                         {
                           title: "观其眼睛有无异常"
                         }
                       ]
                     }
                   ]
                 },
                 {
                   title: "53寸"
                 },
                 {
                   title: "42寸"
                 },
                 {
                   title: "40寸"
                 }
               ]
             },
             {
               title: "乐视电视",
               classCode: "00678"
             }
           ]
         },
         {
           title: "微波炉",
           children: [{ title: "查看药房库存" }, { title: "进行开药" }]
         }
       ]
     },
     {
       title: '办公用品',
       children: [
         {
           title: '打印机'

         }
       ]
     } */
    {
      "id": 21,
      "storeCode": "30000001",
      "classCode": "001",
      "className": "饮料",
      "pid": null,
      "pids": null,
      "level": 1,
      "hasChildNode": true,
      "parentClassName": null
    },
    {
      "id": 23,
      "storeCode": "30000001",
      "classCode": "002",
      "className": "碳酸饮料",
      "pid": 21,
      "pids": "21",
      "level": 2,
      "hasChildNode": true,
      "parentClassName": "饮料"
    },
    {
      "id": 24,
      "storeCode": "30000001",
      "classCode": "003",
      "className": "果汁",
      "pid": 21,
      "pids": "21",
      "level": 2,
      "hasChildNode": false,
      "parentClassName": "饮料"
    },
    {
      "id": 25,
      "storeCode": "30000001",
      "classCode": "004",
      "className": "蔬菜汁类",
      "pid": 21,
      "pids": "21",
      "level": 2,
      "hasChildNode": false,
      "parentClassName": "饮料"
    },
    {
      "id": 26,
      "storeCode": "30000001",
      "classCode": "005",
      "className": "蛋白饮料类",
      "pid": 21,
      "pids": "21",
      "level": 2,
      "hasChildNode": false,
      "parentClassName": "饮料"
    },
    {
      "id": 27,
      "storeCode": "30000001",
      "classCode": "006",
      "className": "饮用水类",
      "pid": 21,
      "pids": "21",
      "level": 2,
      "hasChildNode": true,
      "parentClassName": "饮料"
    },
    {
      "id": 28,
      "storeCode": "30000001",
      "classCode": "007",
      "className": "可乐型",
      "pid": 23,
      "pids": "21,23",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "碳酸饮料"
    },
    {
      "id": 29,
      "storeCode": "30000001",
      "classCode": "008",
      "className": "果汁型",
      "pid": 23,
      "pids": "21,23",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "碳酸饮料"
    },
    {
      "id": 30,
      "storeCode": "30000001",
      "classCode": "009",
      "className": "果味型",
      "pid": 23,
      "pids": "21,23",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "碳酸饮料"
    },
    {
      "id": 31,
      "storeCode": "30000001",
      "classCode": "010",
      "className": "姜汁汽水",
      "pid": 23,
      "pids": "21,23",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "碳酸饮料"
    },
    {
      "id": 32,
      "storeCode": "30000001",
      "classCode": "011",
      "className": "饮用天然矿泉水",
      "pid": 27,
      "pids": "21,27",
      "level": 3,
      "hasChildNode": true,
      "parentClassName": "饮用水类"
    },
    {
      "id": 33,
      "storeCode": "30000001",
      "classCode": "012",
      "className": "饮用天然泉水",
      "pid": 27,
      "pids": "21,27",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "饮用水类"
    },
    {
      "id": 34,
      "storeCode": "30000001",
      "classCode": "013",
      "className": "饮用矿物质水",
      "pid": 27,
      "pids": "21,27",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "饮用水类"
    },
    {
      "id": 35,
      "storeCode": "30000001",
      "classCode": "014",
      "className": "娃哈哈",
      "pid": 32,
      "pids": "21,27,32",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "饮用天然矿泉水"
    },
    {
      "id": 36,
      "storeCode": "30000001",
      "classCode": "020",
      "className": "百岁山",
      "pid": 32,
      "pids": "21,27,32",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "饮用天然矿泉水"
    },
    {
      "id": 38,
      "storeCode": "30000001",
      "classCode": "015",
      "className": "怡宝",
      "pid": 32,
      "pids": "21,27,32",
      "level": 3,
      "hasChildNode": false,
      "parentClassName": "饮用天然矿泉水"
    },
    {
      "id": 39,
      "storeCode": "30000001",
      "classCode": "016",
      "className": "酒水",
      "pid": null,
      "pids": null,
      "level": 1,
      "hasChildNode": true,
      "parentClassName": null
    },
    {
      "id": 40,
      "storeCode": "30000001",
      "classCode": "017",
      "className": "蒸馏酒",
      "pid": 39,
      "pids": "39",
      "level": 2,
      "hasChildNode": false,
      "parentClassName": "酒水"
    },
    {
      "id": 41,
      "storeCode": "30000001",
      "classCode": "018",
      "className": "发酵酒",
      "pid": 39,
      "pids": "39",
      "level": 2,
      "hasChildNode": false,
      "parentClassName": "酒水"
    },
    {
      "id": 42,
      "storeCode": "30000001",
      "classCode": "019",
      "className": "配制酒",
      "pid": 39,
      "pids": "39",
      "level": 2,
      "hasChildNode": false,
      "parentClassName": "酒水"
    }
  ],
  "message": "查询成功",
  "result": true,
  "success": true
}

export const tableList = {
  "auth": 0,
  "code": 0,
  "data": [
    {
      storeCode: 1001,
      classCode: '001001',
      className: '饮料类'
    },
    {
      storeCode: 1001,
      classCode: '001002',
      className: '白酒类'
    },
    {
      storeCode: 1001,
      classCode: '001003',
      className: '红酒类'
    },
    {
      storeCode: 1001,
      classCode: '001004',
      className: '奶制品'
    }
  ],
  "message": "查询成功",
  "result": true,
  "success": true
}

export const tableList1 = {
  "auth": 0,
  "code": 0,
  "data": [
    {
      "id": 11,
      "storeCode": "30000001",
      "productCode": "000004",
      "productName": "怡宝桶装水",
      "productEnglishName": "wahaha",
      "productSimplicity": "string",
      "productUnit": "桶",
      "productBarcode": "21321321",
      "classCode": "015",
      "salePrice": 8,
      "wholesalePrice": 0,
      "memberPrice": 9,
      "costPrice": 10,
      "specifications": "string",
      "brand": "怡宝",
      "producingArea": "北京",
      "distribution": 0,
      "discountFlag": 0,
      "flag": 0,
      "remark": "string",
      "openWeigh": 0,
      "firstClassCode": null
    },
    {
      "id": 9,
      "storeCode": "30000001",
      "productCode": "000002",
      "productName": "娃哈哈瓶装水",
      "productEnglishName": "wahaha",
      "productSimplicity": "string",
      "productUnit": "桶",
      "productBarcode": "21321321",
      "classCode": "014",
      "salePrice": 8,
      "wholesalePrice": 0,
      "memberPrice": 9,
      "costPrice": 10,
      "specifications": "string",
      "brand": "娃哈哈",
      "producingArea": "北京",
      "distribution": 1,
      "discountFlag": 0,
      "flag": 0,
      "remark": "string",
      "openWeigh": 0,
      "firstClassCode": null
    },
    {
      "id": 7,
      "storeCode": "30000001",
      "productCode": "000001",
      "productName": "可口可乐",
      "productEnglishName": null,
      "productSimplicity": null,
      "productUnit": "瓶",
      "productBarcode": null,
      "classCode": "001",
      "salePrice": 2.5,
      "wholesalePrice": null,
      "memberPrice": null,
      "costPrice": null,
      "specifications": null,
      "brand": null,
      "producingArea": null,
      "distribution": 2,
      "discountFlag": 1,
      "flag": 0,
      "remark": null,
      "openWeigh": null,
      "firstClassCode": null
    }
  ],
  "message": "查询成功",
  "result": true,
  "success": true
}

export const treeAgentList = {
  "auth": 0,
  "code": 0,
  "data": [
    {
      title: "祥云",
      children: [
        {
          title: "祥云1"
        }
      ]
    },
    {
      title: "豆云",
      children: [
        {
          title: "豆云1"
        }
      ]
    },
    {
      title: "天云",
      children: [
        {
          title: "天云1"
        }
      ]
    }
  ],
  "message": "查询成功",
  "result": true,
  "success": true

}

export const treeBrandList = {
  "auth": 0,
  "code": 0,
  "data": [
    {
      title: "娃哈哈"

    },
    {
      title: "联合利华"

    },
    {
      title: "德国拜耳"

    }
  ],
  "message": "查询成功",
  "result": true,
  "success": true

}
