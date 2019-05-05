<template>
  <div>
    <Card title="商品分类排行">
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
        >
          <template slot-scope="{ row }" slot="classCode">
            <div>{{getClassName(row.classCode)}}</div>
          </template>
        </Table>
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
        <Divider orientation="left">合计</Divider>
        <Row :gutter="16">
          <Col span="4">
            <div class="orderBillMoney">
              <span>销售总数量：</span>
              <strong class="ColorRed">{{saleCount}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>销售总金额：</span>
              <strong class="ColorRed">{{saleMoney}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>折扣总金额：</span>
              <strong class="ColorRed">{{rebateMoney}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>优惠总金额：</span>
              <strong class="ColorRed">{{preferentialMoney}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>实收总金额：</span>
              <strong class="ColorRed">{{realMoney}}</strong>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
import { Format } from "@/assets/util";
import storage from "@/libs/storage";
import {
  orderClassRanking,
  orderClassRankingTotal,
  orderExportGoodsClassSaleRankingExcel as orderExport
} from "@/api/order";
import { saveAs } from "file-saver";
import { productClassFindList as findClassList } from "@/api/goods";
export default {
  data() {
    return {
      Tableloading: true,
      saleCount: "0",
      saleMoney: "0",
      rebateMoney: "0",
      preferentialMoney: "0",
      realMoney: "0",
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
          title: "分类名称",
          slot: "classCode",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "销售数量",
          key: "saleCount",
          headerAlign: "center",
          align: "center"
        },
        {
          title: "销售金额",
          key: "saleMoney",
          headerAlign: "center",
          align: "center"
        },
        // {
        //   title: "提成金额",
        //   key: "deductMoney",
        //   align: "center",
        //   headerAlign:"center",
        // },
        {
          title: "折扣金额",
          key: "rebateMoney",
          headerAlign: "center",
          align: "center"
        },
        {
          title: "优惠金额 ",
          key: "preferentialMoney",
          headerAlign: "center",
          align: "center"
        },
        {
          title: "实收金额",
          key: "realMoney",
          headerAlign: "center",
          align: "center"
        }
      ],
      classCodeList: [],
      depotCodeList: [],
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
      this.findSizeAndColorList();
      this.orderClassRanking();
      this.orderClassRankingTotal();
    },
    dataTime() {
      this.query();
    },
    onSearch() {
      this.pageNum = 1;
      this.query();
    },
    // 查询
    query() {
      this.orderClassRanking();
      this.orderClassRankingTotal();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.query();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.query();
    },
    // 触发日历
    handleChange(daterange) {
      this.dataValue = daterange;
    },
    // 商品列表
    async orderClassRanking() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await orderClassRanking(item);
      if (status == 200 && data.code == 200) {
        this.total = data.data.total;
        this.data1 = data.data.list;
        setTimeout(() => {
          this.Tableloading = false;
        }, 1000);
      } else {
        this.$Message.error(data.message);
      }
    },
    // 商品合计
    async orderClassRankingTotal() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await orderClassRankingTotal(item);
      if (status == 200 && data.code == 200) {
        this.saleCount = data.data.saleCount;
        this.saleMoney = data.data.saleMoney;
        this.rebateMoney = data.data.rebateMoney;
        this.preferentialMoney = data.data.preferentialMoney;
        this.realMoney = data.data.realMoney;
        setTimeout(() => {
          this.Tableloading = false;
        }, 1000);
      }
    },
    async findSizeAndColorList() {
      let storeCode = this.storeCode;
      const { data: classData, status: classStatus } = await findClassList({
        storeCode
      });
      const noVal = {
        label: "无",
        value: ""
      };
      const classCodeList = [];
      classCodeList.push(noVal);
      if (classData.code == 200 && classStatus == 200) {
        this.classCodeList = classCodeList.concat(classData.data);
      }
    },
    getClassName(classCode) {
      let className = "无";
      this.classCodeList.forEach(item => {
        if (item.classCode == classCode) {
          className = item.className;
        }
      });
      return className;
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
        saveAs(data, storeName + "—商品分类销售排行统计报表—" + date + ".xls");
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
.ColorRed {
  color: #f00;
}
</style>
