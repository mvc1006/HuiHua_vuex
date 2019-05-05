<template>
  <div v-if="showProduct">
    <Modal
      v-model="showModal"
      title="选择商品"
      width="90%"
      :styles="{top: '0px'}"
      class-name="vertical-center-modal"
      ok-text="确认"
      cancel-text="取消"
      @on-cancel="closeProduct"
    >
      <div class="content-body">
        <template v-if="types=='1'">
          <Row>
            <label class="search-label-w120 fl">快速查询</label>
            <Col span="18">
              <Input size="large" placeholder="请输入商品名" v-model="productFastQuery"/>
            </Col>
          </Row>
        </template>
        <template v-else>
          <Row>
            <Col span="3">
              <span class="search-span">颜色</span>
            </Col>
            <Col span="5">
              <Select v-model="searchItem.colorCode" size="large" clearable>
                <Option
                  v-for="item in colorCodeList"
                  :value="item.value"
                  :key="item.key"
                  :label="item.label"
                ></Option>
              </Select>
            </Col>
            <Col span="3">
              <span class="search-span">尺码</span>
            </Col>
            <Col span="5">
              <Select v-model="searchItem.sizeCode" size="large" filterable>
                <Option
                  v-for="item in sizeCodeList"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                ></Option>>
              </Select>
            </Col>
            <Col span="3">
              <span class="search-span">仓库</span>
            </Col>
            <Col span="5">
              <Select v-model="searchItem.depotCode" size="large" filterable>
                <Option
                  v-for="item in depotCodeList"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                ></Option>>
              </Select>
            </Col>
          </Row>
          <Row class="ptop20">
            <Col span="3">
              <span class="search-span">商品名称</span>
            </Col>
            <Col span="5">
              <Input size="large" placeholder="请输入商品名称" v-model="searchItem.productName"/>
            </Col>
            <Col span="3">
              <span class="search-span">商品编号</span>
            </Col>
            <Col span="5">
              <Input size="large" placeholder="请输入商品编号" v-model="searchItem.productCode"/>
            </Col>
          </Row>
        </template>
        <Row class="ptop20">
          <label class="search-label-w120 fl"></label>
          <Col span="6">
            <Button icon="ios-search" @click="onSearch" type="primary" size="large">查询</Button>
          </Col>
        </Row>
        <Divider class="dividerCenter" orientation="left">商品信息</Divider>
        <Table
          class="table-all-width"
          ref="currentRowTable"
          :columns="tableColumns"
          :data="tableData"
          :stripe="true"
          :border="true"
          @on-select="selectProduct"
          @on-select-cancel="selectProductCancel"
          @on-select-all="selectProductAll"
          @on-select-all-cancel="selectProductAllCancel"
        >
          <template slot-scope="{ row }" slot="depotCode">
            <div>{{getDepotName(row.depotCode)}}</div>
          </template>
          <template slot-scope="{ row }" slot="colorCode">
            <div>{{getColorName(row.colorCode)}}</div>
          </template>
          <template slot-scope="{ row }" slot="sizeCode">
            <div>{{getSizeName(row.sizeCode)}}</div>
          </template>
        </Table>
        <div class="page-box" v-if="true">
          <Page
            :total="total"
            :current.sync="pageNum"
            :page-size="pageSize"
            @on-change="changePage"
          />
        </div>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="closeProduct">取消</Button>
        <Button type="primary" size="large" @click="doSomething">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { productFindPage } from "@/api/product";
import {
  stockProductFindList,
  stockProductFindCount,
  stockWareHouseList as findDepotList
} from "@/api/stock";
import {
  goodsColorFindListByStoreCode as findColorList,
  productSizeFindList as findSizeCList
} from "@/api/goods";
import { productColumns, productStockColumns } from "./table/goodsColumns";
// import numeral from 'numeral';
export default {
  name: "secondModal",
  props: {
    // showProduct: false,
    types: {
      type: String,
      default: "1"
    } // 1采购 2退货 3 盘点 4 领用 5 报损 6 调拨
  },
  data() {
    return {
      showProduct: false,
      showModal: true,
      storeCode: "",
      tableColumns: [],
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      producSelection: [],
      productFastQuery: "",
      searchItem: {
        colorCode: "",
        depotCode: "",
        productCode: "",
        productName: "",
        sizeCode: ""
      },
      colorCodeList: [],
      sizeCodeList: [],
      depotCodeList: []
    };
  },
  methods: {
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      if (this.types == "1") {
        this.tableColumns = productColumns;
      } else {
        this.tableColumns = productStockColumns;
      }
      this.findSizeAndColorList();
      this.search();
      this.showProduct = true;
    },
    onSearch() {
      this.pageNum = 1;
      this.search();
    },
    search() {
      if (this.types == "1") {
        this.productFindPage();
      } else {
        this.stockProductFindList();
      }
    },
    doSomething(event) {
      const producSelection = this.producSelection;
      producSelection.forEach(item => {
        if (this.types == "1") {
          item.purchaseNum = 0;
          item.purchaseMoney = "0.00";
          item.purchasePrice = item.costPrice;
          item.preferentialMoney = "0.00";
          item.colorCode = "";
          item.sizeCode = "";
          item.unitName = item.productUnit;
          // item.typeName = this.getClassName(item.classCode);
          item.typeName = item.classCode;
        } else if (this.types == "2") {
          item.returnNum = 0;
          item.returnMoney = "0.00";
          item.returnPrice = item.stockPrice;
          item.preferentialMoney = "0.00";
        } else if (this.types == "3") {
          item.stockCheckNum = 0;
          item.stockNowNum = item.stockNum;
          item.diffStockNum = 0;
          item.productStockId = item.id;
        } else if (this.types == "4") {
          item.drawNum = 0;
          item.productStockId = item.id;
        } else if (this.types == "5") {
          item.scrapNum = 0;
          item.productStockId = item.id;
        } else if (this.types == "6") {
          item.inDepotCode = "";
          item.outDepotCode = item.depotCode;
          item.stockAllocationNum = 0;
          item.productStockId = item.id;
        }
        item.detailRemark = "";
        item.realMoney = "0.00";
      });
      this.$emit("getdata", [].concat(this.producSelection));
      this.resetSearch();
    },
    closeProduct() {
      this.$emit("getdata", []);
      this.resetSearch();
    },
    resetSearch() {
      this.showModal = true;
      this.showProduct = false;
      this.producSelection = [];
      this.searchItem = {
        colorCode: "",
        depotCode: "",
        productCode: "",
        productName: "",
        sizeCode: ""
      };
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    selectProduct(selection, row) {
      console.log("selectProduct");
      this.producSelection = selection;
    },
    selectProductAll(selection) {
      console.log("selectProductAll");
      this.producSelection = selection;
    },
    selectProductCancel(row) {
      console.log("selectProductCancel");
      this.removeArrItem(row);
    },
    selectProductAllCancel(selection) {
      console.log("selectProductAllCancel");
      this.producSelection = selection;
    },
    findArrIndex(item, data) {
      return data.findIndex(elem => {
        return elem.id == item.id;
      });
    },
    removeArrItem(item) {
      let index = this.findArrIndex(item, this.producSelection);
      this.producSelection.splice(index, 1);
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 500);
    },
    async productFindPage() {
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      let fastQuery = this.productFastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      const { data, status } = await productFindPage({
        page,
        fastQuery,
        pageSize,
        storeCode
      });
      if (data.code == 200 && status == 200) {
        this.tableData = data.data.list;
        this.total = data.data.total;
      }
      this.closeLoading(Loading);
    },
    async stockProductFindList() {
      let colorCode = this.searchItem.colorCode;
      let depotCode = this.searchItem.depotCode;
      let productCode = this.searchItem.productCode;
      let productName = this.searchItem.productName;
      let sizeCode = this.searchItem.sizeCode;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      const options = {
        colorCode,
        depotCode,
        productCode,
        productName,
        sizeCode,
        page,
        pageSize,
        storeCode
      };
      const { data, status } = await stockProductFindList(options);
      const {
        data: countData,
        status: constStatus
      } = await stockProductFindCount(options);
      if (data.code == 200 && status == 200) {
        this.tableData = data.data;
      } else {
        this.$Message.error(data.message);
      }
      if (countData.code == 200 && constStatus == 200) {
        this.total = countData.data;
      } else {
        this.$Message.error(countData.message);
      }
    },
    async findSizeAndColorList() {
      let storeCode = this.storeCode;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      const { data: sizeData, status: sizeStatus } = await findSizeCList({
        storeCode
      });
      const { data: colorData, status: colorStatus } = await findColorList({
        storeCode
      });
      const { data: depotData, status: depotStatus } = await findDepotList({
        storeCode
      });
      const noVal = {
        label: "无",
        value: ""
      };
      const sizeCodeList = [];
      const colorCodeList = [];
      const depotCodeList = [];
      colorCodeList.push(noVal);
      sizeCodeList.push(noVal);
      depotCodeList.push(noVal);
      if (colorData.code == 200 && colorStatus == 200) {
        colorData.data.forEach(item => {
          colorCodeList.push({
            label: item.colorName,
            value: item.colorCode
          });
        });
      }
      if (sizeData.code == 200 && sizeStatus == 200) {
        sizeData.data.forEach(item => {
          sizeCodeList.push({
            label: item.sizeName,
            value: item.sizeCode + ""
          });
        });
      }
      if (depotData.code == 200 && depotStatus == 200) {
        depotData.data.forEach(item => {
          depotCodeList.push({
            label: item.depotName,
            value: item.depotCode + ""
          });
        });
      }
      this.colorCodeList = colorCodeList;
      this.sizeCodeList = sizeCodeList;
      this.depotCodeList = depotCodeList;
      this.closeLoading(Loading);
    },
    getColorName(colorCode) {
      let colorName = "无";
      this.colorCodeList.forEach(item => {
        if (item.value == colorCode) {
          colorName = item.label;
        }
      });
      return colorName;
    },
    getSizeName(sizeCode) {
      let sizeName = "无";
      this.sizeCodeList.forEach(item => {
        if (item.value == sizeCode) {
          sizeName = item.label;
        }
      });
      return sizeName;
    },
    getDepotName(depotCode) {
      let depotName = "无";
      this.depotCodeList.forEach(item => {
        if (item.value == depotCode) {
          depotName = item.label;
        }
      });
      return depotName;
    }
  },
  mounted() {
    // this.init();
  }
};
</script>
<style>
.table-all-width table {
  width: 100% !important;
}
.search-span {
  text-align: right;
  line-height: 32px;
  height: 32px;
  display: block;
  font-size: 14px;
  box-sizing: border-box;
  padding-right: 10px;
}
</style>
