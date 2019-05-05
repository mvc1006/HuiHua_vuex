<template>
  <div>
    <Card title="领用">
      <p class="iview-fontColor">领用录入当前库存信息。</p>
      <div class="content-body">
        <Row>
          <label class="search-label-w120 fl">领用人</label>
          <Col span="8">
            <Input size="large" placeholder="请输入领用人" v-model="searchItem.drawPerson"/>
          </Col>
          <label class="search-label-w120 fl">状态</label>
          <Col span="8">
            <Select v-model="searchItem.drawStatus" size="large" clearable>
              <Option
                v-for="item in drawStatusList"
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
        <Divider class="dividerCenter" orientation="left">领用记录</Divider>
        <Row class="pbtom10">
          <Button type="primary" size="large" icon="md-add" @click="add">新建领用单</Button>
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
            <div v-if="row.drawStatus==2">
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

    <!-- 弹出层  领用明细信息  开始 -->
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
            <Col span="3"><span class="search-span span-required">领用人</span></Col>
            <Col span="5">
              <Input :disabled='!showDetail' size="large" placeholder="请输入领用人" v-model="returnDetailItem.drawPerson" />
            </Col>
            <Col span="3"><span class="search-span span-required">记录人</span></Col>
            <Col span="5">
              <Input :disabled='!showDetail' size="large" placeholder="请输入记录人" v-model="returnDetailItem.recordPerson" />
            </Col>
            <Col span="3"><span class="search-span span-required">领用日期</span></Col>
            <Col span="5">
              <DatePicker
                size="large"
                type="datetime"
                placement="bottom-end"
                placeholder="领用日期"
                :disabled="!showDetail"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                :value="returnDetailItem.drawTime"
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
                 v-model="returnDetailItem.remark"
                placeholder="请输入备注信息"
              />
            </Col>
          </Row>
          <Divider class="dividerCenter" orientation="left">领用明细记录</Divider>
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
            <template slot-scope="{ row, index }" slot="drawNum">
              <div v-if='showDetail'>
                <Input :value="row.drawNum" placeholder="领用库存数量" @input="changeDetailItem($event,row,'drawNum',index)" />
              </div>
              <div v-else>{{row.drawNum}}</div>
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
    <!-- 弹出层  领用明细信息  结束 -->
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
import tableColumns from "./table/collarColumns";
import detailColumns from "./table/collarDetailColumns";
import secondModal from "./secondModal.vue";
import {
  stockDrawFindList,
  stockDrawFindCount,
  stockDrawSave,
  stockDrawDetailList,
  stockDrawUpdate,
  stockDrawDeleteOrder,
  stockWareHouseList as findDepotList
} from "@/api/stock";
import {
  goodsColorFindListByStoreCode as findColorList,
  productSizeFindList as findSizeCList
} from "@/api/goods";
import numeral from 'numeral';
export default {
  name: 'draw',
  data() {
    return {
      storeCode: "",
      types: '4',
      showTitle: "新增领用单",
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
        drawPerson: "",
        drawStatus: "",
        recordPerson: ""
      },
      drawStatusList: [
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
      returnDetailItem: {
        drawPerson: "",
        drawStatus: "",
        recordPerson: "",
        drawTime: '',
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
    // 点击领用记录查询按钮
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
      let drawPerson = this.searchItem.drawPerson;
      let drawStatus = this.searchItem.drawStatus;
      let storeCode = this.searchItem.storeCode;
      this.stockDrawFind(
        {
          page,
          pageSize,
          recordPerson,
          drawPerson,
          drawStatus,
          storeCode
        },
        Loading
      );
    },
    // 点击商品查询按钮
    searchGoods() {},
    // 打开新增页面
    add() {
      this.showTitle = "新增领用单";
      this.modalFlag = 'add';
      this.showDetail = true;
      this.showModal = true;
    },
    addProduct() {
      this.$refs.refSecondModal.init();
    },
    show(index) {
      this.showTitle = "查看领用单";
      this.modalFlag = 'show';
      this.showDetail = false;
      this.formIndex = index;
      this.showReturnDetail();
    },
    edit(index) {
      this.showTitle = "编辑领用单";
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
      this.stockDrawUpdate(Loading);
    },
    delTableData(index) {
      this.modalDel = true;
      this.formIndex = index;
    },
    async showReturnDetail() {
      let drawPerson = this.tableData[this.formIndex].drawPerson;
      let drawStatus = this.tableData[this.formIndex].drawStatus;
      let recordPerson = this.tableData[this.formIndex].recordPerson;
      let remark = this.tableData[this.formIndex].remark;
      let drawTime = this.tableData[this.formIndex].drawTime;
      this.returnDetailItem = {
        drawPerson,
        drawStatus,
        recordPerson,
        remark,
        drawTime
      }
      let orderNum = this.tableData[this.formIndex].drawNo;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      const { data,status } = await stockDrawDetailList({ orderNum });
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
        this.detailData[index] = item;
      }
    },
    delProduct(index) {
      this.detailData.splice(index, 1);
    },
    changeDate(val1,val2) {
      this.returnDetailItem.drawTime = val1;
    },
    checkBeforeSave() {
      let drawPerson = this.returnDetailItem.drawPerson;
      let recordPerson = this.returnDetailItem.recordPerson;
      let drawTime = this.returnDetailItem.drawTime;
      let detailList = this.detailData;
      if (!drawPerson) {
        this.$Message.error('领用人不能为空');
        return false;
      }
      if (!recordPerson) {
        this.$Message.error('记录人不能为空');
        return false;
      }
      if (!drawTime) {
        this.$Message.error('领用时间不能为空');
        return false;
      }
      if (detailList.length == 0) {
        this.$Message.error('请选择商品明细');
        return false;
      }
      for (let i = 0; i < detailList.length; i++) {
        const item = detailList[i];
        if (item.drawNum == 0) {
          this.$Message.error('领用数量不能为0');
          return false;
        }
      }
      return true;
    },
    returnSaveRegular() {
      this.returnDetailItem.drawStatus = 2;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存，请稍后…"
        });
        if (this.modalFlag == 'add') {
          this.stockDrawSave(Loading);
        } else if (this.modalFlag == 'edit') {
          this.operate = 2;
          this.stockDrawUpdate(Loading);
        }
      }
    },
    returnSaveDraft() {
      this.returnDetailItem.drawStatus = 1;
      if (this.checkBeforeSave()) {
        const Loading = this.$myLoading({
          content: "正在保存为草稿，请稍后…"
        });
        if (this.modalFlag == 'add') {
          this.stockDrawSave(Loading);
        } else if (this.modalFlag == 'edit') {
          this.operate = 2;
          this.stockDrawUpdate(Loading);
        }
      }
    },
    resetModal() {
      this.returnDetailItem = {
        drawPerson: "",
        drawStatus: "",
        recordPerson: "",
        drawTime: '',
        remark: ''
      };
      this.detailData = [];
    },
    closeModal() {
      this.resetModal();
      this.showModal = false;
    },
    async stockDrawFind(options, Loading) {
      const { data, status } = await stockDrawFindList(options);
      const {
        data: countData,
        status: constStatus
      } = await stockDrawFindCount(options);
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
    async stockDrawSave(Loading) {
      let drawPerson = this.returnDetailItem.drawPerson;
      let drawStatus = this.returnDetailItem.drawStatus;
      let recordPerson = this.returnDetailItem.recordPerson;
      let remark = this.returnDetailItem.remark;
      let drawTime = this.returnDetailItem.drawTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      const { data,status } = await stockDrawSave({
        drawPerson,
        drawStatus,
        recordPerson,
        remark,
        drawTime,
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
    async stockDrawUpdate(Loading) {
      let drawPerson = this.returnDetailItem.drawPerson;
      let drawStatus = this.returnDetailItem.drawStatus;
      let recordPerson = this.returnDetailItem.recordPerson;
      let remark = this.returnDetailItem.remark;
      let drawTime = this.returnDetailItem.drawTime;
      let storeCode = this.storeCode;
      let detailList = this.detailData;
      let drawNo = this.tableData[this.formIndex].drawNo;
      let operate = this.operate;
      let options = {};
      if (this.operate == '1') {
        options = {
          drawNo,
          operate,
          storeCode
        }
      } else if (this.operate == '2') {
        options = {
          drawNo,
          operate,
          drawPerson,
          drawStatus,
          recordPerson,
          remark,
          drawTime,
          storeCode,
          detailList
        }
      }
      const { data,status } = await stockDrawUpdate(options);
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
      let orderNum = this.tableData[this.formIndex].drawNo;
      const { data,status } = await stockDrawDeleteOrder({
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
