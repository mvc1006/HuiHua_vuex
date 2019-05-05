<template>
  <div>
    <Card title="运营统计">
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
      <div class="tabsList">
        <Table
          class="table-all-width"
          :columns="columns1"
          :data="data1"
          :stripe="true"
          :border="true"
          :loading="Tableloading"
        ></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import { Format } from "@/assets/util";
import storage from "@/libs/storage";
import {
  orderOperateStatistics,
  orderExportOperateStatisticsExcel as orderExport
} from "@/api/order";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
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
      startTime: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          minWidth: 60,
          align: "center",
          className: "td-index"
        },
        {
          title: "日期",
          key: "date",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "交易笔数",
          key: "tradeCount",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "欠款金额",
          key: "arrearsMoney",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "退货金额",
          key: "returnMoney",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "免单金额",
          key: "freeMoney",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "赠送金额",
          key: "giveMoney",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "优惠金额",
          key: "preferentialMoney",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "折扣金额",
          key: "rebateMoney",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "应收单均",
          key: "receivableOrderAverage",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "应收金额",
          key: "money",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "实收金额",
          key: "realMoney",
          align: "center",
          headerAlign: "center"
        }
      ],
      data1: []
    };
  },
  methods: {
    init() {
      let newTimeDate = new Date();
      this.startTime = [
        Format(newTimeDate, "yy-MM-dd"),
        Format(newTimeDate, "yy-MM-dd")
      ];
      this.dataValue = [
        Format(newTimeDate, "yy-MM-dd"),
        Format(newTimeDate, "yy-MM-dd")
      ];
      this.orderOperateStatistics();
    },
    BetDay() {
      let timeBet = this.daysBetween(this.dataValue[0], this.dataValue[1]);
      if (timeBet > 60) {
        this.$Message.error("最多查询两个月数据");
      } else {
        this.orderOperateStatistics();
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
      this.orderOperateStatistics();
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
    async orderOperateStatistics() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data } = await orderOperateStatistics(item);
      if (data.code == 200) {
        this.total = data.data.total;
        this.data1 = data.data;
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
        saveAs(data, storeName + "—营运统计报表—" + date + ".xls");
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
</style>
