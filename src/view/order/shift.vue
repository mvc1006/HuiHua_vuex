<template>
  <div>
    <Card title="交接班记录">
      <div class="operTime">
        <span>时间：</span>
        <DatePicker
          type="datetimerange"
          :options="optionTime"
          format="yyyy-MM-dd HH:mm:ss"
          @on-change="handleChange"
          :value="startTime"
          :editable="true"
          split-panels
          @on-ok="dataTime"
          style="width: 300px"
        ></DatePicker>
        <Button type="primary" @click="onSearch">查询</Button>
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
        <div style="margin-top: 10px;overflow: hidden">
          <div style="float: right;">
            <Page
              :total="total"
              :current.sync="pageNum"
              :page-size="pageSize"
              show-sizer
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { Format } from "@/assets/util";
import storage from "@/libs/storage";
import {
  cashierOrderFind,
  cashierExportAbnormalExcel as orderExport
} from "@/api/cashier";
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
          title: "门店编号",
          key: "storeCode",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "交班时间",
          key: "overTime",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "机器号",
          key: "machineCode",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "收款员编号",
          key: "cashierCode",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "收款员姓名",
          key: "cashierName",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "登录时间",
          key: "shiftTime",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "备注",
          key: "remarks",
          align: "center",
          headerAlign: "center"
        }
      ],
      data1: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      let newTimeDate = new Date();

      this.startTime = [
        Format(newTimeDate, "yy-MM-dd 00:00:00"),
        Format(newTimeDate, "yy-MM-dd hh:mm:ss")
      ];
      this.dataValue = [
        Format(newTimeDate, "yy-MM-dd 00:00:00"),
        Format(newTimeDate, "yy-MM-dd hh:mm:ss")
      ];
      this.orderFind();
    },
    onSearch() {
      this.pageNum = 1;
      this.query();
    },
    // 查询
    query() {
      this.orderFind();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.orderFind();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.query();
    },
    dataTime() {
      this.orderFind();
    },
    // 触发日历
    handleChange(daterange) {
      this.dataValue = daterange;
    },
    // 商品列表
    async orderFind() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await cashierOrderFind(item);
      if (data.code == 200 && status == 200) {
        this.total = data.data.total;
        this.data1 = data.data.list;
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
        saveAs(data, storeName + "—接班记录报表—" + date + ".xls");
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
