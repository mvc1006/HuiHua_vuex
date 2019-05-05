<template>
  <div>
    <Card title="实收统计">
      <div class="operTime">
        <span>时间：</span>
        <DatePicker
          type="daterange"
          :options="optionTime"
          format="yyyy-MM-dd"
          @on-change="handleChange"
          :value="startTime"
          :editable="true"
          split-panels
          style="width: 300px"
        ></DatePicker>
        <Button type="primary" @click="query">查询</Button>
        <Button type="success" @click="orderExport">导出</Button>
      </div>
      <!-- <div class="tabsList">
        <Table
          class="table-all-width"
          :columns="columns1"
          :data="data1"
          :stripe="true"
          :border="true"
          :loading="Tableloading"
        ></Table>
      </div>-->
    </Card>
    <div data-v-808be648 class="tabsList">
      <div data-v-808be648 class="table-all-width ivu-table-wrapper">
        <div class="ivu-table ivu-table-default ivu-table-border ivu-table-stripe">
          <!---->
          <div class="ivu-table-header">
            <table cellspacing="0" cellpadding="0" border="0" style="width: 1193px;">
              <colgroup>
                <col width="298">
                <col width="298">
                <col width="298">
                <col width="298">
              </colgroup>
              <thead>
                <tr>
                  <th colspan="1" rowspan="2" class="ivu-table-column-center">
                    <div class="ivu-table-cell">
                      <span class>时间</span>
                    </div>
                  </th>
                  <th colspan="3" rowspan="1" class="ivu-table-column-center">
                    <div class="ivu-table-cell">
                      <span class>付款统计明细</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th colspan="1" rowspan="1" class="ivu-table-column-center">
                    <div class="ivu-table-cell">
                      <span class>支付方式</span>
                    </div>
                  </th>
                  <th colspan="1" rowspan="1" class="ivu-table-column-center">
                    <div class="ivu-table-cell">
                      <span class>支付金额</span>
                    </div>
                  </th>
                  <th colspan="1" rowspan="1" class="ivu-table-column-center">
                    <div class="ivu-table-cell">
                      <span class>支付笔数</span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="ivu-table-body" style>
            <table cellspacing="0" cellpadding="0" border="0">
              <tbody class="ivu-table-tbody">
                <template v-for="(item,index) in examTableData">
                  <tr class="ivu-table-row" :key="index">
                    <td
                      class="ivu-table-column-center"
                      :class="index%2==0?'':'newTd'"
                      :rowspan="item.count"
                    >
                      <div class="ivu-table-cell">
                        <span>{{item.date}}</span>
                      </div>
                    </td>
                    <td class="ivu-table-column-center">
                      <div class="ivu-table-cell">
                        <span>{{item.payModeName}}</span>
                      </div>
                    </td>
                    <td class="ivu-table-column-center">
                      <div class="ivu-table-cell">
                        <span>{{item.payMoney}}</span>
                      </div>
                    </td>
                    <td class="ivu-table-column-center">
                      <div class="ivu-table-cell">
                        <span>{{item.payCount}}</span>
                      </div>
                    </td>
                  </tr>
                  <template v-if="item.children.length>0">
                    <tr
                      class="ivu-table-row"
                      :key="indexs+ '-' +index"
                      v-for="(items,indexs) in item.children"
                    >
                      <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                          <span>{{items.payModeName}}</span>
                        </div>
                      </td>
                      <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                          <span>{{items.payMoney}}</span>
                        </div>
                      </td>
                      <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                          <span>{{items.payCount}}</span>
                        </div>
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Format } from "@/assets/util";
import storage from "@/libs/storage";
import {
  orderPayModeStatistics,
  orderExportPayModeExcel as orderExport
} from "@/api/order";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      examTableData: [],
      Tableloading: true,
      dataValue: [],
      optionTime: {
        shortcuts: [
          {
            text: "昨天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              return [start, end];
            }
          },
          {
            text: "最近一周",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "最近一个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          }
        ]
      },
      startTime: [new Date(), new Date()],
      columns1: [
        {
          title: "时间",
          key: "date",
          align: "center"
        },
        {
          title: "付款统计明细",
          align: "center",
          children: [
            {
              title: "支付方式",
              key: "payModeName",
              align: "center"
            },
            {
              title: "支付金额",
              key: "payMoney",
              align: "center"
            },
            {
              title: "支付笔数",
              key: "payCount",
              align: "center"
            }
          ]
        }
      ],
      data1: []
    };
  },
  methods: {
    init() {
      let newTimeDate = new Date();
      this.dataValue = [
        Format(newTimeDate, "yy-MM-dd"),
        Format(newTimeDate, "yy-MM-dd")
      ];
      this.orderPayModeStatistics();
    },
    BetDay() {
      let timeBet = this.daysBetween(this.dataValue[0], this.dataValue[1]);
      if (timeBet > 60) {
        this.$Message.error("最多查询两个月数据");
      } else {
        this.orderPayModeStatistics();
      }
    },
    daysBetween(sDate1, sDate2) {
      var dateSpan, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    },
    // 查询
    query() {
      this.BetDay();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.orderPayModeStatistics();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
    },
    // 触发日历
    handleChange(daterange) {
      this.dataValue = daterange;
    },
    // 商品列表
    async orderPayModeStatistics() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data } = await orderPayModeStatistics(item);
      if (data.code == 200) {
        this.total = data.data.total;
        let newPayData = data.data;
        const res = [];
        newPayData.forEach(item => {
          const items = {};
          items["date"] = item.date;
          const maps = item.maps;
          const mapsList = Object.values(maps);
          items["count"] = mapsList.length;
          items["children"] = [];
          items["payCount"] = mapsList[0].payCount;
          items["payModeName"] = mapsList[0].payModeName;
          items["payMoney"] = mapsList[0].payMoney;
          mapsList.forEach((element, index) => {
            if (index > 0) {
              const list = {};
              list["payCount"] = element.payCount;
              list["payModeName"] = element.payModeName;
              list["payMoney"] = element.payMoney;
              items.children.push(list);
            }
          });
          res.push(items);
        });

        this.examTableData = res;
        console.log(res);
        setTimeout(() => {
          this.Tableloading = false;
        }, 1000);
      } else {
        this.$Message.error(data.message);
      }
    },
    async orderExport() {
      console.log("orderExport");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        storeCode: this.$store.state.user.storeCode
      };
      const { data, status } = await orderExport(item);
      if (status == 200) {
        let newTimeDate = new Date();
        let storeName = storage.getStorage("storeInfo").storeName;
        let date = Format(newTimeDate, "yy年MM月dd日hh时mm分ss秒");
        saveAs(data, storeName + "实收统计报表" + date + ".xls");
      }
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style scoped>
.operTime button {
  margin-left: 15px;
}
.tabsList {
  margin-top: 15px;
}
.newTd {
  background-color: #f8f8f9 !important;
}
</style>
