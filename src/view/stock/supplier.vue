<template>
  <div>
    <Card title="供应商详情">
      <div class="content-body">
        <Row>
          <label class="search-label-w120 fl">供应商名称</label>
          <Col span="8">
            <Input size="large" placeholder="请输入供应商名称" v-model="supplierName"/>
          </Col>
          <label class="search-label-w120 fl">供应商手机</label>
          <Col span="8">
            <Input size="large" placeholder="请输入供应商手机" v-model="telNo"/>
          </Col>
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl">供应商简称</label>
          <Col span="8">
            <Input size="large" placeholder="请输入供应商名称" v-model="shortName"/>
          </Col>
          <label class="search-label-w120 fl">状态</label>
          <Col span="8">
            <Select v-model="status" size="large" clearable>
              <Option
                v-for="item in statusList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              ></Option>
            </Select>
          </Col>
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl"></label>
          <Col span="6">
            <Button type="primary" size="large" @click="onSearch">查询</Button>
          </Col>
        </Row>
        <Divider class="dividerCenter" orientation="left">供应商记录</Divider>
        <Row class="pbtom10">
          <Button type="primary" size="large" icon="md-add" @click="add">新建供应商</Button>
        </Row>
        <!-- <Divider class="dividerCenter" orientation="left">盘点记录</Divider> -->
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
            <div>
              <Button
                type="info"
                icon="ios-eye"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
              >查看</Button>
              <Button type="info" icon="md-create" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
              <Button type="error" icon="md-trash" size="small" style="margin-right: 5px" @click="delTableData(index)">删除</Button>
            </div>
          </template>
        </Table>
        <div class="page-box">
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
    <Modal v-model="showModal" :title="title" @on-cancel="closeModal">
      <Form ref="formItem" :model="formItem" :label-width="100" class="form-box">
        <FormItem label="供应商名称" prop="supplierName">
          <Input v-model="formItem.supplierName" :disabled="isShow" placeholder="请输入供应商名称"></Input>
        </FormItem>
        <FormItem label="电话" prop="telNo">
          <Input v-model="formItem.telNo" :disabled="isShow" placeholder="请输入电话"></Input>
        </FormItem>
        <FormItem label="联系人姓名" prop="contactName">
          <Input v-model="formItem.contactName" :disabled="isShow" placeholder="请输入联系人姓名"></Input>
        </FormItem>
        <FormItem label="简称" prop="shortName">
          <Input v-model="formItem.shortName" :disabled="isShow" placeholder="请输入简称"></Input>
        </FormItem>
        <FormItem label="地址 " prop="address">
          <Input v-model="formItem.address" :disabled="isShow" placeholder="请输入地址 "></Input>
        </FormItem>
        <FormItem label="描述" prop="remark">
          <Input
            v-model="formItem.remark"
            type="textarea"
            :disabled="isShow"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入描述信息"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
        <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
      </div>
    </Modal>
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
import tableColumns from "./table/supplierColumns";
import {
  stockSupplierFindList,
  stockSupplierFindCount,
  stockSupplierSave,
  stockSupplierUpdate,
  stockSupplierDelete
} from "@/api/stock";
export default {
  data() {
    return {
      storeCode: "",
      title: "新增供应商",
      showModal: false,
      modalFlag: "add",
      isShow: false,
      tableLoading: false,
      modalDel: false,
      delLoading: false,
      tableColumns: tableColumns,
      tableData: [],
      supplierName: "",
      telNo: "",
      shortName: "",
      status: "",
      statusList: [
        {
          value: 0,
          label: "禁用"
        },
        {
          value: 1,
          label: "正常"
        }
      ],
      formItem: {
        supplierName: "",
        telNo: "",
        contactName: "",
        shortName: "",
        address: "",
        remark: ""
      },
      formIndex: -1,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化一些页面数据
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      this.search();
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
      let supplierName = this.supplierName;
      let telNo = this.telNo;
      let status = this.status;
      let shortName = this.shortName;
      let storeCode = this.storeCode;
      this.stockSupplierFindList(
        {
          page,
          pageSize,
          supplierName,
          telNo,
          status,
          shortName,
          storeCode
        },
        Loading
      );
    },
    // 打开新增页面
    add() {
      this.$refs["formItem"].resetFields();
      this.modalFlag = "add";
      this.title = "添加供应商";
      this.isShow = false;
      this.showModal = true;
    },
    show(index) {
      this.$refs["formItem"].resetFields();
      const item = this.tableData[index];
      this.formItem = Object.assign(this.formItem,item);
      this.modalFlag = "show";
      this.title = "查看供应商";
      this.isShow = true;
      this.showModal = true;
    },
    handleData(formItem) {
      formItem = formItem || this.formItem;
      const item = {
        supplierName: formItem.supplierName,
        telNo: formItem.telNo,
        contactName: formItem.contactName,
        shortName: formItem.shortName,
        address: formItem.address,
        remark: formItem.remark,
        storeCode: formItem.storeCode
      };
      return item;
    },
    async addData() {
      const item = this.handleData();
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const { data, status } = await stockSupplierSave(item);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.searched(Loading);
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 300);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    edit(index) {
      this.$refs["formItem"].resetFields();
      const item = this.tableData[index];
      this.formItem = this.handleData(item);
      this.formIndex = index;
      this.modalFlag = "edit";
      this.title = "编辑供应商";
      this.isShow = false;
      this.showModal = true;
    },
    editData() {
      const item = this.handleData();
      this.stockSupplierUpdate(item);
    },
    async stockSupplierUpdate(option) {
      const options = option;
      options.id = this.tableData[this.formIndex].id;
      const Loading = this.$myLoading({
        content: this.modalDel ? "正在删除，请稍后…" : "正在修改，请稍后…"
      });
      const { data, status } = await stockSupplierUpdate(options);
      if (data.code == 200 && status == 200) {
        if (this.modalDel) {
          this.pageNum = 1;
          this.searched(Loading);
        } else {
          console.log(1234);
          this.tableData[this.formIndex] = Object.assign(this.tableData[this.formIndex],options);
        }
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 300);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    delTableData(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    async delSure() {
      this.delLoading = true;
      let id = this.tableData[this.formIndex].id;
      const { data, status } = await stockSupplierDelete(id);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.search();
        this.delLoading = false;
        this.modalDel = false;
        this.formIndex = -1;
      } else {
        this.$Message.error(data.message);
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addData();
          } else if (this.modalFlag == "edit") {
            this.editData();
          } else if (this.modalFlag == "show") {
            this.closeModal();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      this.showModal = false;
      this.modalDel = false;
      this.delLoading = false;
    },
    closeModal() {
      this.handleReset("formItem");
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
    async stockSupplierFindList(options, Loading) {
      const { data, status } = await stockSupplierFindList(options);
      const {
        data: countData,
        status: constStatus
      } = await stockSupplierFindCount(options);
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
</style>
