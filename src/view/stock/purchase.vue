<template>
  <div>
    <Card title="采购">
      <p class="iview-fontColor">将采购的原料录入系统，自动记录库存，请仔细核对。。</p>
      <div class="content-body">
        <Row>
          <label class="search-label-w120 fl">采购经手人</label>
          <Col span="8">
            <Input size="large" placeholder="请输入采购经手人" v-model="searchItem.purchasePerson"/>
          </Col>
          <label class="search-label-w120 fl">状态</label>
          <Col span="8">
            <Select v-model="searchItem.purchaseStatus" size="large" clearable>
              <Option
                v-for="item in purchaseStatusList"
                :value="item.value"
                :key="item.key"
                :label="item.label"
              ></Option>
            </Select>
          </Col>
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl">记录人</label>
          <Col span="8">
            <Input size="large" placeholder="请输入记录人" v-model="searchItem.recordPerson"/>
          </Col>
          <label class="search-label-w120 fl">付款方式</label>
          <Col span="8">
            <Select v-model="searchItem.payModel" size="large" clearable>
              <Option
                v-for="item in payModelList"
                :value="item.value"
                :key="item.key"
                :label="item.label"
              ></Option>
            </Select>
          </Col>
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl">供应商</label>
          <Col span="8">
            <Select v-model="searchItem.supplierId" size="large" filterable>
              <Option
                v-for="item in supplierList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              ></Option>>
            </Select>
          </Col>
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl"></label>
          <Col span="6">
            <Button type="primary" size="large" @click="onSearch">查询</Button>
          </Col>
        </Row>
        <Divider class="dividerCenter" orientation="left">采购记录</Divider>
        <Row class="pbtom10">
          <Button type="primary" size="large" icon="md-add" @click="add">新建采购单</Button>
        </Row>
        <Table
          class="table-all-width"
          highlight-row
          ref="currentRowTable"
          :columns="tableColumns"
          :data="tableData"
          :stripe="true"
          :border="true"
          :loading="tableLoading"
        >
          <template slot-scope="{row, index }" slot="actions">
            <div v-if="row.purchaseStatus==2">
              <Button
                type="info"
                icon="ios-eye"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
              >查看</Button>
            </div>
            <div v-else>
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="edit(index)"
              >编辑</Button>
              <Button
                type="info"
                icon="md-returnmark"
                size="small"
                style="margin-right: 5px"
                @click="makeSure(index)"
              >确认</Button>
              <Button
                type="error"
                icon="md-trash"
                size="small"
                style="margin-right: 5px"
                @click="delTableData(index)"
              >删除</Button>
            </div>
          </template>
        </Table>

        <div class="page-box" v-if="true">
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
    </Card>

    <!-- 弹出层  采购明细信息  开始 -->
    <Modal
      v-model="showModal"
      :title="showTitle"
      width="95%"
      :styles="{top: '0px'}"
      class-name="vertical-center-modal"
      @on-cancel="closeModal"
    >
      <div>
        <div class="content-body content-body-scroll">
          <Row>
            <Col span="3">
              <span class="search-span span-required">采购人</span>
            </Col>
            <Col span="5">
              <Input
                :disabled="!showDetail"
                size="large"
                placeholder="请输入采购人"
                v-model="detailItems.purchasePerson"
              />
            </Col>
            <Col span="3">
              <span class="search-span span-required">记录人</span>
            </Col>
            <Col span="5">
              <Input
                :disabled="!showDetail"
                size="large"
                placeholder="请输入记录人"
                v-model="detailItems.recordPerson"
              />
            </Col>
            <Col span="3">
              <span class="search-span span-required">采购日期</span>
            </Col>
            <Col span="5">
              <DatePicker
                size="large"
                type="datetime"
                placement="bottom-end"
                placeholder="采购日期"
                :disabled="!showDetail"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                :value="detailItems.purchaseTime"
                @on-change="changeDate"
              ></DatePicker>
            </Col>
          </Row>
          <Row class="ptop20">
            <Col span="3">
              <span class="search-span span-required">付款方式</span>
            </Col>
            <Col span="5">
              <Select :disabled="!showDetail" v-model="detailItems.payModel" size="large" clearable>
                <Option
                  v-for="item in payModelList"
                  :value="item.value"
                  :key="item.key"
                  :label="item.label"
                ></Option>
              </Select>
            </Col>
            <Col span="3">
              <span class="search-span span-required">供应商</span>
            </Col>
            <Col span="5">
              <Select
                :disabled="!showDetail"
                v-model="detailItems.supplierId"
                size="large"
                filterable
              >
                <Option
                  v-for="item in supplierList"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                ></Option>>
              </Select>
            </Col>
            <Col span="3">
              <span class="search-span span-required">库房</span>
            </Col>
            <Col span="5">
              <Select
                :disabled="!showDetail"
                v-model="detailItems.depotCode"
                size="large"
                filterable
              >
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
              <span class="search-span">备注</span>
            </Col>
            <Col span="18">
              <Input
                style="width:73%"
                :disabled="!showDetail"
                type="textarea"
                :rows="4"
                v-model="detailItems.remark"
                placeholder="请输入备注信息"
              />
            </Col>
          </Row>
          <Divider class="dividerCenter" orientation="left">采购明细记录</Divider>
          <Row class="pbtom10">
            <Col span="6">
              <Button
                type="primary"
                size="large"
                icon="md-add"
                @click="addProduct"
                v-if="showDetail"
              >添加商品</Button>
            </Col>
          </Row>

          <Table
            class="table-all-width"
            highlight-row
            ref="currentRowTable"
            :columns="detailColumns"
            :data="detailData"
            :stripe="true"
            :border="true"
            :loading="detailLoading"
          >
            <template slot-scope="{ row }" slot="typeName">
              <div>{{getClassName(row.typeName)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="colorCode">
              <Select  v-if="showDetail" v-model="row.colorCode" @on-change='changeInSelect("colorCode",row.colorCode,index)' size="large" filterable>
                <Option
                  v-for="item in row.colorCodeList"
                  :value="item.value"
                  :key="item.id + item.value"
                  :label="item.label"
                ></Option>>
              </Select>
              <div v-else>{{getColorName(row.colorCodeList,row.colorCode)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="sizeCode">
              <Select v-if="showDetail" v-model="row.sizeCode" @on-change='changeInSelect("sizeCode",row.sizeCode,index)' size="large" filterable>
                <Option
                  v-for="item in row.sizeCodeList"
                  :value="item.value"
                  :key="item.id + item.value"
                  :label="item.label"
                ></Option>>
              </Select>
              <div v-else>{{getSizeName(row.sizeCodeList,row.sizeCode)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="purchaseNum">
              <div v-if="showDetail">
                <Input
                  :value="row.purchaseNum"
                  placeholder="采购数量"
                  @input="changeDetailItem($event,row,'purchaseNum',index)"
                />
              </div>
              <div v-else>{{row.purchaseNum}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="purchasePrice">
              <div v-if="showDetail">
                <Input
                  :value="row.purchasePrice"
                  placeholder="采购单价"
                  @input="changeDetailItem($event,row,'purchasePrice',index)"
                />
              </div>
              <div v-else>{{row.purchasePrice}}</div>
            </template>
            <template slot-scope="{ row }" slot="purchaseMoney">
              <div v-if="showDetail">
                <Input v-model="row.purchaseMoney" placeholder="应付金额"/>
              </div>
              <div v-else>{{row.purchaseMoney}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="preferentialMoney">
              <div v-if="showDetail">
                <Input
                  :value="row.preferentialMoney"
                  placeholder="优惠金额"
                  @on-blur="changeDetailItems(row,'preferentialMoney',index)"
                  @input="changeDetailItem($event,row,'preferentialMoney',index)"
                />
              </div>
              <div v-else>{{row.preferentialMoney}}</div>
            </template>
            <template slot-scope="{ row }" slot="detailRemark">
              <div v-if="showDetail">
                <Input v-model="row.detailRemark" placeholder="明细备注"/>
              </div>
              <div v-else>{{row.detailRemark}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="detailaction">
              <div v-if="showDetail">
                <Button
                  type="error"
                  icon="md-trash"
                  size="small"
                  style="margin-right: 5px"
                  @click="delProduct(index)"
                >删除</Button>
              </div>
              <div v-else>无</div>
            </template>
          </Table>
          <div class="total-box">
            <div class="total-title">合计</div>
            <div class="total-info">
              <p>
                数量合计：
                <span>{{computeProductCount}}</span>
              </p>
              <p>
                金额合计：
                <span>{{computeProductMoney}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div v-if="showDetail">
          <Button type="primary" size="large" @click="returnSaveDraft">保存草稿</Button>
          <Button type="primary" size="large" @click="returnSaveRegular">保存</Button>
        </div>
        <div v-else>
          <Button type="primary" size="large" @click="closeModal">关闭</Button>
        </div>
      </div>
    </Modal>
    <!-- 弹出层  采购明细信息  结束 -->
    <!-- 弹出层  商品信息  开始 -->
    <second-modal ref="refSecondModal" :types="types" @getdata="getModalData"></second-modal>
    <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除此条记录？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="delLoading" @click="delSure">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import tableColumns from "./table/purchaseColumns";
import detailColumns from "./table/purchaseDetailColumns";
import secondModal from "./secondModal.vue";
import {
  stockPurchaseFindList,
  stockPurchaseFindCount,
  stockSupplierFindList,
  stockPurchaseSave,
  stockPurchaseDetailList,
  stockPurchaseUpdate,
  stockPurchaseDeleteOrder,
  stockWareHouseList as findDepotList
} from "@/api/stock";
import {
  findClassColorList,
  findClassSizeList,
  productClassFindList as findClassList
} from "@/api/goods";
import numeral from "numeral";
export default {
  name: "purchase",
  data() {
    return {
      storeCode: "",
      types: "1",
      showTitle: "新增采购单",
      showModal: false,
      showDetail: false,
      modalFlag: "add",
      tableLoading: false,
      detailLoading: false,
      tableColumns: tableColumns,
      tableData: [],
      detailColumns: detailColumns,
      detailData: [],
      searchItem: {
        purchasePerson: "",
        purchaseStatus: "",
        recordPerson: "",
        payModel: "",
        supplierId: ""
      },
      purchaseStatusList: [
        {
          value: '',
          label: "无"
        },
        {
          value: 1,
          label: "未入库"
        },
        {
          value: 2,
          label: "已入库"
        }
      ],
      payModelList: [
        {
          value: 1,
          label: "现金"
        },
        {
          value: 2,
          label: "支付宝"
        },
        {
          value: 3,
          label: "微信"
        },
        {
          value: 4,
          label: "欠款"
        },
        {
          value: 5,
          label: "免单"
        },
        {
          value: 6,
          label: "优惠券"
        },
        {
          value: 7,
          label: "会员余额支付"
        },
        {
          value: 8,
          label: "会员积分抵现"
        },
        {
          value: 9,
          label: "会员优惠券支付"
        }
      ],
      supplierList: [],
      classCodeList: [],
      depotCodeList: [],
      detailItems: {
        purchasePerson: "",
        purchaseStatus: "",
        recordPerson: "",
        depotCode: "",
        payModel: "",
        purchaseTime: "",
        supplierId: "",
        remark: ""
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formIndex: -1,
      operate: 1,
      modalDel: false,
      delLoading: false,
      computeProductCount: 0,
      computeProductMoney: "0.00"
    };
  },
  components: {
    secondModal: secondModal
  },
  mounted() {
    console.log("stock-return-mounted");
    this.init();
  },
  methods: {
    // 初始化一些页面数据
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      this.search();
      this.stockSupplierFindList();
      this.findSizeAndColorList();
    },
    onSearch() {
      this.pageNum = 1;
      this.search();
    },
    // 点击采购记录查询按钮
    search() {
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.searched(Loading);
    },
    searched(Loading) {
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let payModel = this.searchItem.payModel;
      let recordPerson = this.searchItem.recordPerson;
      let purchasePerson = this.searchItem.purchasePerson;
      let purchaseStatus = this.searchItem.purchaseStatus;
      let supplierId = this.searchItem.supplierId;
      let storeCode = this.searchItem.storeCode;
      this.stockPurchaseFind(
        {
          page,
          pageSize,
          payModel,
          recordPerson,
          purchasePerson,
          purchaseStatus,
          supplierId,
          storeCode
        },
        Loading
      );
    },
    // 点击商品查询按钮
    searchGoods() {},
    // 打开新增页面
    add() {
      this.showTitle = "新增采购单";
      this.modalFlag = "add";
      this.showDetail = true;
      this.showModal = true;
    },
    addProduct() {
      this.$refs.refSecondModal.init();
    },
    show(index) {
      this.showTitle = "查看采购单";
      this.modalFlag = "show";
      this.showDetail = false;
      this.formIndex = index;
      this.showReturnDetail();
    },
    edit(index) {
      this.showTitle = "编辑采购单";
      this.modalFlag = "edit";
      this.showDetail = true;
      this.formIndex = index;
      this.showReturnDetail();
    },
    makeSure(index) {
      this.modalFlag = "sure";
      this.formIndex = index;
      this.operate = 1;
      const Loading = this.$myLoading({
        content: "正在更新，请稍后…"
      });
      this.stockPurchaseUpdate(Loading);
    },
    delTableData(index) {
      this.modalDel = true;
      this.formIndex = index;
    },
    async showReturnDetail() {
      let purchasePerson = this.tableData[this.formIndex].purchasePerson;
      let purchaseStatus = this.tableData[this.formIndex].purchaseStatus;
      let recordPerson = this.tableData[this.formIndex].recordPerson;
      let payModel = this.tableData[this.formIndex].payModel;
      let supplierId = this.tableData[this.formIndex].supplierId;
      let remark = this.tableData[this.formIndex].remark;
      let purchaseTime = this.tableData[this.formIndex].purchaseTime;
      this.detailItems = {
        purchasePerson,
        purchaseStatus,
        recordPerson,
        payModel,
        supplierId,
        remark,
        purchaseTime
      };
      let orderNum = this.tableData[this.formIndex].purchaseNo;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.showModal = true;
      const { data, status } = await stockPurchaseDetailList({ orderNum });
      if (data.code == 200 && status == 200) {
        // this.detailData = data.data;
        this.setDetailColorAndSizeCode(data.data,Loading);
      } else {
        this.$Message.error(data.message);
      }
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.search();
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 500);
    },
    getModalData(data) {
      // this.detailData = this.detailData.concat(data);
      this.setDetailColorAndSizeCode(data);
    },
    computeReturnMoney(item, index) {
      item.purchaseMoney = numeral(item.purchasePrice)
        .multiply(item.purchaseNum)
        .format("0.00");
      item.realMoney = numeral(item.purchasePrice)
        .multiply(item.purchaseNum)
        .subtract(item.preferentialMoney)
        .format("0.00");
      this.detailData[index] = item;
      this.computeProductFun();
    },
    changeDetailItem(event, item, key, index) {
      let reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(event)) {
        this.$Message.error({
          content: "请输入数字！",
          onClose: () => {
            item[key] = 0;
            this.detailData[index] = item;
          }
        });
      } else {
        item[key] = numeral(event).value();
        this.computeReturnMoney(item, index);
      }
    },
    changeDetailItems(item, key,index) {
      item[key] = numeral(item[key]).format("0.00");
      this.detailData[index] = item;
    },
    delProduct(index) {
      this.detailData.splice(index, 1);
    },
    changeDate(val1, val2) {
      this.detailItems.purchaseTime = val1;
    },
    checkBeforeSave() {
      let purchasePerson = this.detailItems.purchasePerson;
      let recordPerson = this.detailItems.recordPerson;
      let payModel = this.detailItems.payModel;
      let supplierId = this.detailItems.supplierId;
      let purchaseTime = this.detailItems.purchaseTime;
      let detailList = this.detailData;
      if (!purchasePerson) {
        this.$Message.error("采购人不能为空");
        return false;
      }
      if (!recordPerson) {
        this.$Message.error("记录人不能为空");
        return false;
      }
      if (!purchaseTime) {
        this.$Message.error("采购时间不能为空");
        return false;
      }
      if (!payModel) {
        this.$Message.error("付款方式不能为空");
        return false;
      }
      if (!supplierId) {
        this.$Message.error("供应商不能为空");
        return false;
      }
      if (detailList.length == 0) {
        this.$Message.error("请选择商品明细");
        return false;
      }
      for (let i = 0; i < detailList.length; i++) {
        const item = detailList[i];
        if (item.purchaseNum == 0) {
          this.$Message.error("采购数量不能为0");
          return false;
        }
      }
      return true;
    },
    returnSaveRegular() {
      this.detailItems.purchaseStatus = 2;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存，请稍后…"
        });
        if (this.modalFlag == "add") {
          this.stockPurchaseSave(Loading);
        } else if (this.modalFlag == "edit") {
          this.operate = 2;
          this.stockPurchaseUpdate(Loading);
        }
      }
    },
    returnSaveDraft() {
      this.detailItems.purchaseStatus = 1;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存为草稿，请稍后…"
        });
        if (this.modalFlag == "add") {
          this.stockPurchaseSave(Loading);
        } else if (this.modalFlag == "edit") {
          this.operate = 2;
          this.stockPurchaseUpdate(Loading);
        }
      }
    },
    resetModal() {
      this.detailItems = {
        purchasePerson: "",
        purchaseStatus: "",
        recordPerson: "",
        payModel: "",
        purchaseTime: "",
        supplierId: "",
        remark: ""
      };
      this.detailData = [];
      this.computeProductCount = 0;
      this.computeProductMoney = '0.00';
    },
    closeModal() {
      this.resetModal();
      this.showModal = false;
    },
    async stockPurchaseFind(options, Loading) {
      const { data, status } = await stockPurchaseFindList(options);
      const {
        data: countData,
        status: constStatus
      } = await stockPurchaseFindCount(options);
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
      this.closeLoading(Loading);
    },
    async stockSupplierFindList() {
      console.log("stockSupplierFindList");
      let storeCode = this.storeCode;
      const { data, status } = await stockSupplierFindList({ storeCode });
      if (data.code == 200 && status == 200) {
        const supplierList = [];
        data.data.forEach(item => {
          supplierList.push({
            label: item.supplierName,
            value: item.id
          });
        });
        this.supplierList = supplierList;
      }
    },
    async stockPurchaseSave(Loading) {
      let purchasePerson = this.detailItems.purchasePerson;
      let purchaseStatus = this.detailItems.purchaseStatus;
      let recordPerson = this.detailItems.recordPerson;
      let payModel = this.detailItems.payModel;
      let supplierId = this.detailItems.supplierId;
      let remark = this.detailItems.remark;
      let purchaseTime = this.detailItems.purchaseTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      detailList.forEach(item => {
        item.depotCode = this.detailItems.depotCode;
      });
      const { data, status } = await stockPurchaseSave({
        purchasePerson,
        purchaseStatus,
        recordPerson,
        payModel,
        supplierId,
        remark,
        purchaseTime,
        storeCode,
        detailList
      });
      if (data.code == 200 && status == 200) {
        this.showModal = false;
        this.resetModal();
        this.searched(Loading);
      } else {
        this.$Message.error(data.message);
      }
      this.closeLoading(Loading);
    },
    async stockPurchaseUpdate(Loading) {
      let purchasePerson = this.detailItems.purchasePerson;
      let purchaseStatus = this.detailItems.purchaseStatus;
      let recordPerson = this.detailItems.recordPerson;
      let payModel = this.detailItems.payModel;
      let supplierId = this.detailItems.supplierId;
      let remark = this.detailItems.remark;
      let purchaseTime = this.detailItems.purchaseTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      let purchaseNo = this.tableData[this.formIndex].purchaseNo;
      let operate = this.operate;
      let options = {};
      if (this.operate == "1") {
        options = {
          purchaseNo,
          operate,
          storeCode
        };
      } else if (this.operate == "2") {
        detailList.forEach(item => {
          item.depotCode = this.detailItems.depotCode;
        });
        options = {
          purchaseNo,
          operate,
          purchasePerson,
          purchaseStatus,
          recordPerson,
          payModel,
          supplierId,
          remark,
          purchaseTime,
          storeCode,
          detailList
        };
      }
      const { data, status } = await stockPurchaseUpdate(options);
      if (data.code == 200 && status == 200) {
        this.showModal = false;
        this.resetModal();
        this.searched(Loading);
      } else {
        this.$Message.error(data.message);
      }
      this.closeLoading(Loading);
    },
    async delSure() {
      this.delLoading = true;
      let orderNum = this.tableData[this.formIndex].purchaseNo;
      const { data, status } = await stockPurchaseDeleteOrder({
        orderNum
      });
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.search();
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.delLoading = false;
          this.modalDel = false;
          this.formIndex = -1;
        }, 300);
      } else {
        this.$Message.error(data.message);
      }
    },
    async findSizeAndColorList() {
      let storeCode = this.storeCode;
      const { data: depotData, status: depotStatus } = await findDepotList({
        storeCode
      });
      const { data: classData, status: classStatus } = await findClassList({
        storeCode
      });
      const noVal = {
        label: "无",
        value: ""
      };
      const depotCodeList = [];
      const classCodeList = [];
      depotCodeList.push(noVal);
      classCodeList.push(noVal);
      if (depotData.code == 200 && depotStatus == 200) {
        depotData.data.forEach(item => {
          depotCodeList.push({
            label: item.depotName,
            value: item.depotCode + ""
          });
        });
      }
      if (classData.code == 200 && classStatus == 200) {
        this.classCodeList = classCodeList.concat(classData.data);
      }
      this.depotCodeList = depotCodeList;
    },
    getColorName(colorCodeList,colorCode) {
      let colorName = "无";
      colorCodeList.forEach(item => {
        if (item.value == colorCode) {
          colorName = item.label;
        }
      });
      return colorName;
    },
    getSizeName(sizeCodeList,sizeCode) {
      let sizeName = "无";
      sizeCodeList.forEach(item => {
        if (item.value == sizeCode) {
          sizeName = item.label;
        }
      });
      return sizeName;
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
    computeProductFun() {
      let count = 0;
      let price = numeral(0);
      this.detailData.forEach(item => {
        count += +item.purchaseNum;
        price = price.add(item.realMoney);
      });
      this.computeProductCount = count;
      this.computeProductMoney = price.format("0.00");
      // return count
    },
    changeInSelect(key,value,index) {
      this.detailData[index][key] = value;
    },
    getDetailColorAndSizeCode(classCode) {
      return new Promise((resolve, reject) => {
        findClassColorList({ classCode }).then((classColorCodeRes) => {
          let res = {};
          const noVal = {
            label: "无",
            value: ""
          };
          const sizeCodeList = [];
          const colorCodeList = [];
          colorCodeList.push(noVal);
          sizeCodeList.push(noVal);
          if (classColorCodeRes.status == 200 && classColorCodeRes.data.code == 200) {
            classColorCodeRes.data.data.forEach(item => {
              colorCodeList.push({
                label: item.colorName,
                value: item.colorCode,
                id: item.id
              });
            });
          }
          res.colorCodeList = colorCodeList;
          findClassSizeList({ classCode }).then((classSizeCodeRes) => {
            if (classSizeCodeRes.status == 200 && classSizeCodeRes.data.code == 200) {
              classSizeCodeRes.data.data.forEach(item => {
                sizeCodeList.push({
                  label: item.sizeName,
                  value: item.sizeCode,
                  id: item.id
                });
              });
            }
            res.sizeCodeList = sizeCodeList;
            resolve(res);
          });
        })
      });
    },
    setDetailColorAndSizeCode(data,Loading) {
      let promiseList = [];
      data.forEach(item => {
        promiseList.push(this.getDetailColorAndSizeCode(item.classCode));
      });
      Promise.all(promiseList).then((result) => {
        data.forEach((item,index) => {
          item.sizeCodeList = result[index].sizeCodeList;
          item.colorCodeList = result[index].colorCodeList;
        });
        if (Loading) {
          this.detailData = data;
          this.detailItems.depotCode = this.detailData[0].depotCode || "";
          this.computeProductFun();
          this.closeLoading(Loading);
          this.showModal = true;
        } else {
          this.detailData = this.detailData.concat(data);
        }
      });
    }
  }
};
</script>

<style>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-label-w120 {
  text-align: right;
  line-height: 32px;
  height: 32px;
  width: 100px;
  font-size: 14px;
  padding-right: 10px;
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
