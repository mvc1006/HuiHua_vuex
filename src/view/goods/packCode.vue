<template>
  <div class="content-box">
    <Card title="包装条码设置">
      <p class="iview-fontColor">用于包装条码设置。</p>
      <div class="content-body">
        <Row>
          <span>快速查询：</span>
          <Input v-model="fastQuery" placeholder="请输入商品名称、条码" size="large" style="width: 300px"></Input>
          <Button type="primary" style="margin-left:20px;" size="large" @click="quickSearch">查询</Button>
        </Row>
        <Row class="ptop20"></Row>
        <Table
          class="table-all-width mtop15"
          border
          :loading="loading"
          :columns="tableColumns"
          :data="tableData"
        >
          <template slot-scope="{ row, index }" slot="actions">
            <div>
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="add(index)"
              >新增</Button>
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="edit(index)"
                v-if="row.id"
              >修改</Button>
              <Button
                v-if="row.id"
                type="error"
                icon="md-trash"
                size="small"
                @click="delTableData(index)"
              >删除</Button>
            </div>
          </template>
        </Table>
        <div class="page-box" v-if="true">
          <Page
            :total="total"
            :page-size="pageSize"
            show-sizer
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          />
        </div>
      </div>
    </Card>
    <Modal v-model="showModal" :title="title" @on-cancel="closeModal" class="modal-body-scroll">
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="formRules" class="form-box">
        <FormItem label="商品名称" prop="productName" class="form-box-item">
          <Input v-model="formItem.productName" :disabled="true"></Input>
        </FormItem>
        <FormItem label="包装条码" prop="packBarcode" class="form-box-item">
          <Input v-model="formItem.packBarcode" placeholder="请输入包装条码"></Input>
        </FormItem>
        <FormItem label="包装价格" prop="packPrice" class="form-box-item">
          <Input v-model="formItem.packPrice" placeholder="请输入包装价格"></Input>
        </FormItem>
        <FormItem label="包装单位" prop="packUnit" class="form-box-item">
          <Input v-model="formItem.packUnit" placeholder="请输入包装单位"></Input>
        </FormItem>
        <FormItem label="商品数量" prop="productNumber" class="form-box-item">
          <Input v-model="formItem.productNumber" placeholder="请输入商品数量"></Input>
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
import {
  productPackFindPage,
  productPackSave,
  productPackUpdate,
  productPackDelete
} from "@/api/product";
export default {
  name: "packCode",
  data() {
    return {
      storeCode: "",
      loading: false,
      title: "添加包装条码",
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          minWidth: 60,
          align: "center",
          className: "td-index"
        },
        {
          title: "商品名称",
          key: "productName",
          align: "center"
        },
        {
          title: "包装条码",
          key: "packBarcode",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.packBarcode ? params.row.packBarcode : "未设置"
              )
            ]);
          }
        },
        {
          title: "包装价格",
          key: "packPrice",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.packPrice ? params.row.packPrice : "未设置")
            ]);
          }
        },
        {
          title: "包装单位",
          key: "packUnit",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.packUnit ? params.row.packUnit : "未设置")
            ]);
          }
        },
        {
          title: "包含的商品数量 ",
          key: "productNumber",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.productNumber ? params.row.productNumber : "未设置"
              )
            ]);
          }
        },
        {
          title: "操作",
          slot: "actions",
          align: "center",
          width: 200,
          minWidth: 200,
          className: "td-index"
        }
      ],
      tableData: [],
      showModal: false,
      formItem: {
        productName: "",
        productCode: "",
        packBarcode: "",
        packPrice: "",
        packUnit: "",
        productNumber: ""
      },
      formRules: {
        packBarcode: [
          { required: true, validator: this.packBarcodeCheck, trigger: "blur" }
        ],
        packUnit: { required: true, message: "包装单位不能为空" },
        packPrice: [
          { required: true, validator: this.numberCheck, trigger: "blur" }
        ],
        productNumber: [
          { required: true, validator: this.numberCheck, trigger: "blur" }
        ]
      },
      productCodeList: [],
      modalFlag: "add",
      fastQuery: "",
      formIndex: -1,
      isShow: false,
      modalDel: false,
      delLoading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.productPackFindPage(Loading);
    },
    numberCheck(rule, value, callback) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("请填写数字"));
      } else {
        if (value < 0) {
          callback(new Error("不能小于零"));
        } else {
          callback();
        }
      }
    },
    packBarcodeCheck(rule, value, callback) {
      let reg = /^[0-9a-zA-Z]*$/g;
      if (value === "") {
        callback(new Error("包装条码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("包装条码只能是数字或字母组合"));
      } else {
        if (value.length == 6) {
          callback(new Error("包装条码位数不正确"));
        } else {
          callback();
        }
      }
    },
    quickSearch() {
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.productPackFindPage(Loading);
    },
    resetFormItem() {
      this.formItem = {
        productCode: "",
        packBarcode: "",
        packPrice: "",
        packUnit: "",
        productNumber: ""
      };
    },
    add(index) {
      this.$refs["formItem"].resetFields();
      this.formIndex = index;
      this.modalFlag = "add";
      this.title = "添加包装条码";
      this.resetFormItem();
      this.formItem.productName = this.tableData[index].productName;
      this.formItem.productCode = this.tableData[index].productCode;
      this.showModal = true;
    },
    addData() {
      this.productPackSave();
    },
    edit(index) {
      console.log("packCode-edit");
      this.$refs["formItem"].resetFields();
      this.formIndex = index;
      this.modalFlag = "edit";
      this.title = "编辑包装条码";
      this.setFormItem();
      this.showModal = true;
    },
    editData() {
      this.productPackUpdate(this.formItem);
    },
    setFormItem() {
      const item = this.tableData[this.formIndex];
      this.formItem.productName = item.productName;
      this.formItem.productCode = item.productCode;
      this.formItem.packBarcode = item.packBarcode;
      this.formItem.packPrice = item.packPrice;
      this.formItem.packUnit = item.packUnit;
      this.formItem.productNumber = item.productNumber;
    },
    async productPackSave() {
      const item = this.formItem;
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const { data, status } = await productPackSave(item);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.productPackFindPage(Loading);
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
    async productPackUpdate(option) {
      const options = Object.assign(this.tableData[this.formIndex], option);
      const Loading = this.$myLoading({
        content: "正在修改，请稍后…"
      });
      const { data, status } = await productPackUpdate(options);
      if (data.code == 200 && status == 200) {
        this.tableData[this.formIndex] = options;
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
    closeModal() {
      console.log("packCode-closeModal");
      this.handleReset("formItem");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addData();
          } else if (this.modalFlag == "edit") {
            this.editData();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      this.showModal = false;
    },
    delTableData(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    async delSure() {
      console.log("delSure");
      this.delLoading = true;
      let id = this.tableData[this.formIndex].id;
      const { data, status } = await productPackDelete({ id });
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.productPackFindPage();
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
    async productPackFindPage(Loading) {
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      let fastQuery = this.fastQuery;
      const { data, status } = await productPackFindPage({
        page,
        pageSize,
        storeCode,
        fastQuery
      });
      if (data.code == 200 && status == 200) {
        // console.log(data.data.list);
        this.tableData = data.data.list;
        this.total = data.data.total;
      }
      this.closeLoading(Loading);
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.productPackFindPage();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.productPackFindPage();
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 500);
    }
  },
  mounted() {
    console.log("packCode-mounted");
    this.init();
  }
};
</script>

<style scoped src='./index.css'>
</style>
