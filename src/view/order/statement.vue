<template>
  <div>
    <Card title="利润报表">
      <div class="operTime">
        <span>时间：</span>
        <DatePicker
          type="daterange"
          :options="optionTime"
          format="yyyy-MM-dd"
          @on-change="handleChange"
          :value="startTime"
          :editable="false"
          split-panels
          style="width: 300px"
        ></DatePicker>
        <Button type="primary" @click="query">查询</Button>
        <Button type="success">导出</Button>
      </div>
      <div class="tabsList">
        <Table
          class="table-all-width"
          :columns="columns1"
          :data="data1"
          :stripe="true"
          :border="true"
          :loading="loading"
        ></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import { Format } from "@/assets/util";
const numeral = require("numeral");
export default {
  data() {
    return {
      loading: false,
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
          title: "序号",
          type: "index",
          width: 60,
          minWidth: 60,
          align: "center",
          className: "td-index"
        },
        {
          title: "日期",
          key: "date"
        },
        {
          title: "应收合计",
          key: "date1"
        },
        {
          title: "实收合计",
          key: "date2"
        },
        {
          title: "交易笔数",
          key: "date3"
        },
        {
          title: "应收单均",
          key: "date4"
        },
        {
          title: "客人数",
          key: "date5"
        },
        {
          title: "应收人均",
          key: "date6"
        },
        {
          title: "折扣金额",
          key: "date7"
        },
        {
          title: "优惠金额",
          key: "date8"
        },
        {
          title: "赠送金额",
          key: "date9"
        }
      ],
      data1: []
    };
  },
  methods: {
    // 遍历data值
    addData(data, key) {
      let allVal = numeral(0);
      data.forEach(item => {
        allVal.add(item[key]);
        item[key] = this.format(item[key]);
      });
      return allVal.format("0.00");
    },
    // 合计方法
    setStatistics(data) {
      const keys = Object.keys(data[0]);
      const result = {
        date: "合计"
      };
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== "date") {
          result[key] = this.addData(data, key);
        }
      }
      result["date4"] = numeral(+result["date1"])
        .divide(+result["date3"])
        .format("0.00");
      data.push(result);
      return data;
    },
    // 保留两位小数
    format(val) {
      return numeral(val).format("0.00");
    },
    // data值
    getData() {
      const data = [
        {
          date: "2019-01-22",
          date1: "2.22",
          date2: "3.54",
          date3: "4.26",
          date4: "5.8",
          date5: "6.6",
          date6: "7.4",
          date7: "8.2",
          date8: "9.2",
          date9: "5.6"
        },
        {
          date: "2019-01-22",
          date1: "2.22",
          date2: "3.54",
          date3: "4.26",
          date4: "5.8",
          date5: "6.6",
          date6: "7.4",
          date7: "8.2",
          date8: "9.2",
          date9: "5.6"
        },
        {
          date: "2019-01-22",
          date1: "2.22",
          date2: "3.54",
          date3: "4.26",
          date4: "5.8",
          date5: "6.6",
          date6: "7.4",
          date7: "8.2",
          date8: "9.2",
          date9: "5.6"
        }
      ];
      this.data1 = this.setStatistics(data);
    },
    // 查询
    query() {
      this.$Message.info(this.dataValue[0] + "——" + this.dataValue[1]);
    },
    // 触发日历
    handleChange(daterange) {
      this.dataValue = daterange;
    }
  },
  mounted: function() {
    this.getData();
    let newTimeDate = new Date();
    this.dataValue = [
      Format(newTimeDate, "yy-MM-dd"),
      Format(newTimeDate, "yy-MM-dd")
    ];
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
