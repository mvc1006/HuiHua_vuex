<template>
  <div class="content-box">
    <Card title="库存统计">
      <p class="iview-fontColor">查询当前库房信息</p>
      <div class="content-body">
        <Row class="pbtom10">
          <label class="search-label fl">商品名称</label>
          <Col span="6">
            <Input v-model="productName" placeholder/>
          </Col>
          <label class="search-label fl">商品编号</label>
          <Col span="6">
            <Input v-model="productCode" placeholder/>
          </Col>
        </Row>
        <Row class='pbtom10'>
          <label class='search-label fl'>库房名称</label>
          <Col span="6">
            <Input v-model="depotCode" placeholder/>
          </Col>
        </Row>
        <Row class="pbtom10">
          <label class="search-label fl"></label>
          <Col span="12">
            <Button type="primary" @click="onSearch" class="mright15">查询</Button>
            <Button type="primary" @click="orderStockExport">导出</Button>
          </Col>
        </Row>
        <Table
          class="table-all-width mtop15"
          border
          :loading="loading"
          :columns="trackColumns"
          :data="trackData"
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
import storage from "@/libs/storage";
import { inventoryApi, stockApiCount, orderStockExport } from "@/api/inventory";
import { Format } from "@/assets/util";
import { saveAs } from "file-saver";
export default {
  name: "tracking",
  data() {
    return {
      productName: "",
      operateType: "",
      productCode: "",
      depotCode: "",
      dateVal: "",
      model1: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      logList: [
        {
          value: "1",
          label: "销售"
        },
        {
          value: "2",
          label: "盘点"
        },
        {
          value: "3",
          label: "调拨"
        },
        {
          value: "4",
          label: "报损"
        },
        {
          value: "5",
          label: "采购入库"
        },
        {
          value: "6",
          label: "采退出库"
        },
        {
          value: "7",
          label: "商品领用"
        },
        {
          value: "8",
          label: "建档"
        },
        {
          value: "9",
          label: "退货"
        }
      ],
      trackColumns: [
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
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "商品名称",
          key: "productName",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "库房名称",
          key: "depotName",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "商品编号",
          key: "productCode",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "颜色名称",
          key: "colorName",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "尺码名称",
          key: "sizeName",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "库存数量",
          key: "stockNum",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "库存成本价",
          key: "stockPrice",
          width: 150,
          headerAlign: "center",
          align: "center"
        }
      ],
      trackData: [],
      loading: false
    };
  },
  methods: {
    init() {
      this.inventoryApi();
      this.stockApiCount();
    },
    onSearch() {
      this.pageNum = 1;
      this.search();
    },
    search() {
      this.inventoryApi();
      this.stockApiCount();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.search();
    },
    async orderStockExport() {
      console.log("orderExport");
      const item = {
        operateType: this.operateType,
        productCode: this.productCode,
        productName: this.productName,
        depotCode: this.depotCode,
        storeCode: this.$store.state.user.storeCode
      };
      const { data, status } = await orderStockExport(item);
      if (status == 200) {
        let newTimeDate = new Date();
        let storeName = storage.getStorage("storeInfo").storeName;
        let date = Format(newTimeDate, " yy年MM月dd日hh时mm分ss秒");
        saveAs(data, storeName + "—库存统计报表—" + date + ".xls");
      }
    },
    async inventoryApi() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        operateType: this.operateType,
        productCode: this.productCode,
        productName: this.productName,
        depotCode: this.depotCode,
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await inventoryApi(item);
      if (data.code == 200 && status == 200) {
        this.trackData = data.data;
      }
    },
    async stockApiCount() {
      let storeCode = storage.getStorage("storeInfo");
      const item = {
        operateType: this.operateType,
        productCode: this.productCode,
        productName: this.productName,
        depotCode: this.depotCode,
        page: this.pageNum,
        pageSize: this.pageSize,
        storeCode: storeCode.storeCode
      };
      const { data, status } = await stockApiCount(item);
      if (data.code == 200 && status == 200) {
        this.total = data.data;
      }
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style scoped>
.search-label {
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
  width: 100px;
}
</style>
