<template>
  <div>
    <Card title="盘点">
      <p class="iview-fontColor">拥有前台收银、结账、变价或优惠等一系列操作权限。</p>
      <div class="content-body">
        <Row>
          <label class="search-label-w120 fl">盘点经手人</label>
          <Col span="8">
            <Input size="large" placeholder="请输入盘点经手人" v-model="searchItem.checkPerson"/>
          </Col>
          <label class="search-label-w120 fl">状态</label>
          <Col span="8">
            <Select v-model="searchItem.checkStatus" size="large" clearable>
              <Option
                v-for="item in checkStatusList"
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
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl"></label>
          <Col span="6">
            <Button type="primary" size="large" @click="onSearch">查询</Button>
          </Col>
        </Row>
        <Divider class="dividerCenter" orientation="left">盘点记录</Divider>
        <Row class="pbtom10">
          <Button type="primary" size="large" icon="md-add" @click="add">新建盘点单</Button>
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
            <div v-if="row.checkStatus==2">
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

    <!-- 弹出层  盘点明细信息  开始 -->
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
            <Col span="3"><span class="search-span span-required">盘点人</span></Col>
            <Col span="5">
              <Input :disabled='!showDetail' size="large" placeholder="请输入盘点人" v-model="detailItems.checkPerson" />
            </Col>
            <Col span="3"><span class="search-span span-required">记录人</span></Col>
            <Col span="5">
              <Input :disabled='!showDetail' size="large" placeholder="请输入记录人" v-model="detailItems.recordPerson" />
            </Col>
            <Col span="3"><span class="search-span span-required">盘点日期</span></Col>
            <Col span="5">
              <DatePicker
                size="large"
                type="datetime"
                placement="bottom-end"
                placeholder="盘点日期"
                :disabled="!showDetail"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                :value="detailItems.checkTime"
                @on-change="changeDate"
              ></DatePicker>
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
          <Divider class="dividerCenter" orientation="left">盘点明细记录</Divider>
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
            <template slot-scope="{ row }" slot="colorCode">
              <div>{{getColorName(row.colorCode)}}</div>
            </template>
            <template slot-scope="{ row }" slot="sizeCode">
              <div>{{getSizeName(row.sizeCode)}}</div>
            </template>
            <template slot-scope="{ row }" slot="stockCheckNum">
              <div v-if='showDetail'>
                <Input :value="row.stockCheckNum" placeholder="盘点库存数量" @input="changeDetailItem($event,row,'stockCheckNum',index)" />
              </div>
              <div v-else>{{row.stockCheckNum}}</div>
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
    <!-- 弹出层  盘点明细信息  结束 -->
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
import tableColumns from "./table/checkColumns";
import detailColumns from "./table/checkdetailColumns";
import secondModal from "./secondModal.vue";
import {
  stockCheckFindList,
  stockCheckFindCount,
  stockCheckSave,
  stockCheckDetailList,
  stockCheckUpdate,
  stockCheckDeleteOrder,
  stockWareHouseList as findDepotList
} from "@/api/stock";
import {
  goodsColorFindListByStoreCode as findColorList,
  productSizeFindList as findSizeCList
} from "@/api/goods";
import numeral from 'numeral';
export default {
  name: 'check',
  data() {
    return {
      storeCode: "",
      types: '3',
      showTitle: "新增盘点单",
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
        checkPerson: "",
        checkStatus: "",
        recordPerson: ""
      },
      checkStatusList: [
        {
          value: 1,
          label: "未处理"
        },
        {
          value: 2,
          label: "已处理"
        }
      ],
      colorCodeList: [],
      sizeCodeList: [],
      depotCodeList: [],
      detailItems: {
        checkPerson: "",
        checkStatus: "",
        recordPerson: "",
        checkTime: '',
        remark: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formIndex: -1,
      operate: 1,
      modalDel: false,
      delLoading: false
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
      this.findSizeAndColorList();
    },
    onSearch() {
      this.pageNum = 1;
      this.search();
    },
    // 点击盘点记录查询按钮
    search() {
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.searched(Loading);
    },
    searched(Loading) {
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let recordPerson = this.searchItem.recordPerson;
      let checkPerson = this.searchItem.checkPerson;
      let checkStatus = this.searchItem.checkStatus;
      let storeCode = this.searchItem.storeCode;
      this.stockCheckFind(
        {
          page,
          pageSize,
          recordPerson,
          checkPerson,
          checkStatus,
          storeCode
        },
        Loading
      );
    },
    // 点击商品查询按钮
    searchGoods() {},
    // 打开新增页面
    add() {
      this.showTitle = "新增盘点单";
      this.modalFlag = 'add';
      this.showDetail = true;
      this.showModal = true;
    },
    addProduct() {
      this.$refs.refSecondModal.init();
    },
    show(index) {
      this.showTitle = "查看盘点单";
      this.modalFlag = 'show';
      this.showDetail = false;
      this.formIndex = index;
      this.showReturnDetail();
    },
    edit(index) {
      this.showTitle = "编辑盘点单";
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
      this.stockCheckUpdate(Loading);
    },
    delTableData(index) {
      this.modalDel = true;
      this.formIndex = index;
    },
    async showReturnDetail() {
      let checkPerson = this.tableData[this.formIndex].checkPerson;
      let checkStatus = this.tableData[this.formIndex].checkStatus;
      let recordPerson = this.tableData[this.formIndex].recordPerson;
      let remark = this.tableData[this.formIndex].remark;
      let checkTime = this.tableData[this.formIndex].checkTime;
      this.detailItems = {
        checkPerson,
        checkStatus,
        recordPerson,
        remark,
        checkTime
      }
      let orderNum = this.tableData[this.formIndex].checkNo;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      const { data,status } = await stockCheckDetailList({ orderNum });
      if (data.code == 200 && status == 200) {
        this.detailData = data.data;
      } else {
        this.$Message.error(data.message);
      }
      this.showModal = true;
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
      item.diffStockNum = numeral(item.stockCheckNum).subtract(item.stockNowNum).value();
      this.detailData[index] = item;
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
        item[key] = numeral(event).value();
        this.computeReturnMoney(item,index);
      }
    },
    delProduct(index) {
      this.detailData.splice(index, 1);
    },
    changeDate(val1,val2) {
      this.detailItems.checkTime = val1;
    },
    checkBeforeSave() {
      let checkPerson = this.detailItems.checkPerson;
      let recordPerson = this.detailItems.recordPerson;
      let checkTime = this.detailItems.checkTime;
      let detailList = this.detailData;
      if (!checkPerson) {
        this.$Message.error('盘点人不能为空');
        return false;
      }
      if (!recordPerson) {
        this.$Message.error('记录人不能为空');
        return false;
      }
      if (!checkTime) {
        this.$Message.error('盘点时间不能为空');
        return false;
      }
      if (detailList.length == 0) {
        this.$Message.error('请选择商品明细');
        return false;
      }
      for (let i = 0; i < detailList.length; i++) {
        const item = detailList[i];
        if (item.stockCheckNum == 0) {
          this.$Message.error('盘点数量不能为0');
          return false;
        }
      }
      return true;
    },
    returnSaveRegular() {
      this.detailItems.checkStatus = 2;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存，请稍后…"
        });
        if (this.modalFlag == 'add') {
          this.stockCheckSave(Loading);
        } else if (this.modalFlag == 'edit') {
          this.operate = 2;
          this.stockCheckUpdate(Loading);
        }
      }
    },
    returnSaveDraft() {
      this.detailItems.checkStatus = 1;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存为草稿，请稍后…"
        });
        if (this.modalFlag == 'add') {
          this.stockCheckSave(Loading);
        } else if (this.modalFlag == 'edit') {
          this.operate = 2;
          this.stockCheckUpdate(Loading);
        }
      }
    },
    resetModal() {
      this.detailItems = {
        checkPerson: "",
        checkStatus: "",
        recordPerson: "",
        checkTime: '',
        remark: ''
      };
      this.detailData = [];
    },
    closeModal() {
      this.resetModal();
      this.showModal = false;
    },
    async stockCheckFind(options, Loading) {
      const { data, status } = await stockCheckFindList(options);
      const {
        data: countData,
        status: constStatus
      } = await stockCheckFindCount(options);
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
    async stockCheckSave(Loading) {
      let checkPerson = this.detailItems.checkPerson;
      let checkStatus = this.detailItems.checkStatus;
      let recordPerson = this.detailItems.recordPerson;
      let remark = this.detailItems.remark;
      let checkTime = this.detailItems.checkTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      const { data,status } = await stockCheckSave({
        checkPerson,
        checkStatus,
        recordPerson,
        remark,
        checkTime,
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
    async stockCheckUpdate(Loading) {
      let checkPerson = this.detailItems.checkPerson;
      let checkStatus = this.detailItems.checkStatus;
      let recordPerson = this.detailItems.recordPerson;
      let remark = this.detailItems.remark;
      let checkTime = this.detailItems.checkTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      let checkNo = this.tableData[this.formIndex].checkNo;
      let operate = this.operate;
      let options = {};
      if (this.operate == '1') {
        options = {
          checkNo,
          operate,
          storeCode
        }
      } else if (this.operate == '2') {
        options = {
          checkNo,
          operate,
          checkPerson,
          checkStatus,
          recordPerson,
          remark,
          checkTime,
          storeCode,
          detailList
        }
      }
      const { data,status } = await stockCheckUpdate(options);
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
      let orderNum = this.tableData[this.formIndex].checkNo;
      const { data,status } = await stockCheckDeleteOrder({
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
    getColorName (colorCode) {
      let colorName = '无';
      this.colorCodeList.forEach(item => {
        if (item.value == colorCode) {
          colorName = item.label;
        }
      });
      return colorName;
    },
    getSizeName (sizeCode) {
      let sizeName = '无';
      this.sizeCodeList.forEach(item => {
        if (item.value == sizeCode) {
          sizeName = item.label;
        }
      });
      return sizeName;
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
