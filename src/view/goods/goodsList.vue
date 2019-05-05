<template>
  <div class="content-box">
    <Card title="商品列表设置" style="min-height:100%">
      <Layout class="class-layout">
        <Sider
          hide-trigger
          collapsible
          :width="256"
          :collapsed-width="64"
          v-model="collapsed"
          class="left-sider"
        >
          <div class="ivu-left-list" v-if="false">
            <Select v-model="className" class="class-select" @on-change="changeselect">
              <Option
                v-for="item in ClassList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="iu-tree1">
            <Tree :data="treeListData" ref="tree" @on-select-change="selectChange"></Tree>
          </div>
        </Sider>
        <Layout>
          <Content class="goods-content-con">
            <div class="iu-table-div">
              <div class="operTime">
                <span>快速查询：</span>
                <Input
                  v-model="fastQuery"
                  placeholder="请输入商品名称、编号"
                  size="large"
                  style="width: 300px"
                ></Input>
                <Button type="primary" size="large" @click="quickSearch">查询</Button>
              </div>

              <!-- <Row style="padding-top:10px">
                <Button icon="ios-search" type="primary" size="large">查询</Button>
              </Row>-->
              <div style="padding-top:20px">
                <ButtonGroup>
                  <Button icon="md-add" @click="add" type="primary">增加</Button>
                  <Button icon="ios-eye" @click="show" type="info">查看</Button>
                  <Button icon="md-trash" @click="deleted" type="error">删除</Button>
                  <Button icon="md-create" @click="edit()" type="warning">修改</Button>
                  <Upload
                    :show-upload-list="false"
                    :headers="headers"
                    :action="actionUrl"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccessUpload"
                    :on-error="handleErrorUpload"
                    class="fl"
                  >
                    <Button icon="md-log-in" type="primary">导入</Button>
                  </Upload>
                  <Button icon="md-log-out" type="primary" @click="productExportExcel">导出</Button>
                  <Button icon="md-download" type="primary" @click="productTmplDownload">下载导入模板</Button>
                </ButtonGroup>
              </div>

              <Table
                class="table-all-width"
                :columns="tableColumns"
                :data="tableData"
                :stripe="true"
                :border="true"
                @on-select="selectTable"
                @on-select-cancel="selectTableCancel"
                @on-select-all="selectTableAll"
                @on-select-all-cancel="selectTableAllCancel"
              ></Table>
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

            <Modal
              class="formTop"
              v-model="showAdd"
              :title="showTitle"
              @on-cancel="closeModal"
              width="70%"
            >
              <Form
                ref="formItem"
                :model="formItem"
                :label-width="80"
                :rules="formRules"
                class="form-box"
              >
                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="门店编号" prop="storeCode">
                      <Input v-model="formItem.storeCode" :disabled="true" placeholder="请输入门店编号"/>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商品编号" prop="productCode">
                      <Input
                        v-model="formItem.productCode"
                        :disabled="true"
                        :placeholder="(modalFlag=='add')?'系统自动生成':'请输入商品编号'"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商品名称" prop="productName">
                      <Input
                        v-model="formItem.productName"
                        :disabled="isShow"
                        placeholder="请输入商品名称"
                      />
                    </FormItem>
                  </Col>
                </Row>

                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="商品库房" prop="depotCode">
                      <Select v-model="formItem.depotCode" :disabled="isShow" filterable>
                        <Option
                          v-for="item in depotCode"
                          :value="item.value"
                          :key="item.label+item.value"
                        >{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商品单位" prop="productUnit">
                      <Input
                        v-model="formItem.productUnit"
                        :disabled="isShow"
                        placeholder="请输入商品单位"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商品条码" prop="productBarcode">
                      <Input
                        v-model="formItem.productBarcode"
                        :disabled="isShow"
                        placeholder="请输入商品条码"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="库存预警" prop="stockAlarm">
                      <Select
                        v-model="formItem.stockAlarm"
                        :disabled="isShow"
                        @on-change="stockAlarmValue"
                      >
                        <Option
                          v-for="item in stockAlarm"
                          :value="item.value"
                          :key="item.label+item.value"
                        >{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="库存上限" prop="maxNum">
                      <Input v-model="formItem.maxNum" :disabled="isNum" placeholder="请输入库存上限"/>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="库存下限" prop="minNum">
                      <Input v-model="formItem.minNum" :disabled="isNum" placeholder="请输入库存下限"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="商品英文或拼音名称" prop="productEnglishName">
                      <Input
                        v-model="formItem.productEnglishName"
                        :disabled="isShow"
                        placeholder="商品英文或拼音名称"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商品名简拼" prop="productSimplicity">
                      <Input
                        v-model="formItem.productSimplicity"
                        :disabled="isShow"
                        placeholder="商品名简拼"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="分类名称" prop="classCode">
                      <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                        <Option
                          v-for="item in selecteClass"
                          :value="item.classCode"
                          :key="item.classCode"
                        >{{ item.className }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>

                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="零售价" prop="salePrice">
                      <Input
                        number
                        v-model="formItem.salePrice"
                        :disabled="isShow"
                        placeholder="请输入商品零售价"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="批发价" prop="wholesalePrice">
                      <Input
                        number
                        v-model="formItem.wholesalePrice"
                        :disabled="isShow"
                        placeholder="请输入商品批发价"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="成本价" prop="costPrice">
                      <Input
                        number
                        v-model="formItem.costPrice"
                        :disabled="isShow"
                        placeholder="请输入商品成本价"
                      />
                    </FormItem>
                  </Col>
                </Row>

                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="会员价" prop="memberPrice">
                      <Input
                        number
                        v-model="formItem.memberPrice"
                        :disabled="isShow"
                        placeholder="请输入商品会员价"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商品规格" prop="specifications">
                      <Input
                        v-model="formItem.specifications"
                        :disabled="isShow"
                        placeholder="请输入商品规格"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="品牌" prop="brand">
                      <Input v-model="formItem.brand" :disabled="isShow" placeholder="请输入商品品牌"/>
                    </FormItem>
                  </Col>
                </Row>

                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="产地" prop="producingArea">
                      <Input
                        v-model="formItem.producingArea"
                        :disabled="isShow"
                        placeholder="请输入商品产地"
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="是否称重" prop="openWeigh">
                      <Select v-model="formItem.openWeigh" :disabled="isShow">
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="是否折扣" prop="discountFlag">
                      <Select v-model="formItem.discountFlag" :disabled="isShow">
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>

                <Row :gutter="20">
                  <Col span="8">
                    <FormItem label="经销方式" prop="distribution">
                      <Select v-model="formItem.distribution" :disabled="isShow">
                        <Option value="0">经销</Option>
                        <Option value="1">代销</Option>
                        <Option value="2">自营</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="产品标志" prop="flag">
                      <Select v-model="formItem.flag" :disabled="isShow">
                        <Option value="0">正常</Option>
                        <Option value="1">下架</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <FormItem label="备注" prop="remark">
                  <Input
                    v-model="formItem.remark"
                    :disabled="isShow"
                    type="textarea"
                    placeholder="请输入备注信息"
                  />
                </FormItem>
                <FormItem label="上传图片">
                  <div class="demo-upload-list" v-if="formItem.productPicture">
                    <template>
                      <img :src="formItem.productPicture">
                      <div class="demo-upload-list-cover" v-if="!isShow">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
                      </div>
                    </template>
                  </div>
                  <Upload
                    v-if="!formItem.productPicture"
                    ref="upload"
                    :show-upload-list="false"
                    :headers="headers"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    type="drag"
                    :on-success="handleSuccess"
                    :action="ImgUrl"
                    style="display: inline-block;width:200px;"
                  >
                    <div style="width: 200px;height:150px;line-height: 150px;">
                      <Icon type="ios-camera" size="50"></Icon>
                    </div>
                  </Upload>
                </FormItem>
                <FormItem  prop="stockAlarmId">
                    <Input
                    v-model="formItem.stockAlarmId"
                   style="display:none"
                  />
                </FormItem>
              </Form>
              <div slot="footer">
                <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
                <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
              </div>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Card>
    <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除产品？</p>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="delLoading"
          @click="producBatchDeleteByIds"
        >删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import storage from "@/libs/storage";
import { buildTree, Format } from "@/assets/util";
import { stockWareHouseList, stockAlarm } from "@/api/stock";
import {
  productFindPage,
  productUpdate,
  productSave,
  producBatchDeleteByIds,
  productTmplDownload,
  productExportExcel
} from "@/api/product";
import { productClassFindList } from "@/api/goods";
import { product, goods } from "@/api/resetApi";
import { saveAs } from "file-saver";
export default {
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写价格"));
      }
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
    };
    return {
      stockAlarmIds: "",
      storeCode: "",
      collapsed: false,
      delLoading: false,
      modalDel: false,
      showAdd: false,
      showTitle: "",
      isNum: true,
      selecteClass: [],
      formItem: {
        storeCode: "",
        productCode: "",
        productName: "",
        stockAlarm: 0,
        maxNum: "",
        minNum: "",
        productEnglishName: "",
        productSimplicity: "",
        depotCode: "",
        productUnit: "",
        productBarcode: "",
        classCode: "",
        className: "",
        salePrice: "",
        wholesalePrice: "",
        memberPrice: "",
        costPrice: "",
        specifications: "",
        brand: "",
        producingArea: "",
        openWeigh: "",
        distribution: "",
        discountFlag: "",
        flag: "",
        remark: "",
        productPicture: "",
        stockAlarmId: ""
      },
      stockAlarm: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      depotCode: [],
      formRules: {
        depotCode: { required: true, message: "商品库房不能为空" },
        productName: { required: true, message: "商品名称必须填写" },
        classCode: { required: true, message: "类别名称必须填写" },
        productUnit: { required: true, message: "单位必须填写" },
        productBarcode: { required: true, message: "商品条码必须填写" },
        maxNum: {
          trigger: "blur",
          validator: this.alarmNum
        },
        minNum: {
          trigger: "blur",
          validator: this.stockNum
        },
        costPrice: {
          required: true,
          validator: validateNumber,
          trigger: "blur"
        },
        wholesalePrice: {
          required: true,
          validator: validateNumber,
          trigger: "blur"
        },
        memberPrice: {
          required: true,
          validator: validateNumber,
          trigger: "blur"
        },
        salePrice: {
          required: true,
          validator: validateNumber,
          trigger: "blur"
        }
      },
      modalFlag: "add",
      formIndex: -1,
      isShow: false,
      treeListData: [
        {
          expand: true,
          loading: false,
          selected: true,
          id: 0,
          classCode: "",
          className: "全部",
          title: "全部",
          pid: null,
          pids: null,
          level: 0,
          children: []
        }
      ],
      ClassList: [
        {
          value: "1",
          label: "类别"
        },
        {
          value: "2",
          label: "品牌"
        },
        {
          value: "3",
          label: "代理商"
        }
      ],
      className: "1",
      tableColumns: [
        {
          title: "",
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "门店编号",
          key: "storeCode",
          width: 160,
          sortable: true
          /*  fixed: 'left' */
        },
        {
          title: "商品编号",
          width: 160,
          key: "productCode",
          sortable: true
        },
        {
          title: "商品名称",
          width: 160,
          key: "productName",
          sortable: true
        },
        {
          title: "单位",
          width: 160,
          key: "productUnit",
          sortable: true
        },
        {
          title: "条形码",
          width: 160,
          key: "productBarcode",
          sortable: true
        },
        {
          title: "零售价",
          width: 160,
          key: "salePrice",
          sortable: true
        },
        {
          title: "批发价",
          width: 160,
          key: "wholesalePrice",
          sortable: true
        },
        {
          title: "会员价",
          width: 160,
          key: "memberPrice",
          sortable: true
        },
        {
          title: "成本价",
          width: 160,
          key: "costPrice",
          sortable: true
        },
        {
          title: "规格",
          width: 160,
          key: "specifications",
          sortable: true
        },
        {
          title: "品牌",
          width: 160,
          key: "brand",
          sortable: true
        },
        {
          title: "产地",
          width: 160,
          key: "producingArea",
          sortable: true
        },
        {
          title: "经销方式",
          width: 160,
          key: "distribution",
          sortable: true,
          render: (h, params) => {
            return h("div", [h("strong", getDistribution())]);
          }
        },
        {
          title: "是否折扣",
          width: 160,
          key: "discountFlag",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h("strong", params.row.discountFlag == 1 ? "是" : "否")
            ]);
          }
        },
        {
          title: "产品标志",
          width: 160,
          key: "flag",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h("strong", params.row.flag == 1 ? "下架" : "正常")
            ]);
          }
        },
        {
          title: "是否称重",
          width: 160,
          key: "openWeigh",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h("strong", params.row.openWeigh == 1 ? "是" : "否")
            ]);
          }
        }
      ],
      tableData: [],
      classCode: "",
      pid: "",
      fastQuery: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      ImgUrl: "",
      selection: [],
      currentTreeNode: {},
      headers: {},
      actionUrl: "",
      Loading: "",
      ImgData: {
        projectName: "retail_store_web",
        imgFolderName: "img"
      },
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    // 初始化方法：加载树结构和默认选中子节点分类下的所有信息
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      this.productClassFindList();
      this.stockWareHouseList();
      this.setUpload();
      this.setImgLoad();
    },
    alarmNum(rule, value, callback) {
      let numBers = this.formItem.minNum;
      let res = /^[0-9]*$/;
      if (!res.test(value)) {
        callback(new Error("请输入纯数字"));
      } else {
        if (value <= parseFloat(numBers)) {
          callback(new Error("库存上限必须大于库存下限"));
        } else {
          callback();
        }
      }
    },
    stockNum(rule, value, callback) {
      let numBers = this.formItem.maxNum;
      let res = /^[0-9]*$/;
      if (!res.test(value)) {
        callback(new Error("请输入纯数字"));
      } else {
        if (value >= parseFloat(numBers)) {
          callback(new Error("库存下限必须小于库存上限"));
        } else {
          callback();
        }
      }
    },
    handleRemove(file) {
      this.formItem.productPicture = "";
    },
    handleSuccess(res, file) {
      this.formItem.productPicture = res.data;
    },
    stockAlarmValue() {
      let numValue = this.formItem.stockAlarm;
      if (numValue == 0) {
        this.isNum = true;
        this.formItem.minNum = "";
        this.formItem.maxNum = "";
      } else {
        this.isNum = false;
      }
    },
    setImgLoad() {
      this.headers["authorization"] = this.$store.state.user.token;
      this.headers["storeCode"] = this.$store.state.user.storeCode;
      this.ImgUrl =
        this.$config.baseUrl.pro +
        goods.imgUrlUpLoad +
        "?projectName=retail_store_web&imgFolderName=img";
    },
    setUpload() {
      this.headers["authorization"] = this.$store.state.user.token;
      this.headers["storeCode"] = this.$store.state.user.storeCode;
      this.actionUrl = this.$config.baseUrl.pro + product.importExcel;
    },
    findArrIndex(item, data) {
      return data.findIndex(elem => {
        return elem.id == item.id;
      });
    },
    removeArrItem(item) {
      let index = this.findArrIndex(item, this.selection);
      this.selection.splice(index, 1);
    },
    setFormItem(row) {
      const formItem = {};
      formItem.storeCode = row.storeCode;
      formItem.productCode = row.productCode;
      formItem.productName = row.productName;
      formItem.classCode = row.classCode;
      formItem.className = row.className;
      formItem.productEnglishName = row.productEnglishName;
      formItem.productSimplicity = row.productSimplicity;
      formItem.depotCode = row.depotCode;
      formItem.productUnit = row.productUnit;
      formItem.productBarcode = row.productBarcode;
      formItem.salePrice = row.salePrice;
      formItem.wholesalePrice = row.wholesalePrice;
      formItem.memberPrice = row.memberPrice;
      formItem.costPrice = row.costPrice;
      formItem.specifications = row.specifications;
      formItem.brand = row.brand;
      formItem.producingArea = row.producingArea;
      formItem.openWeigh = JSON.stringify(row.openWeigh);
      formItem.distribution = JSON.stringify(row.distribution);
      formItem.discountFlag = JSON.stringify(row.discountFlag);
      formItem.flag = JSON.stringify(row.flag);
      formItem.remark = row.remark;
      formItem.productPicture = row.productPicture;
      formItem.stockAlarmId = this.stockAlarmIds;
      this.formItem = formItem;
    },
    selectTable(selection, row) {
      console.log(selection, "selection");
      this.selection = selection;
    },
    selectTableAll(selection) {
      console.log("selectTableAll");
      this.selection = selection;
    },
    selectTableCancel(row) {
      console.log("selectTableCancel");
      this.removeArrItem(row);
    },
    selectTableAllCancel(selection) {
      console.log("selectTableAllCancel");
      this.selection = selection;
    },
    changeselect(va) {
      console.log(va);
    },
    add() {
      console.log("setclassment");
      this.$refs["formItem"].resetFields();
      this.modalFlag = "add";
      this.showAdd = true;
      this.formItem.productPicture = "";
      this.showTitle = "新增商品信息";
      this.$nextTick(() => {
        console.log("showAdd");
        this.isNum = true;
      });
      this.formItem.storeCode = this.$store.state.user.storeCode;
      this.formItem.classCode = this.classCode;
    },
    show() {
      if (this.selection.length == 1) {
        this.setFormItem(this.selection[0]);
        this.isShow = true;
        this.modalFlag = "show";
        this.showTitle = "查看商品信息";
        this.showAdd = true;
        let storeCode = this.selection[0].storeCode;
        let productCode = this.selection[0].productCode;
        this.stockAlarms(storeCode, productCode);
        this.$nextTick(() => {
          console.log("showAdd");
          this.isNum = true;
        });
      } else if (this.selection.length == 0) {
        this.$Message.warning("请选择选择一条");
      } else {
        this.$Message.warning("查看不支持多条");
      }
    },
    edit() {
      if (this.selection.length == 1) {
        this.$refs["formItem"].resetFields();
        this.formIndex = this.findArrIndex(this.selection[0], this.tableData);
        this.setFormItem(this.selection[0]);
        this.modalFlag = "edit";
        this.showTitle = "修改商品信息";
        this.showAdd = true;
        this.isShow = false;
        let storeCode = this.selection[0].storeCode;
        let productCode = this.selection[0].productCode;
        this.stockAlarms(storeCode, productCode);
      } else if (this.selection.length == 0) {
        this.$Message.warning("请选择选择一条");
      } else {
        this.$Message.warning("暂不支持批量修改");
      }
    },
    addData() {
      if (this.formItem.stockAlarm == "0") {
        this.productSave();
      } else {
        if (this.formItem.minNum == "" || this.formItem.maxNum == "") {
          this.$Message.warning("库存上下限不能为空");
        } else {
          this.productSave();
        }
      }
    },
    editData() {
      if (this.formItem.stockAlarm == "0") {
        this.productUpdate(this.formItem);
      } else {
        if (this.formItem.minNum == "" || this.formItem.maxNum == "") {
          this.$Message.warning("库存上下限不能为空");
        } else {
          this.productUpdate(this.formItem);
        }
      }
    },
    closeModal() {
      console.log("classSet-closeclassset");
      this.handleReset("formItem");
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
          this.$Message.error("填写信息有误！");
        }
      });
    },
    handleReset(name) {
      this.showAdd = false;
      this.isShow = false;
      this.formIndex = -1;
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 300);
    },
    async productClassFindList() {
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.tableLoading = true;
      const { data, status } = await productClassFindList({});
      if (data.code == 200 && status == 200) {
        // console.log("data.data21", data.data);
        let TreeUpdateList = buildTree(data.data, null);
        this.treeListData[0].children = TreeUpdateList;
        this.selecteClass = data.data;
      } else {
        this.tableData = [];
        this.$Message.info(data.message);
      }
      this.productFindPage(Loading);
      this.tableLoading = false;
    },
    async productFindPage(Loading) {
      let classCode = this.classCode;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let fastQuery = this.fastQuery;
      let storeCode = this.storeCode;
      const { data, status } = await productFindPage({
        classCode,
        page,
        pageSize,
        fastQuery,
        storeCode
      });
      if (data.code == 200 && status == 200) {
        this.tableData = data.data.list;
        this.total = data.data.total;
      }
      this.closeLoading(Loading);
    },
    async productUpdate(option) {
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const options = Object.assign(this.tableData[this.formIndex], option);
      const { data, status } = await productUpdate(options);
      if (data.code == 200 && status == 200) {
        this.tableData[this.formIndex] = options;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
          this.$Message.success("修改成功！！！");
          this.stockAlarmIds = "";
        }, 300);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    async productSave() {
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const options = this.formItem;
      const { data, status } = await productSave(options);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.productFindPage(Loading);
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
          this.$Message.success("保存成功！！！");
        }, 300);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    async producBatchDeleteByIds() {
      const ids = [];
      this.delLoading = true;
      this.selection.forEach(item => {
        ids.push(item.id);
      });
      const { data, status } = await producBatchDeleteByIds(ids);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.productFindPage();
        this.selection = [];
        this.$Message.success("删除成功！！！");
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
    async stockAlarms(storeCode, productCode) {
      const item = {
        productCode,
        storeCode
      };
      const { data, status } = await stockAlarm(item);
      if (data.code == 200 && status == 200) {
        if (data.data == null) {
          this.formItem.stockAlarm = 0;
          this.isNum = true;
          this.formItem.minNum = "";
          this.formItem.maxNum = "";
          this.stockAlarmIds = "";
          this.formItem.stockAlarmId = ""
        } else {
          this.formItem.stockAlarmId = data.data.id;
          this.stockAlarmIds = data.data.id;
          console.log(data.data.id)
          this.formItem.stockAlarm = 1;
          if (this.modalFlag == "show") {
            this.isNum = true;
          } else {
            this.isNum = false;
          }
          this.formItem.minNum = data.data.minNum;
          this.formItem.maxNum = data.data.maxNum;
        }
      }
    },
    deleted() {
      console.log(this.selection);
      if (this.selection.length > 0) {
        this.modalDel = true;
      } else {
        this.$Message.warning("请选中要删除的产品！");
      }
    },
    selectChange(treeNode) {
      console.log(treeNode, "treeNode");
      if (treeNode.length == 0) {
        // this.pid = '';
        // this.classCode = '';
        this.currentTreeNode[0].selected = true;
      } else {
        this.currentTreeNode = treeNode;
        this.pid = treeNode[0].pid;
        this.classCode = treeNode[0].classCode;
        this.fastQuery = "";
        const Loading = this.$myLoading({
          content: "正在查询商品，请稍后…"
        });
        this.pageNum = 1;
        this.productFindPage(Loading);
      }
    },
    quickSearch() {
      const Loading = this.$myLoading({
        content: "正在查询商品，请稍后…"
      });
      this.productFindPage(Loading);
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.quickSearch();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.quickSearch();
    },
    // 库房
    async stockWareHouseList() {
      const item = {
        storeCode: this.$store.state.user.storeCode
      };
      const { data } = await stockWareHouseList(item);
      if (data.code == 200) {
        let warehouseData = data.data;
        let allArry = [];
        for (let i = 0; i < warehouseData.length; i++) {
          const item = {};
          item.value = warehouseData[i].depotCode;
          item.label = warehouseData[i].depotName;
          allArry.push(item);
        }
        this.depotCode = allArry;
      }
    },
    handleBeforeUpload(file) {
      this.Loading = this.$myLoading({
        content: "正在执行导入，请稍后…"
      });
      console.log("handleBeforeUpload", file);
    },
    handleSuccessUpload(response) {
      this.Loading.close();
      console.log("handleSuccessUpload", response);
      if (response.code == 200) {
        this.$Message.info("导入成功");
        this.pageNum = 1;
        this.productFindPage();
      } else {
        this.$Message.error(response.message);
      }
    },
    handleErrorUpload(error, file, fileList) {
      this.Loading.close();
      console.log("handleErrorUpload", error, file, fileList);
    },
    async productTmplDownload() {
      console.log("productTmplDownload");
      const { data, status } = await productTmplDownload();
      if (status == 200) {
        let newTimeDate = new Date();
        let storeName = storage.getStorage("storeInfo").storeName;
        let date = Format(newTimeDate, "yy年MM月dd日hh时mm分ss秒");
        saveAs(data, storeName + "-商品导入模板—" + date + ".xls");
      }
    },
    async productExportExcel() {
      console.log("productExportExcel");
      let classCode = this.classCode;
      let fastQuery = this.fastQuery;
      let storeCode = this.storeCode;
      const { data, status } = await productExportExcel({
        classCode,
        fastQuery,
        storeCode
      });
      if (status == 200) {
        let newTimeDate = new Date();
        let storeName = storage.getStorage("storeInfo").storeName;
        let date = Format(newTimeDate, "yy年MM月dd日hh时mm分ss秒");
        saveAs(data, storeName + "-商品列表—" + date + ".xls");
      }
    }
  },
  // 执行方法
  mounted() {
    this.init();
  }
};
function getDistribution(distribution) {
  let distributionName = "";
  if (distribution == 0) {
    distributionName = "经销";
  } else if (distribution == 1) {
    distributionName = "代销";
  } else {
    distributionName = "自营";
  }
  return distributionName;
}
</script>

<style scoped src="./index.css" />
