<template>
  <div class="content-box">
    <Card title="一品多码设置" style="min-height:100%">
      <div>
        <div class="operTime">
          <span>快速查询：</span>
          <Input
            placeholder="请输入商品名称、商品条码"
            size="large"
            style="width: 300px"
            v-model="fastQuery"
          ></Input>
          <Button type="primary" icon="ios-search" @click="search" size="large">查询</Button>
        </div>
        <Divider class="dividerCenter" orientation="left">一品多码设置记录</Divider>
        <Table
          class="table-all-width"
          :columns="columns1"
          :data="data1"
          :stripe="true"
          :border="true"
          :loading="tableLoading"
        >
          <template slot-scope="{ row, index }" slot="actions">
            <Button type="info" icon="md-create" size="small" @click="edit(index)">编辑</Button>
          </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page
              :total="total"
              :page-size="pageSize"
              show-sizer
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            />
          </div>
        </div>
      </div>
      <Modal v-model="showAdd" :title="showTitle" @on-cancel="closeColorset">
        <Form
          ref="formItem"
          :model="formItem"
          :label-width="80"
          :rules="formRules"
          class="form-boxCode"
        >
          <FormItem label="商品名称" prop="storeName">
            <Input :disabled="true" v-model="formItem.storeName" placeholder="请输入商品名称"/>
          </FormItem>
          <FormItem label="商品编号" prop="storeCode">
            <Input :disabled="true" v-model="formItem.storeCode" placeholder="请输入商品编号"/>
          </FormItem>
          <FormItem label="默认条码" prop="defaultBarcode">
            <Input :disabled="true" v-model="formItem.defaultBarcode" placeholder/>
          </FormItem>
          <FormItem
            v-for="(item, index) in formItem.barCodeList"
            v-if="item.status"
            :key="index"
            label="商品条码"
            :prop="'barCodeList.' + index + '.value'"
            :rules="{required: true, validator:codeItem, trigger: 'blur'}"
          >
            <Row>
              <Col span="18">
                <Input type="text" v-model="item.value" placeholder="请输入商品条码"></Input>
              </Col>
              <Col span="4" offset="1">
                <Button @click="handleRemove(index)">删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button
                  type="dashed"
                  long
                  @click="handleAdd"
                  :disabled="addShow"
                  icon="md-add"
                >新增条形码</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" :disabled="submitBtn" @click="handleSubmit('formItem')">确定</Button>
          <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { productBarcodeUpdate, productBarcodeFindPage } from "@/api/goods";
export default {
  name: "goodsColor",
  data() {
    return {
      showAdd: false,
      addShow: false,
      submitBtn: false,
      showTitle: "一品多码编辑",
      formItem: {
        storeName: "",
        barCodeList: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      },
      index: 1,
      formRules: {
        storeName: { required: true, message: "商品名称为必写" },
        storeCode: { required: true, message: "商品编号为必写" }
      },
      fastQuery: "",
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 80,
          minWidth: 80,
          align: "center"
        },
        {
          title: "商品名称",
          key: "productName",
          align: "center"
        },
        {
          title: "商品条码",
          // slot: "barcodes",
          align: "center",
          key: "barCodeList",
          render: (h, params) => {
            let code = params.row.productBarcode;
            let codeList = params.row.barCodes;
            let arryList = codeList ? codeList.split(",") : [];
            console.log(codeList);
            return h("div", [
              (() => h("p", code))(),
              arryList.map((v, index) => {
                return h("p", v);
              })
            ]);
          }
        },
        {
          title: "操作",
          slot: "actions",
          width: 200,
          align: "center",
          minWidth: 150
        }
      ],
      data1: [
        {
          id: 1,
          productName: "测试1",
          barCodeList: ["6947509910796", "6926608310140"]
        },
        {
          id: 2,
          productName: "测试2",
          barCodeList: ["6947508810796", "6947500010796"]
        }
      ],
      barCode: "",
      classCodeName: [],
      tableLoading: false,
      modalFlag: "add",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formIndex: -1
    };
  },
  methods: {
    init() {
      this.productBarcodeFindPage();
    },
    search() {
      this.productBarcodeFindPage();
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.productBarcodeFindPage();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.productBarcodeFindPage();
    },
    codeItem(rule, value, callback) {
      if (value == "") {
        this.addShow = true;
        this.submitBtn = true;
        callback(new Error("条形码不能为空"));
      } else if (value.length == 6) {
        this.addShow = true;
        this.submitBtn = true;
        callback(new Error("条形码位数不能为6位"));
      } else if (
        this.numberCode() == false ||
        value == this.formItem.defaultBarcode
      ) {
        console.log(this.numberCode())
        this.addShow = true;
        this.submitBtn = true;
        callback(new Error(value + "条形码已存在"));
      } else {
        callback();
        this.addShow = false;
        this.submitBtn = false;
      }
    },
    numberCode() {
      let codeList = this.formItem.barCodeList;
      let barCods = [];
      for (let i = 0; i < codeList.length; i++) {
        if (codeList[i].value == "" && codeList[i].status != 0) {
          return false;
        } else {
          barCods.push(codeList[i].value);
        }
      }
      let stringCode = barCods.join(",") + ",";
      for (var j = 0; j < barCods.length; j++) {
        if (
          stringCode.replace(barCods[j] + ",", "").indexOf(barCods[j] + ",") >
          -1 && barCods[j].status != 0
        ) {
          return false;
        }
      }
      return true;
    },
    handleAdd() {
      this.index++;
      let listLength = this.formItem.barCodeList;
      if (listLength.length >= 10) {
        this.$Message.error("最多添加10条！！");
      } else {
        this.formItem.barCodeList.push({
          value: "",
          index: this.index,
          status: 1
        });
      }
    },
    handleRemove(index) {
      this.formItem.barCodeList[index].status = 0;
      this.formItem.barCodeList[index].value = "";
    },
    handleSubmit(name) {
      this.productBarcodeUpdate();
    },
    handleReset(name) {
      this.showAdd = false;
    },
    closeColorset() {
      this.handleReset("formItem");
    },
    edit(index) {
      this.showAdd = true;
      this.addShow = false;
      this.submitBtn = false;
      this.formItem.storeName = this.data1[index].productName;
      this.formItem.storeCode = this.data1[index].productCode;
      this.formItem.defaultBarcode = this.data1[index].productBarcode;
      let codeList = this.data1[index].barCodes;
      let arryList = codeList ? codeList.split(",") : [];
      let barCodeList = arryList;
      let barList = [];
      this.index++;
      barCodeList.forEach(item => {
        barList.push({
          value: item,
          index: this.index,
          status: 1
        });
      });
      this.formItem.barCodeList = barList;
    },
    async productBarcodeFindPage() {
      const item = {
        fastQuery: this.fastQuery,
        page: this.pageNum,
        pageSize: this.pageSize
      };
      const { data, status } = await productBarcodeFindPage(item);
      if (data.code == 200 && status == 200) {
        this.data1 = data.data.list;
        this.total = data.data.total;
        console.log(this.total);
      } else {
        this.$Message.error(data.message);
      }
    },
    async productBarcodeUpdate() {
      let codeList = this.formItem.barCodeList;
      let barCods = [];
      codeList.forEach(item => {
        if (item.value != "") {
          barCods.push(item.value);
        }
      });

      const item = {
        productCode: this.formItem.storeCode,
        barCods: barCods
      };
      this.barCodeLoading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await productBarcodeUpdate(item);
      if (data.code == 200 && status == 200) {
        setTimeout(() => {
          this.barCodeLoading.close();
          this.showAdd = false;
        }, 1000);
        this.$Message.success("保存成功！");
        this.productBarcodeFindPage();
      } else {
        this.$Message.error(data.message);
        setTimeout(() => {
          this.barCodeLoading.close();
        }, 1000);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped src='./index.css'>
</style>
