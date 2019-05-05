<template>
  <div>
    <Card title="异常订单统计表">
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
        <Button @click="Advanced">高级查询
          <Icon :type="iconImg"/>
        </Button>
      </div>
      <div class="Advanced ptop20" v-if="AdShow">
        <Row class="pbtom10">
          <label class="search-label fl">收款员编号：</label>
          <Col span="6">
            <Input v-model="cashierCode" placeholder="请输入收款员编号"/>
          </Col>
          <label class="search-label fl">收款员姓名：</label>
          <Col span="6">
            <Input v-model="cashierName" placeholder="请输入收款员姓名"/>
          </Col>
        </Row>
        <Row class="pbtom10">
          <label class="search-label fl">订单编号：</label>
          <Col span="6">
            <Input v-model="orderNo" placeholder="请输入订单编号"/>
          </Col>
        </Row>
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
        <Divider orientation="left">合计</Divider>
        <Row :gutter="16">
          <Col span="4">
            <div class="orderBillMoney">
              <span>订单总金额：</span>
              <strong class="ColorRed">{{billMoney}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>实收总金额：</span>
              <strong class="ColorRed">{{realMoney}}</strong>
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
              <span>赠送总金额：</span>
              <strong class="ColorRed">{{giftMoney}}</strong>
            </div>
          </Col>
        </Row>
        <Row :gutter="16" style="margin-top:10px;">
          <Col span="4">
            <div class="orderBillMoney">
              <span>欠款总金额：</span>
              <strong class="ColorRed">{{arrearsMoney}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>退货总金额：</span>
              <strong class="ColorRed">{{returnMoney}}</strong>
            </div>
          </Col>
          <Col span="4">
            <div class="orderBillMoney">
              <span>免单总金额：</span>
              <strong class="ColorRed">{{noSingleMoney}}</strong>
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
  orderFlowAbnormal,
  orderFlowAbnormalToal,
  orderExportAbnormalExcel as orderExport
} from "@/api/order";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      Tableloading: true,
      AdShow: false,
      iconImg: "ios-arrow-up",
      cashierCode: "",
      cashierName: "",
      orderNo: "",
      dataValue: [],
      billMoney: "0",
      realMoney: "0",
      rebateMoney: "0",
      preferentialMoney: "0",
      arrearsMoney: "0",
      returnMoney: "0",
      noSingleMoney: "0",
      giftMoney: "0",
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
          className: "td-index",
          fixed: "left"
        },
        {
          title: "门店编号",
          key: "storeCode",
          width: 150,
          headerAlign: "center",
          align: "center",
          fixed: "left"
        },
        {
          title: "订单编号",
          key: "orderNo",
          width: 180,
          headerAlign: "center",
          align: "center",
          fixed: "left"
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "结账时间",
          key: "payTime",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "订单金额",
          key: "billMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "优惠金额",
          key: "preferentialMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "折扣金额",
          key: "rebateMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "赠送金额",
          key: "giftMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "实收金额",
          key: "realMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "欠款金额 ",
          key: "arrearsMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "退货金额 ",
          key: "returnMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "免单金额 ",
          key: "noSingleMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "销售标识",
          key: "saleFlag",
          width: 150,
          headerAlign: "center",
          align: "center",
          render: (h, params) => {
            let status = params.row.saleFlag; // 0销售 1欠款 2退货 3免单 默认0 ,
            if (status === 0) {
              return h("p", "销售");
            }
            if (status === 1) {
              return h("p", "欠款");
            }
            if (status === 2) {
              return h("p", "退货");
            }
            if (status === 3) {
              return h("p", "免单");
            }
            if (status === 4) {
              return h("p", "赠送");
            }
          }
        },
        {
          title: "收款台编号",
          key: "machineCode",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "收款员编号",
          key: "cashierCode",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "收款员姓名",
          key: "cashierName",
          width: 150,
          headerAlign: "center",
          align: "center"
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
      this.orderFlowAbnormal();
      this.orderFlowAbnormalToal();
    },
    dataTime() {
      this.orderFlowAbnormal();
      this.orderFlowAbnormalToal();
    },
    onSearch() {
      this.pageNum = 1;
      this.query();
    },
    // 查询
    query() {
      this.orderFlowAbnormal();
      this.orderFlowAbnormalToal();
    },
    // 高级查询
    Advanced() {
      this.AdShow = !this.AdShow;
      if (this.AdShow == false) {
        this.iconImg = "ios-arrow-up";
      } else {
        this.iconImg = "ios-arrow-down";
      }
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.orderFlowAbnormal();
      this.orderFlowAbnormalToal();
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
    async orderFlowAbnormal() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        cashierCode: this.cashierCode,
        cashierName: this.cashierName,
        orderNo: this.orderNo,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await orderFlowAbnormal(item);
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
    async orderFlowAbnormalToal() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        cashierCode: this.cashierCode,
        cashierName: this.cashierName,
        orderNo: this.orderNo,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await orderFlowAbnormalToal(item);
      if (status == 200 && data.code == 200) {
        this.billMoney = data.data.billMoney;
        this.realMoney = data.data.realMoney;
        this.rebateMoney = data.data.rebateMoney;
        this.preferentialMoney = data.data.preferentialMoney;
        this.giftMoney = data.data.giftMoney;
        this.arrearsMoney = data.data.arrearsMoney;
        this.returnMoney = data.data.returnMoney;
        this.noSingleMoney = data.data.noSingleMoney;
        setTimeout(() => {
          this.Tableloading = false;
        }, 1000);
      }
    },
    async orderExport() {
      console.log("orderExport");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        cashierCode: this.cashierCode,
        cashierName: this.cashierName,
        orderNo: this.orderNo,
        storeCode: this.$store.state.user.storeCode
      };
      const { data, status } = await orderExport(item);
      if (status == 200) {
        let newTimeDate = new Date();
        let storeName = storage.getStorage("storeInfo").storeName;
        let date = Format(newTimeDate, "yy年MM月dd日hh时mm分ss秒");
        saveAs(data, storeName + "—异常订单报表—" + date + ".xls");
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
