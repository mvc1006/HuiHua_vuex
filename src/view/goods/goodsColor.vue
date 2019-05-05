<template>
  <div class="content-box">
    <!-- <div class="content-title">
      <h3>商品颜色设置</h3>
    </div>-->
    <Card title="商品颜色设置" style="min-height:100%">
      <div>
        <!--  <Row class="pbtom10">
            <label class="search-label fl">门店编号</label>
            <Col span="6">
              <Input size="large" placeholder="请输入门店编号"/>
            </Col>
            <label class="search-label fl">颜色编号</label>
            <Col span="6">
              <Input size="large" placeholder="请输入颜色编号"/>
            </Col>
          </Row>

          <Row class="pbtom10">
            <label class="search-label fl">颜色名称</label>
            <Col span="6">
              <Input size="large" placeholder="请输入颜色名称"/>
            </Col>
          </Row>
        -->
        <div class="operTime">
          <span>快速查询：</span>
          <Input placeholder="请输入颜色名称、编号" size="large" style="width: 300px" v-model="fastQuery"></Input>
          <Button type="primary" icon="ios-search" @click="search" size="large">查询</Button>
        </div>
        <!--  <Row class="pbtom10">
          <label class="search-label fl"></label>
          <Col span="12">
            <Button type="primary" icon="ios-search" @click="search" size="large">查询</Button>
          </Col>
        </Row>-->
        <Divider class="dividerCenter" orientation="left">商品颜色记录</Divider>
        <Row class="pbtom10">
          <Button type="primary" icon="md-add" @click="setColorment">新增商品颜色</Button>
        </Row>

        <Table
          class="table-all-width"
          :columns="columns1"
          :data="data1"
          :stripe="true"
          :border="true"
          :loading="loading"
        >
          <template slot-scope="{ row, index }" slot="actions">
            <Button type="primary" icon="ios-eye" size="small" @click="show(index)">查看</Button>
            <Button
              style="margin:0 5px"
              type="info"
              icon="md-create"
              size="small"
              @click="edit(index)"
            >修改</Button>
            <Button type="error" icon="md-trash" size="small" @click="delCashier(index)">删除</Button>
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
          class="form-box"
        >
          <FormItem label="门店编号" prop="storeCode">
            <Input v-model="formItem.storeCode" :disabled="true" placeholder="请输入门店编号"/>
          </FormItem>
          <!--  <FormItem label="颜色编号" prop="colorCode">
          <Input v-model="formItem.colorCode" :disabled="true" placeholder="颜色编号"/>
          </FormItem>-->
          <FormItem label="颜色名称" prop="colorName">
            <Input v-model="formItem.colorName" :disabled="isShow" placeholder="请输入颜色名称"/>
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
    </Card>
  </div>
</template>
<script>
import {
  findGoodsColorPage,
  saveGoodColor,
  updateGoodColor,
  productColorDel
} from "@/api/goods";
export default {
  name: "goodsColor",
  data() {
    return {
      columns1: [
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
          align: "center"
        },
        {
          title: "颜色编号",
          align: "center",
          key: "colorCode"
        },
        {
          title: "颜色名称",
          align: "center",
          key: "colorName"
        },
        {
          title: "操作",
          slot: "actions",
          width: 280,
          align: "center",
          minWidth: 150,
          className: "td-index"
        }
      ],
      data1: [],
      showAdd: false,
      showTitle: "",
      formItem: {
        storeCode: "",
        /* colorCode: "", */
        colorName: "",
        id: ""
      },
      formRules: {
        colorName: { required: true, message: "颜色名称必须填写" }
      },
      modalFlag: "add",
      editIndex: -1,
      isShow: false,
      columns2: [
        {
          title: "",
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "id",
          key: "id"
        },
        {
          title: "门店编号",
          key: "storeCode"
        },
        {
          title: "尺码编号",
          key: "sizeCode"
        },
        {
          title: "尺码名称",
          key: "sizeName"
        },
        {
          title: "操作",
          slot: "actions1",
          width: 200,
          align: "center",
          minWidth: 150,
          className: "td-index"
        }
      ],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      fastQuery: "",
      formIndex: -1,
      modalDel: false,
      delLoading: false
    };
  },
  methods: {
    init() {
      this.search();
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    async search() {
      this.loading = true;
      let fastQuery = this.fastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      const { data, status } = await findGoodsColorPage({
        fastQuery,
        page,
        pageSize
      });
      if (data.code == 200 && status == 200) {
        // this.data1 = data.data;
        this.data1 = data.data.list;
        this.total = data.data.total;
        this.loading = false;
      } else {
        this.loading = false;
        this.$Message.error(data.message);
      }
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.search();
    },
    setTimeClose(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        this.handleReset("formItem");
        Loading.close();
      }, 1000);
    },
    setColorment() {
      console.log("setColorment");
      this.$refs["formItem"].resetFields();
      this.modalFlag = "add";
      this.showAdd = true;
      this.showTitle = "新增商品颜色";
      this.formItem.storeCode = this.$store.state.user.storeCode;
    },
    evaluate(index) {
      this.formItem.storeCode = this.data1[index].storeCode;
      this.formItem.colorName = this.data1[index].colorName;
      this.formItem.id = this.data1[index].id;
    },
    show(index) {
      console.log("color-show");
      this.evaluate(index);
      this.modalFlag = "show";
      this.showTitle = "查看商品颜色信息";
      this.isShow = true;
      this.showAdd = true;
    },
    edit(index) {
      console.log("color-edit");
      this.$refs["formItem"].resetFields();
      this.evaluate(index);
      this.editIndex = index;
      this.modalFlag = "edit";
      this.showTitle = "修改商品颜色信息";
      this.showAdd = true;
      this.isShow = false;
    },
    delCashier(index) {
      this.formIndex = index;
      this.modalDel = true;
      this.delLoading = false;
    },
    delSure() {
      this.delLoading = true;
      let id = this.data1[this.formIndex].id
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.setTimeout = false;
        this.productColorDel(id)
        this.search();
        this.delLoading = false;
        this.modalDel = false;
        this.formIndex = -1;
      }, 2000);
    },
    async productColorDel(id) {
      const item = {
        id: id
      }
      console.log(item)
      const { data, status } = await productColorDel(item)
      if (data.code == 200 && status == 200) {
        this.$Message.success("删除成功！")
      } else {
        this.$Message.error(data.message)
      }
    },
    async addColorset() {
      const Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      const item = {
        colorName: this.formItem.colorName
        // storeCode: this.storeCode
      };
      const { data, status } = await saveGoodColor(item);
      if (data.code == 200 && status == 200) {
        this.loading = true;
        // this.data1.push(item);
        this.search();
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          Loading.close();
          this.closeColorset();
        }, 1000);
      } else {
        this.loading = false;
        this.$Message.error(data.message);
      }

      /* this.data1.push(item); */
    },
    async editColorset() {
      /*  let index = this.editIndex;
      this.data1[index].storeCode = this.formItem.storeCode;
      this.data1[index].colorName = this.formItem.colorName;
      this.closeColorset(); */
      const Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      let index = this.editIndex;
      const item = {
        colorName: this.formItem.colorName,
        id: this.formItem.id
      };
      const { data, status } = await updateGoodColor(item);
      if (data.code == 200 && status == 200) {
        this.loading = true;
        this.data1[index].colorName = this.formItem.colorName;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          Loading.close();
          this.loading = false;
          this.closeColorset();
        }, 1000);
      } else {
        this.loading = false;
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    closeColorset() {
      console.log("ColorSet-closeColorset");
      this.handleReset("formItem");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(valid);
          if (this.modalFlag == "add") {
            this.addColorset();
          } else if (this.modalFlag == "edit") {
            this.editColorset();
          } else if (this.modalFlag == "show") {
            this.closeColorset();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      // console.log(this.$refs[name]);
      // this.$refs[name].resetFields();
      this.showAdd = false;
      this.isShow = false;
      this.editIndex = -1;
      // this.modalFlag = 'add';
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped src='./index.css'>
</style>
