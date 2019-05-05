<template>
  <div>
    <Card title="退货">
      <p class="iview-fontColor">将退货的原料录入系统，自动记录库存，请仔细核对。。</p>
      <div class="content-body">
        <Row>
          <label class="search-label-w120 fl">采退经手人</label>
          <Col span="8">
            <Input size="large" placeholder="请输入采退经手人" v-model="searchItem.returnPerson"/>
          </Col>
          <label class="search-label-w120 fl">状态</label>
          <Col span="8">
            <Select v-model="searchItem.returnStatus" size="large" clearable>
              <Option
                v-for="item in returnStatusList"
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
        <Divider class="dividerCenter" orientation="left">退货记录</Divider>
        <Row class="pbtom10">
          <Button type="primary" size="large" icon="md-add" @click="add">新建退货单</Button>
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
            <div v-if="row.returnStatus==2">
              <Button
                type="info"
                icon="ios-eye"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
              >查看</Button>
            </div>
            <div v-else>
              <Button type="info" icon="md-create" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
              <Button type="info" icon="md-returnmark" size="small" style="margin-right: 5px" @click="makeSure(index)" >确认</Button>
              <Button type="error" icon="md-trash" size="small" style="margin-right: 5px" @click="delTableData(index)">删除</Button>
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

    <!-- 弹出层  退货明细信息  开始 -->
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
            <Col span="3"><span class="search-span span-required">退货人</span></Col>
            <Col span="5">
              <Input :disabled='!showDetail' size="large" placeholder="请输入退货人" v-model="detailItems.returnPerson" />
            </Col>
            <Col span="3"><span class="search-span span-required">记录人</span></Col>
            <Col span="5">
              <Input :disabled='!showDetail' size="large" placeholder="请输入记录人" v-model="detailItems.recordPerson" />
            </Col>
            <Col span="3"><span class="search-span span-required">退货日期</span></Col>
            <Col span="5">
              <DatePicker
                size="large"
                type="datetime"
                placement="bottom-end"
                placeholder="退货日期"
                :disabled="!showDetail"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                :value="detailItems.returnTime"
                @on-change="changeDate"
              ></DatePicker>
            </Col>
          </Row>
          <Row class="ptop20">
            <Col span="3"><span class="search-span span-required">付款方式</span></Col>
            <Col span="5">
              <Select :disabled='!showDetail' v-model="detailItems.payModel" size="large" clearable>
                <Option
                  v-for="item in payModelList"
                  :value="item.value"
                  :key="item.key"
                  :label="item.label"
                ></Option>
              </Select>
            </Col>
            <Col span="3"><span class="search-span span-required">供应商</span></Col>
            <Col span="5">
              <Select :disabled='!showDetail' v-model="detailItems.supplierId" size="large" filterable>
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
            <Col span="3"><span class="search-span">备注</span></Col>
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
          <Divider class="dividerCenter" orientation="left">退货明细记录</Divider>
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
            <template slot-scope="{ row }" slot="depotCode">
              <div>{{getDepotName(row.depotCode)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="returnNum">
              <div v-if='showDetail'>
                <Input :value="row.returnNum" placeholder="退货数量" @input="changeDetailItem($event,row,'returnNum',index)" />
              </div>
              <div v-else>{{row.returnNum}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="returnPrice">
              <div v-if='showDetail'>
                <Input :value="row.returnPrice" placeholder="退货单价" @input="changeDetailItem($event,row,'returnPrice',index)" />
              </div>
              <div v-else>{{row.returnPrice}}</div>
            </template>
            <template slot-scope="{ row }" slot="returnMoney">
              <div v-if='showDetail'>
                <Input v-model="row.returnMoney" placeholder="应付金额"/>
              </div>
              <div v-else>{{row.returnMoney}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="preferentialMoney">
              <div v-if='showDetail'>
                <Input :value="row.preferentialMoney" placeholder="优惠金额" @on-blur="changeDetailItems(row,'preferentialMoney',index)" @input="changeDetailItem($event,row,'preferentialMoney',index)" />
              </div>
              <div v-else>{{row.preferentialMoney}}</div>
            </template>
            <template slot-scope="{ row }" slot="detailRemark">
              <div v-if='showDetail'>
                <Input v-model="row.detailRemark" placeholder="明细备注" />
              </div>
              <div v-else>{{row.detailRemark}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="detailaction">
              <div v-if='showDetail'>
                <Button type="error" icon="md-trash" size="small" style="margin-right: 5px" @click="delProduct(index)">删除</Button>
              </div>
              <div v-else>无</div>
            </template>
          </Table>
          <div class="total-box">
            <div class="total-title">合计</div>
            <div class="total-info">
              <p>数量合计：<span>{{computeProductCount}}</span></p>
              <p>金额合计：<span>{{computeProductMoney}}</span></p>
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
    <!-- 弹出层  退货明细信息  结束 -->
    <!-- 弹出层  商品信息  开始 -->
    <second-modal ref="refSecondModal" :types='types'  @getdata='getModalData'></second-modal>
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
import tableColumns from "./table/returnColumns";
import detailColumns from "./table/returnDetailColumns";
import secondModal from "./secondModal.vue";
import {
  stockReturnFindList,
  stockReturnFindCount,
  stockSupplierFindList,
  stockReturnSave,
  stockReturnDetailList,
  stockReturnUpdate,
  stockReturnDeleteOrder,
  stockWareHouseList as findDepotList
} from "@/api/stock";
import numeral from 'numeral';
export default {
  name: 'return',
  data() {
    return {
      storeCode: "",
      types: '2',
      showTitle: "新增退货单",
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
        returnPerson: "",
        returnStatus: "",
        recordPerson: "",
        payModel: "",
        supplierId: ""
      },
      returnStatusList: [
        {
          value: 1,
          label: "未出库"
        },
        {
          value: 2,
          label: "已出库"
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
      depotCodeList: [],
      detailItems: {
        returnPerson: "",
        returnStatus: "",
        recordPerson: "",
        payModel: "",
        returnTime: '',
        supplierId: "",
        remark: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formIndex: -1,
      operate: 1,
      modalDel: false,
      delLoading: false,
      computeProductCount: 0,
      computeProductMoney: '0.00'
    };
  },
  components: {
    'secondModal': secondModal
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
    // 点击退货记录查询按钮
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
      let returnPerson = this.searchItem.returnPerson;
      let returnStatus = this.searchItem.returnStatus;
      let supplierId = this.searchItem.supplierId;
      let storeCode = this.searchItem.storeCode;
      this.stockReturnFind(
        {
          page,
          pageSize,
          payModel,
          recordPerson,
          returnPerson,
          returnStatus,
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
      this.showTitle = "新增退货单";
      this.modalFlag = 'add';
      this.showModal = true;
      this.showDetail = true;
    },
    addProduct() {
      this.$refs.refSecondModal.init();
    },
    show(index) {
      this.showTitle = "查看退货单";
      this.modalFlag = 'show';
      this.showDetail = false;
      this.formIndex = index;
      this.showReturnDetail();
    },
    edit(index) {
      this.showTitle = "编辑退货单";
      this.modalFlag = 'edit';
      this.showDetail = true;
      this.formIndex = index;
      this.showReturnDetail();
    },
    makeSure(index) {
      this.modalFlag = 'sure';
      this.formIndex = index;
      this.operate = 1;
      const Loading = this.$myLoading({
        content: "正在更新，请稍后…"
      });
      this.stockReturnUpdate(Loading);
    },
    delTableData(index) {
      this.modalDel = true;
      this.formIndex = index;
    },
    async showReturnDetail() {
      let returnPerson = this.tableData[this.formIndex].returnPerson;
      let returnStatus = this.tableData[this.formIndex].returnStatus;
      let recordPerson = this.tableData[this.formIndex].recordPerson;
      let payModel = this.tableData[this.formIndex].payModel;
      let supplierId = this.tableData[this.formIndex].supplierId;
      let remark = this.tableData[this.formIndex].remark;
      let returnTime = this.tableData[this.formIndex].returnTime;
      this.detailItems = {
        returnPerson,
        returnStatus,
        recordPerson,
        payModel,
        supplierId,
        remark,
        returnTime
      }
      let orderNum = this.tableData[this.formIndex].returnNo;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.showModal = true;
      const { data,status } = await stockReturnDetailList({ orderNum });
      if (data.code == 200 && status == 200) {
        this.detailData = data.data;
        this.computeProductFun();
      } else {
        this.$Message.error(data.message);
      }
      this.closeLoading(Loading);
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
      this.detailData = this.detailData.concat(data);
    },
    computeReturnMoney(item,index) {
      item.returnMoney = numeral(+item.returnPrice).multiply(+item.returnNum).format('0.00');
      item.realMoney = numeral(+item.returnPrice).multiply(+item.returnNum).subtract(+item.preferentialMoney).format('0.00')
      this.detailData[index] = item;
      this.computeProductFun();
    },
    changeDetailItem(event,item,key,index) {
      let reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(event)) {
        this.$Message.error({
          content: '请输入数字！',
          onClose: () => {
            item[key] = 0;
            this.detailData[index] = item;
          }
        });
      } else {
        item[key] = numeral(+event).value();
        this.computeReturnMoney(item,index);
      }
    },
    changeDetailItems(item,key,index) {
      item[key] = numeral(+item[key]).format('0.00');
      this.detailData[index] = item;
    },
    delProduct(index) {
      this.detailData.splice(index, 1);
    },
    changeDate(val1,val2) {
      this.detailItems.returnTime = val1;
    },
    checkBeforeSave() {
      let returnPerson = this.detailItems.returnPerson;
      let recordPerson = this.detailItems.recordPerson;
      let payModel = this.detailItems.payModel;
      let supplierId = this.detailItems.supplierId;
      let returnTime = this.detailItems.returnTime;
      let detailList = this.detailData;
      if (!returnPerson) {
        this.$Message.error('退货人不能为空');
        return false;
      }
      if (!recordPerson) {
        this.$Message.error('记录人不能为空');
        return false;
      }
      if (!returnTime) {
        this.$Message.error('退货时间不能为空');
        return false;
      }
      if (!payModel) {
        this.$Message.error('付款方式不能为空');
        return false;
      }
      if (!supplierId) {
        this.$Message.error('供应商不能为空');
        return false;
      }
      if (detailList.length == 0) {
        this.$Message.error('请选择商品明细');
        return false;
      }
      for (let i = 0; i < detailList.length; i++) {
        const item = detailList[i];
        if (item.returnNum == 0) {
          this.$Message.error('退货数量不能为0');
          return false;
        }
      }
      return true;
    },
    returnSaveRegular() {
      this.detailItems.returnStatus = 2;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存，请稍后…"
        });
        if (this.modalFlag == 'add') {
          this.stockReturnSave(Loading);
        } else if (this.modalFlag == 'edit') {
          this.operate = 2;
          this.stockReturnUpdate(Loading);
        }
      }
    },
    returnSaveDraft() {
      this.detailItems.returnStatus = 1;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存为草稿，请稍后…"
        });
        if (this.modalFlag == 'add') {
          this.stockReturnSave(Loading);
        } else if (this.modalFlag == 'edit') {
          this.operate = 2;
          this.stockReturnUpdate(Loading);
        }
      }
    },
    resetModal() {
      this.detailItems = {
        returnPerson: "",
        returnStatus: "",
        recordPerson: "",
        payModel: "",
        returnTime: '',
        supplierId: "",
        remark: ''
      };
      this.detailData = [];
      this.computeProductCount = 0;
      this.computeProductMoney = '0.00';
    },
    closeModal() {
      this.resetModal();
      this.showModal = false;
    },
    async stockReturnFind(options, Loading) {
      const { data, status } = await stockReturnFindList(options);
      const {
        data: countData,
        status: constStatus
      } = await stockReturnFindCount(options);
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
    async stockReturnSave(Loading) {
      let returnPerson = this.detailItems.returnPerson;
      let returnStatus = this.detailItems.returnStatus;
      let recordPerson = this.detailItems.recordPerson;
      let payModel = this.detailItems.payModel;
      let supplierId = this.detailItems.supplierId;
      let remark = this.detailItems.remark;
      let returnTime = this.detailItems.returnTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      const { data,status } = await stockReturnSave({
        returnPerson,
        returnStatus,
        recordPerson,
        payModel,
        supplierId,
        remark,
        returnTime,
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
    async stockReturnUpdate(Loading) {
      let returnPerson = this.detailItems.returnPerson;
      let returnStatus = this.detailItems.returnStatus;
      let recordPerson = this.detailItems.recordPerson;
      let payModel = this.detailItems.payModel;
      let supplierId = this.detailItems.supplierId;
      let remark = this.detailItems.remark;
      let returnTime = this.detailItems.returnTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      let returnNo = this.tableData[this.formIndex].returnNo;
      let operate = this.operate;
      let options = {};
      if (this.operate == '1') {
        options = {
          returnNo,
          operate,
          storeCode
        }
      } else if (this.operate == '2') {
        options = {
          returnNo,
          operate,
          returnPerson,
          returnStatus,
          recordPerson,
          payModel,
          supplierId,
          remark,
          returnTime,
          storeCode,
          detailList
        }
      }
      const { data,status } = await stockReturnUpdate(options);
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
      let orderNum = this.tableData[this.formIndex].returnNo;
      const { data,status } = await stockReturnDeleteOrder({
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
    computeProductFun() {
      let count = 0;
      let price = numeral(0);
      this.detailData.forEach(item => {
        count += +item.returnNum;
        price = price.add(item.realMoney);
      });
      this.computeProductCount = count;
      this.computeProductMoney = price.format('0.00');
    },
    async findSizeAndColorList() {
      let storeCode = this.storeCode;
      const { data: depotData, status: depotStatus } = await findDepotList({
        storeCode
      });
      const noVal = {
        label: "无",
        value: ""
      };
      const depotCodeList = [];
      depotCodeList.push(noVal);
      if (depotData.code == 200 && depotStatus == 200) {
        depotData.data.forEach(item => {
          depotCodeList.push({
            label: item.depotName,
            value: item.depotCode + ""
          });
        });
      }
      this.depotCodeList = depotCodeList;
    },
    getDepotName (depotCode) {
      let depotName = '无';
      this.depotCodeList.forEach(item => {
        if (item.value == depotCode) {
          depotName = item.label;
        }
      });
      return depotName;
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
