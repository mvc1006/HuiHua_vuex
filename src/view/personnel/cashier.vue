<template>
  <div class="content-box">
    <Card title="收款员详情">
      <p class="iview-fontColor">拥有前台收银、结账、退菜、变价或优惠等一系列操作权限。</p>
      <div class="content-body">
        <Row>
          <label class="search-label fl">快速查询</label>
          <Col span="10">
            <Input v-model="fastQuery" placeholder="请输入收款员工号、姓名..."/>
          </Col>
          <Col span="3" class="tc">
            <Button type="primary" @click="onSearch">查询</Button>
          </Col>
        </Row>
        <Row class="ptop20">
          <Button icon="md-add" @click="add">新增收款员</Button>
        </Row>
        <Table class="mtop15" border :loading="loading" :columns="tableColumns" :data="tableData">
          <template slot-scope="{ row,index }" :slot="item.key" v-for="(item,indexs) in slotList">
            <div class="relative" :key="indexs">
              <div class="switch-mark" @click="switchChange(index,item.key)"></div>
              <i-switch :value="row[item.key]==1" size="large">
                <span slot="open">允许</span>
                <span slot="close">禁止</span>
              </i-switch>
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="actions">
            <div>
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="edit(index)"
              >修改</Button>
              <Button
                type="error"
                icon="md-trash"
                size="small"
                style="margin-right: 5px"
                @click="delTableData(index)"
              >删除</Button>
              <Button type="info" icon="md-create" size="small" @click="resetPsw(index)">重置密码</Button>
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
    <Modal v-model="showModal" :title="title" @on-cancel="closeModal">
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="formRules" class="form-box">
        <FormItem label="工号" prop="cashierCode" v-if="modalFlag!=='psw'">
          <Input v-model="formItem.cashierCode" :disabled="true"></Input>
        </FormItem>
        <FormItem label="姓名" prop="cashierName">
          <Input
            v-model="formItem.cashierName"
            :disabled="isShow || modalFlag=='psw'"
            placeholder="请输入收款员名称"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="cashierPwd" v-if="modalFlag=='add'||modalFlag=='psw'">
          <Input
            v-model="formItem.cashierPwd"
            :disabled="isShow"
            type="password"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
        <FormItem label="确认密码" prop="cashierPwdSure" v-if="modalFlag=='psw'">
          <Input
            v-model="formItem.cashierPwdSure"
            :disabled="isShow"
            type="password"
            placeholder="请确认密码"
          ></Input>
        </FormItem>
        <FormItem label="拥有权限" v-if="modalFlag!=='psw'">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox v-for="(item,index) in slotList" :label="item.key" :key="index">{{item.value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="允许最低折扣" prop="minDiscount" v-if="modalFlag!=='psw'" class="pright40">
          <Input v-model="formItem.minDiscount" :disabled="isShow" placeholder="允许最低折扣"></Input>
          <span class="form-item-unit">%</span>
        </FormItem>
        <FormItem label="最大优惠金额" prop="maxDiscountyh" v-if="modalFlag!=='psw'" class="pright40">
          <Input v-model="formItem.maxDiscountyh" :disabled="isShow" placeholder="请输入最大优惠金额"></Input>
          <span class="form-item-unit">元</span>
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
  cashierGetMaxCashierCode,
  cashierSave,
  cashierDelete,
  cashierUpdate,
  cashierUpdatePasswd,
  cashierFindPage
} from "@/api/cashier";
import tableColumns from "./cashierColumns";
export default {
  name: "cashier",
  data() {
    return {
      fastQuery: "",
      loading: true,
      title: "添加收款员",
      modalFlag: "add",
      isShow: false,
      showModal: false,
      tableData: [],
      tableColumns: tableColumns,
      slotList: [
        {
          key: "changePrice",
          value: "是否允许变价"
        },
        {
          key: "give",
          value: "是否允许赠送"
        },
        {
          key: "memberCard",
          value: "是否允许使用会员卡"
        },
        {
          key: "repeatReport",
          value: "是否允许补票打印"
        },
        {
          key: "report",
          value: "是否允许读取报表"
        },
        {
          key: "retreat",
          value: "是否允许退货"
        },
        {
          key: "signing",
          value: "是否允许签单结账"
        }
      ],
      formItem: {
        cashierName: "",
        cashierCode: "",
        checkbox: [],
        maxDiscountyh: "",
        minDiscount: "",
        cashierPwd: "",
        cashierPwdSure: ""
      },
      formRules: {
        cashierName: { required: true, message: "姓名不能为空" },
        // cashierPwd: { required: true, message: "密码必须填写" }
        cashierPwd: [
          { required: true, validator: this.cashierPwdCheck, trigger: "blur" }
        ],
        cashierPwdSure: {
          required: true,
          validator: this.cashierPwdSureCheck,
          trigger: "blur"
        },
        minDiscount: [{ validator: this.minDiscountCheck, trigger: "blur" }]
      },
      modalDel: false,
      delLoading: false,
      formIndex: -1,
      storeCode: "30000001",
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      // this.cashierFindList();
      this.search();
    },
    cashierPwdCheck(rule, value, callback) {
      // console.log(rule,'rule');
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    },
    minDiscountCheck(rule, value, callback) {
      // console.log(rule,'rule');
      if (+value < 0 || +value > 100) {
        callback(new Error("折扣范围0--100"));
      } else {
        callback();
      }
    },
    cashierPwdSureCheck(rule, value, callback) {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.formItem.cashierPwd) {
        callback(new Error("两次密码输入值不一致！"));
      } else {
        callback();
      }
    },
    onSearch() {
      this.pageNum = 1;
      this.search();
    },
    async search() {
      let fastQuery = this.fastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      const { data, status } = await cashierFindPage({
        fastQuery,
        page,
        pageSize,
        storeCode
      });
      if (data.code == 200 && status == 200) {
        this.tableData = data.data.list;
        this.total = data.data.total;
      } else {
        this.$Message.error(data.message);
      }
      this.loading = false;
      // cashierFindPage
    },
    async add() {
      this.isShow = false;
      const { data, status } = await cashierGetMaxCashierCode();
      if (data.code == 200 && status == 200) {
        this.formItem.cashierCode = data.data;
        this.formItem.checkbox = [];
        this.showModals("add");
      } else {
        this.$Message.error(data.message);
      }
    },
    edit(index) {
      this.isShow = false;
      this.formIndex = index;
      const item = this.tableData[index];
      this.formItem.cashierCode = item.cashierCode;
      this.formItem.cashierName = item.cashierName;
      this.formItem.maxDiscountyh = item.maxDiscountyh;
      this.formItem.minDiscount = item.minDiscount;
      const checkbox = [];
      this.slotList.forEach(items => {
        let key = items.key;
        if (item[key]) {
          checkbox.push(key);
        }
      });
      this.formItem.checkbox = checkbox;
      this.showModals("edit");
    },
    resetPsw(index) {
      this.isShow = false;
      this.formIndex = index;
      this.formItem.cashierName = this.tableData[index].cashierName;
      this.formItem.cashierPwdSure = "";
      this.showModals("psw");
    },
    async addData() {
      let cashierName = this.formItem.cashierName;
      let cashierCode = this.formItem.cashierCode;
      let maxDiscountyh = this.formItem.maxDiscountyh;
      let minDiscount = this.formItem.minDiscount;
      let checkbox = this.formItem.checkbox;
      let cashierPwd = this.formItem.cashierPwd;
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const obj = {
        cashierCode: cashierCode,
        cashierName: cashierName,
        changePrice: 0,
        cashierPwd: cashierPwd,
        give: 0,
        maxDiscountyh: maxDiscountyh,
        memberCard: 0,
        minDiscount: minDiscount,
        repeatReport: 0,
        report: 0,
        retreat: 0,
        signing: 0,
        storeCode: this.storeCode
      };
      checkbox.forEach(key => {
        obj[key] = 1;
      });
      const { data, status } = await cashierSave(obj);
      if (data.code == 200 && status == 200) {
        this.tableData.push(data.data);
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 1000);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    editData() {
      let cashierName = this.formItem.cashierName;
      let maxDiscountyh = this.formItem.maxDiscountyh;
      let minDiscount = this.formItem.minDiscount;
      let checkbox = this.formItem.checkbox;
      const obj = {
        cashierName: cashierName,
        changePrice: 0,
        give: 0,
        maxDiscountyh: maxDiscountyh,
        memberCard: 0,
        minDiscount: minDiscount,
        repeatReport: 0,
        report: 0,
        retreat: 0,
        signing: 0
      };
      checkbox.forEach(key => {
        obj[key] = 1;
      });
      this.cashierUpdate(obj);
    },
    async cashierUpdate(option) {
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const options = Object.assign(this.tableData[this.formIndex], option);
      const { data, status } = await cashierUpdate(options);
      if (data.code == 200 && status == 200) {
        this.tableData[this.formIndex] = options;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 1000);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    async resetPswData() {
      let id = this.tableData[this.formIndex].id;
      let pwd = this.formItem.cashierPwd;
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const { data, status } = await cashierUpdatePasswd({ id, pwd });
      if (data.code == 200 && status == 200) {
        // this.tableData.push(obj);
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 1000);
      } else {
        Loading.close();
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
          } else if (this.modalFlag == "psw") {
            this.resetPswData();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      console.log("handleReset");
      this.showModal = false;
      // this.isShow = false;
      // this.modalFlag = "add";
      this.$refs[name].resetFields();
    },
    showModals(type) {
      this.modalFlag = type;
      this.title = this.setModalTitle(type);
      this.showModal = true;
    },
    closeModal() {
      this.handleReset("formItem");
    },
    setModalTitle(type) {
      let title = "添加收款员";
      switch (type) {
        case "add":
          title = "添加收款员";
          break;
        case "edit":
          title = "修改收款员";
          break;
        case "psw":
          title = "重置收款员密码";
          break;
        default:
          break;
      }
      return title;
    },
    delTableData(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    async delSure() {
      console.log("delSure");
      this.delLoading = true;
      let id = this.tableData[this.formIndex].id;
      const { data, status } = await cashierDelete({ id });
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
    switchChange(index, key) {
      this.formIndex = index;
      const item = this.tableData[index];
      this.$Modal.confirm({
        title: "提示",
        content: `<p>是否确认修改</p>`,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          const options = {};
          options.id = item.id;
          options[key] = item[key] === 1 ? 0 : 1;
          this.cashierUpdate(options);
        }
      });
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.search();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped src='./index.css'>
</style>
