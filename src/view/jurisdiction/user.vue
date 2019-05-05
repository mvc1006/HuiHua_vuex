<template>
  <div>
    <Card title="用户设置">
      <div class="joininBox">
        <div class="iview-selectTitle">登录名称:</div>
        <Input size="large" v-model="fastQuery" placeholder="输入想要查询的登录名称" style="width: 500px"/>
      </div>
      <div class="joininBox">
        <div class="iview-selectTitle">所属门店:</div>
        <Input disabled size="large" v-model="storeName" style="width: 500px"/>
        <Button style="margin-left:15px" @click="onSearch" type="primary" size="large">查询</Button>
      </div>
      <div class="joininBox">
        <Row class="ptop20">
          <Button icon="md-add" @click="popupBtn()">新增用户</Button>
        </Row>
      </div>
      <div class="joininBox">
        <Table
          class="mtop15 table-all-width"
          border
          :loading="tableLoading"
          :columns="cashierColumns"
          :data="cashierData"
        >
          <template slot-scope="{ row }" slot="userStatus">{{row.userStatus=== 0 ?'禁用':'正常'}}</template>
          <template slot-scope="{ row, index }" slot="actions">
            <div class="btnM" v-if="row.source==0">
              <Button type="info" icon="md-create" size="small" @click="editCashier(index)">修改</Button>
              <Button
                type="warning"
                v-if="row.userStatus === 1"
                icon="md-close"
                size="small"
                @click="prohibit(index)"
              >禁用</Button>
              <Button
                type="success"
                v-else
                icon="md-radio-button-on"
                size="small"
                @click="prohibit(index)"
              >启用</Button>
              <Button type="primary" icon="md-construct" size="small" @click="modify(index)">修改密码</Button>
              <Button type="error" icon="md-trash" size="small" @click="delCashier(index)">删除</Button>
            </div>
            <div v-else>系统默认</div>
          </template>
        </Table>
        <div style="margin-top: 10px;overflow: hidden">
          <div style="float: right;">
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
      </div>
    </Card>
    <Modal v-model="showModal" @on-cancel="closeModal" :title="title">
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="formRules" class="form-box">
        <FormItem label="登录名" prop="loginName">
          <Input v-model="formItem.loginName" placeholder="请输入登录名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password" v-if="modalFlag!=='edit'">
          <Input v-model="formItem.password" :disabled="true"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="formItem.status">
            <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="角色" prop="user">
          <Select v-model="formItem.user">
            <Option v-for="item in user" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属门店" prop="storeName" v-if="modalFlag!=='edit'">
          <Input v-model="formItem.storeName" :disabled="true" placeholder></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
        <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
      </div>
    </Modal>
    <Modal v-model="showModalPass" @on-cancel="closeModals" title="修改密码">
      <Form
        ref="formItemPass"
        :model="formItemPass"
        :label-width="80"
        :rules="password"
        class="form-box"
      >
        <FormItem label="新密码" prop="newPass">
          <Input v-model="formItemPass.newPass" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPass">
          <Input v-model="formItemPass.confirmPass" placeholder="请输入确认密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="passwordSubmit('formItemPass')">确定</Button>
        <Button style="margin-left: 8px" @click="passwordReset('formItemPass')">取消</Button>
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
import storage from "@/libs/storage";
import { Format } from "@/assets/util";
import { storeRoleFindList } from "@/api/storeRole";
import {
  storeUserFindList,
  userSave,
  userModfiySave,
  userPassWord,
  userFindPage,
  userDelete
} from "@/api/storeUser";
export default {
  data() {
    return {
      InputHide: true,
      fastQuery: "",
      title: "新增用户",
      storeName: "黑作坊连锁",
      modalFlag: "add",
      tableLoading: true,
      isShow: true,
      isBtn: true,
      showModal: false,
      showModalPass: false,
      formItem: {
        loginName: "",
        password: "123456",
        status: "0",
        user: "",
        storeName: "黑作坊连锁"
      },
      formItemPass: {
        newPass: "",
        confirmPass: ""
      },
      status: [
        {
          value: "0",
          label: "禁用"
        },
        {
          value: "1",
          label: "正常"
        }
      ],
      user: [],
      formRules: {
        loginName: { required: true, message: "登录名不能为空" },
        password: { required: true, message: "密码不能为空" },
        status: { required: true, message: "状态不能为空" },
        user: { required: true, message: "角色名不能为空" },
        storeName: { required: true, message: "所属门店不能为空" }
      },
      password: {
        newPass: { required: true, message: "密码不能为空" },
        confirmPass: { required: true, message: "确认密码不能为空" }
      },
      cashierData: [],
      cashierColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          minWidth: 60,
          align: "center",
          className: "td-index"
        },
        {
          title: "登录名称",
          key: "userLoginName",
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "状态",
          slot: "userStatus",
          align: "center",
          width: 100
        },
        {
          title: "最后登录时间",
          key: "lastLoginTime",
          align: "center"
        },
        {
          title: "创建时间",
          key: "updateTime",
          align: "center"
        },
        {
          title: "门店编号",
          key: "storeCode",
          align: "center",
          width: 100
        },
        {
          title: "操作",
          key: "registFlag",
          slot: "actions",
          align: "center",
          width: 320,
          minWidth: 150,
          className: "td-index"
        }
      ],
      modalDel: false,
      delLoading: false,
      formIndex: -1,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      statusNx: ""
    };
  },
  methods: {
    init() {
      this.getUserList();
      this.userFindAll();
      let storeName = storage.getStorage("storeInfo");
      this.storeName = storeName.storeName;
    },
    // 查询登录名
    onSearch() {
      this.pageNum = 1;
      this.userFindPage();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.userFindPage();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.userFindPage();
    },
    // 触发添加按钮
    popupBtn() {
      this.$refs["formItem"].resetFields();
      this.showModal = true;
      this.formItem.loginName = this.getCashierNo();
      this.formItem.user = "";
      this.formItem.status = "";
      this.showModals("add");
    },
    // 提交信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addCashierData();
          } else if (this.modalFlag == "edit") {
            this.editCashierData();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    // 添加信息方法
    addCashierData() {
      this.userSaveUpdata();
    },
    // 修改
    editCashier(index) {
      let roldName = this.cashierData[index].roleName;
      this.formIndex = index;
      this.formItem.loginName = this.cashierData[index].userLoginName;
      this.formItem.user = this.getValue(roldName);
      this.formItem.status = JSON.stringify(this.cashierData[index].userStatus);
      this.showModals("edit");
    },
    // 保存修改信息
    editCashierData() {
      this.modfiyUpdata();
    },
    // 修改密码
    modify(index) {
      this.formIndex = index;
      this.showModalPass = true;
      this.formItemPass.newPass = this.getCashierNo();
    },
    // 确认修改密码
    passwordSubmit() {
      let newPassWord = this.formItemPass.confirmPass;
      let confirmPass = this.formItemPass.newPass;
      if (newPassWord != confirmPass) {
        this.$Message.error("两次密码不一致!");
      } else {
        const Loading = this.$myLoading({
          content: "正在保存，请稍后…"
        });
        this.ModifyPassWord();
        setTimeout(() => {
          this.closeModals();
          Loading.close();
        }, 1000);
      }
    },
    showModals(type) {
      this.modalFlag = type;
      this.title = this.setModalTitle(type);
      this.showModal = true;
    },
    closeModal() {
      this.handleReset("formItem");
    },
    closeModals() {
      this.passwordReset("formItemPass");
    },
    passwordReset(name) {
      this.$refs[name].resetFields();
      this.formItemPass.newPass = "";
      this.formItemPass.confirmPass = "";
      this.showModalPass = false;
    },
    handleReset(name) {
      this.showModal = false;
      this.isShow = false;
      // this.$refs[name].resetFields();
    },
    setModalTitle(type) {
      let title = "新增用户";
      switch (type) {
        case "add":
          title = "新增用户";
          break;
        case "edit":
          title = "修改用户";
          break;
        default:
          break;
      }
      return title;
    },
    getCashierNo() {
      return Math.ceil(Math.random() * 10000);
    },
    // 删除
    delCashier(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    // 禁用
    prohibit(index) {
      this.formIndex = index;
      this.$Modal.confirm({
        title: "提示",
        content: `<p>是否确认修改</p>`,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.statusNx = this.cashierData[this.formIndex].userStatus;
          this.modfiyStatus(index);
        }
      });
    },
    updateCashier() {
      this.cashierData.splice(this.formIndex, 1);
    },
    delSure() {
      this.delLoading = true;
      let id = this.cashierData[this.formIndex].id;
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.setTimeout = false;
        this.userDelete(id);
        this.updateCashier();
        this.delLoading = false;
        this.modalDel = false;
        this.formIndex = -1;
      }, 2000);
    },
    // 角色名转换
    getLabel(value) {
      for (let i = 0; i < this.user.length; i++) {
        const items = this.user[i];
        if (items.value == value) {
          return items.label;
        }
      }
    },
    getValue(label) {
      for (let i = 0; i < this.user.length; i++) {
        const item = this.user[i];
        if (item.label == label) {
          return item.value;
        }
      }
    },
    async getUserList() {
      let storeCode = this.$store.state.user.storeCode;
      const { data, status } = await storeUserFindList(storeCode);
      if (status == 200 && data.code == 200) {
        this.cashierData = data.data;
        this.tableLoading = false;
        this.userFindPage();
      } else {
        this.$Message.error(data.message);
      }
    },
    // 查询门店所有角色
    async userFindAll() {
      const { data } = await storeRoleFindList();
      let allDate = data.data;
      let allArry = [];
      for (let i = 0; i < allDate.length; i++) {
        const item = {};
        if (allDate[i].source == 0) {
          item.value = allDate[i].id;
          item.label = allDate[i].roleName;
          allArry.push(item);
        }
      }
      this.user = allArry;
    },
    // 新增用户
    async userSaveUpdata() {
      let itemphone = storage.getStorage("storeInfo");
      const item = {
        createBy: itemphone.userPhone,
        roleId: this.formItem.user,
        userLoginName: this.formItem.loginName,
        userPassword: this.formItem.password,
        userStatus: JSON.parse(this.formItem.status)
      };
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const { data, status } = await userSave(item);
      if (status == 200 && data.code == 200) {
        let itemList = storage.getStorage("storeInfo");
        let dataTime = new Date();
        let userIndex = this.formItem.user;
        let add = this.getLabel(userIndex);
        let userLoginName = this.formItem.loginName;
        let roleName = add;
        let userStatus = JSON.parse(this.formItem.status);
        let lastLoginTime = "";
        let updateTime = Format(dataTime, "yy-MM-dd hh:mm:ss");
        let source = 0;
        let storeCode = itemList.storeCode;
        let registFlag = true;

        this.cashierData.unshift({
          userLoginName,
          roleName,
          userStatus,
          lastLoginTime,
          updateTime,
          storeCode,
          registFlag,
          source
        });
        setTimeout(() => {
          this.closeModal();
          Loading.close();
        }, 1500);
      } else {
        this.loading = false;
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 状态切换
    async modfiyStatus(index) {
      let itemphone = storage.getStorage("storeInfo");
      this.formIndex = index;
      if (this.statusNx == "0") {
        this.statusNx = 1;
      } else {
        this.statusNx = 0;
      }
      const item = {
        id: this.cashierData[this.formIndex].id,
        createBy: itemphone.userPhone,
        roleId: this.cashierData[this.formIndex].roleId,
        userLoginName: this.cashierData[this.formIndex].userLoginName,
        userStatus: this.statusNx
      };
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const { data, status } = await userModfiySave(item);
      if (status == 200 && data.code == 200) {
        this.cashierData[this.formIndex].userStatus =
          this.cashierData[this.formIndex].userStatus === 0 ? 1 : 0;
        this.closeModal();
        setTimeout(() => {
          this.closeModal();
          Loading.close();
        }, 1000);
      } else {
        this.loading = false;
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 修改用户信息
    async modfiyUpdata() {
      let itemphone = storage.getStorage("storeInfo");
      const item = {
        id: this.cashierData[this.formIndex].id,
        createBy: itemphone.userPhone,
        roleId: this.formItem.user,
        userLoginName: this.formItem.loginName,
        userStatus: JSON.parse(this.formItem.status)
      };
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const { data, status } = await userModfiySave(item);
      if (status == 200 && data.code == 200) {
        let userIndex = this.formItem.user;
        let add = this.getLabel(userIndex);
        this.cashierData[this.formIndex].userLoginName = this.formItem.loginName;
        this.cashierData[this.formIndex].roleName = add;
        this.cashierData[this.formIndex].userStatus = +this.formItem.status;
        this.closeModal();
        setTimeout(() => {
          this.closeModal();
          Loading.close();
        }, 1000);
      } else {
        this.loading = false;
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 修改密码
    async ModifyPassWord(index) {
      let id = this.cashierData[this.formIndex].id;
      let password = this.formItemPass.newPass;
      await userPassWord({ id, password });
    },
    // 分页查询
    async userFindPage() {
      this.tableLoading = true;
      let fastQuery = this.fastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      const { data, status } = await userFindPage({
        fastQuery,
        page,
        pageSize
      });
      if (data.code == 200 && status == 200) {
        this.cashierData = data.data.list;
        this.total = data.data.total;
      } else {
        this.cashierData = [];
        this.$Message.info(data.message);
      }
      this.tableLoading = false;
    },
    // 删除用户
    async userDelete(id) {
      const item = {
        id: id
      };
      const { data, status } = await userDelete(item);
      if (data.code == 200 && status == 200) {
        this.$Message.success("删除成功！");
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.joininBox {
  margin-top: 15px;
}
.iview-selectTitle {
  float: left;
  line-height: 36px;
  margin-right: 15px;
}
.btnM button {
  margin: 0 5px;
}
</style>
