<template>
  <div>
    <Card title="商品销售排行">
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
      <div class="Advanced" v-if="AdShow">
        <Row class="pbtom10">
          <label class="search-label fl">分类名称:</label>
          <Col span="6">
            <Select v-model="classCode" filterable clearable>
              <Option v-for="item in classCodeName" :value="item.value" :key="item.id">{{ item.label }}</Option>
            </Select>
          </Col>
          <label class="search-label fl">颜色名称:</label>
          <Col span="6">
            <Select v-model="colorCode" filterable clearable>
              <Option v-for="item in colorCodeName" :value="item.value" :key="item.id">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="pbtom10">
          <label class="search-label fl">尺码名称：</label>
          <Col span="6">
             <Select v-model="sizeCode" filterable clearable>
                <Option v-for="item in sizeCodeName" :value="item.value" :key="item.id">{{ item.label }}</Option>
             </Select>
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
  orderRanking,
  orderRankingTotal,
  orderExportGoodsSaleRankingExcel as orderExport
} from "@/api/order";
import {
  productClassFindList,
  findClassSizeList,
  findClassColorList
} from "@/api/goods";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      Tableloading: true,
      AdShow: false,
      iconImg: "ios-arrow-up",
      classCode: "",
      colorCode: "",
      sizeCode: "",
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
          className: "td-index",
          fixed: "left"
        },
        {
          title: "门店编号",
          key: "storeCode",
          width: 120,
          align: "center",
          headerAlign: "center",
          fixed: "left"
        },
        {
          title: "分类名称",
          key: "className",
          width: 120,
          align: "center",
          headerAlign: "center",
          fixed: "left"
        },
        {
          title: "商品名称",
          key: "productName",
          width: 150,
          headerAlign: "center",
          align: "center",
          fixed: "left"
        },
        {
          title: "商品编号",
          key: "productCode",
          width: 150,
          align: "center",
          headerAlign: "center"
        },
        {
          title: "颜色名称",
          key: "colorName",
          width: 180,
          align: "center",
          headerAlign: "center"
        },
        {
          title: "尺码名称",
          key: "sizeName",
          width: 180,
          align: "center",
          headerAlign: "center"
        },
        {
          title: "商品条形码",
          key: "productBarcode",
          width: 150,
          align: "center",
          headerAlign: "center"
        },
        {
          title: "商品英文或拼音名称",
          key: "productEnglishName",
          width: 150,
          align: "center",
          headerAlign: "center"
        },
        {
          title: "单位",
          key: "productUnit",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "单价",
          key: "productPrice",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "销售数量",
          key: "saleCount",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "销售金额",
          key: "saleMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        // {
        //   title: "提成金额",
        //   key: "deductMoney",
        //   width: 150,
        //   align: "center",
        //   headerAlign:"center",
        // },
        {
          title: "折扣金额",
          key: "rebateMoney",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "优惠金额 ",
          key: "preferentialMoney",
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
        }
      ],
      data1: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      classCodeName: [],
      colorCodeName: [],
      sizeCodeName: []
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
      this.orderRanking();
      this.orderRankingTotal();
      this.classCodeNames();
      this.findClassSizeList();
      this.findClassColorList();
    },
    dataTime() {
      this.orderRanking();
      this.orderRankingTotal();
    },
    onSearch() {
      this.pageNum = 1;
      this.query();
    },
    // 查询
    query() {
      this.orderRanking();
      this.orderRankingTotal();
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
      this.query();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      his.query();
    },
    // 触发日历
    handleChange(daterange) {
      this.dataValue = daterange;
    },
    // 商品列表
    async orderRanking() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        classCode: this.classCode,
        colorCode: this.colorCode,
        sizeCode: this.sizeCode,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await orderRanking(item);
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
    async orderRankingTotal() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        page: this.pageNum,
        pageSize: this.pageSize,
        classCode: this.classCode,
        colorCode: this.colorCode,
        sizeCode: this.sizeCode,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await orderRankingTotal(item);
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
    async orderExport() {
      console.log("orderExport");
      const item = {
        beginTime: this.dataValue[0],
        endTime: this.dataValue[1],
        classCode: this.classCode,
        colorCode: this.colorCode,
        sizeCode: this.sizeCode,
        storeCode: this.$store.state.user.storeCode
      };
      const { data, status } = await orderExport(item);
      if (status == 200) {
        let newTimeDate = new Date();
        let storeName = storage.getStorage("storeInfo").storeName;
        let date = Format(newTimeDate, "yy年MM月dd日hh时mm分ss秒");
        saveAs(data, storeName + "—商品销售排行统计报表—" + date + ".xls");
      }
    },
    async classCodeNames() {
      let fastQuery = "";
      let page = 0;
      let pageSize = 0;
      let pid = this.pid;
      const { data, status } = await productClassFindList({
        fastQuery,
        page,
        pageSize,
        pid
      });
      if (data.code == 200 && status == 200) {
        let codeName = data.data;
        let codeNameList = [];
        codeName.forEach(item => {
          codeNameList.push({
            id: item.id,
            label: item.className,
            value: item.classCode
          });
        });
        this.classCodeName = codeNameList;
      }
    },
    // 获取尺码
    async findClassSizeList(classCode) {
      let item = {
        classCode: classCode
      };
      const { data } = await findClassSizeList(item);
      if (data.code == 200) {
        let sizeName = data.data;
        let sizeNameList = [];
        sizeName.forEach(item => {
          sizeNameList.push({
            id: item.id,
            label: item.sizeName,
            value: item.sizeCode
          });
        });
        this.sizeCodeName = sizeNameList;
      }
    },
    // 获取颜色
    async findClassColorList(classCode) {
      let item = {
        classCode: classCode
      };
      const { data } = await findClassColorList(item);
      if (data.code == 200) {
        let colorName = data.data;
        let colorNameList = [];
        colorName.forEach(item => {
          colorNameList.push({
            id: item.id,
            label: item.colorName,
            value: item.colorCode
          });
        });
        this.colorCodeName = colorNameList;
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
.Advanced {
  margin: 20px;
  padding: 30px;
  border: 1px solid #dddddd;
}
.tabsList {
  margin-top: 15px;
}
.ColorRed {
  color: #f00;
}
</style>
