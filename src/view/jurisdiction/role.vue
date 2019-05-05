<template>
  <div>
    <Card title="角色设置">
      <div class="joininBox">
        <div class="iview-selectTitle">快速查询:</div>
        <Input
          size="large"
          search
          placeholder="请输入要查询的角色名称"
          enter-button="查询"
          @on-search="onSearch"
          v-model="fastQuery"
          style="width: 500px"
        />
      </div>
      <div class="joininBox">
        <Row class="ptop20">
          <Button icon="md-add" @click="popupBtn()">新增角色</Button>
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
          <template slot-scope="{ row, index }" slot="actions">
            <div v-if="row.source== 0">
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="editCashier(index)"
              >编辑</Button>
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
    <!-- 新增、编辑弹窗 -->
    <Modal v-model="showModalRole" @on-cancel="closeModal" :title="title">
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="formRules" class="form-box">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="formItem.roleName" placeholder="请输入登录名"/>
        </FormItem>
        <FormItem label="权限设置" prop="roleAuthen">
          <Input class="hidenInput" v-model="formItem.roleAuthen" placeholder="请输入登录名"/>
          <Tree
            ref="tree"
            :data="treeData"
            class="treeMtop"
            @on-check-change="checkedId"
            show-checkbox
            @on-select-change="showSelect"
          ></Tree>
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
import storage from "@/libs/storage";
import { Format } from "@/assets/util";
import {
  storeRoleFindList,
  storeRoleDelete,
  findAllMenu,
  roleSave,
  roleUpdate,
  roleFindPage
} from "../../api/storeRole";
export default {
  data() {
    return {
      fastQuery: "",
      tableLoading: true,
      title: "新增角色",
      // table表格数据
      cashierData: [],
      // table 表头
      cashierColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          minWidth: 80,
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "状态",
          key: "roleStatus",
          align: "center",
          render: (h, params) => {
            return h("span", params.row.roleStatus == 1 ? "正常" : "禁用");
          }
        },
        {
          title: "操作",
          key: "registFlag",
          slot: "actions",
          align: "center"
        }
      ],
      // 权限数据
      oldTreeData: [],
      treeData: [
        {
          title: "全选",
          id: "-1",
          expand: true,
          checked: false,
          children: [
            {
              title: "parent 1",
              id: "1",
              expand: false,
              checked: false,
              children: [
                {
                  id: "2",
                  title: "parent 1-1",
                  expand: false,
                  checked: false,
                  children: []
                },
                {
                  id: "3",
                  title: "parent 1-2",
                  expand: false,
                  checked: false,
                  children: []
                }
              ]
            },
            {
              id: "4",
              title: "parent 1",
              expand: false,
              checked: false,
              children: [
                {
                  id: "5",
                  title: "parent 1-1",
                  expand: false,
                  checked: false,
                  children: []
                },
                {
                  id: "6",
                  title: "parent 1-2",
                  expand: false,
                  checked: false,
                  children: []
                }
              ]
            },
            {
              id: "7",
              title: "parent 1",
              expand: false,
              checked: false,
              children: [
                {
                  id: "8",
                  title: "parent 1-1",
                  expand: false,
                  checked: false,
                  children: []
                },
                {
                  id: "9",
                  title: "parent 1-2",
                  expand: false,
                  checked: false,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      // 表单验证
      formRules: {
        roleName: { required: true, message: "角色名称不能为空" },
        roleAuthen: { required: true, message: "权限设置不能为空" }
      },
      // 弹窗默认值
      formItem: {
        roleName: "",
        roleAuthen: ""
      },
      showModalRole: false, // 弹窗默认隐藏,
      currentChild: [],
      modalFlag: "add",
      modalDel: false,
      delLoading: false,
      formIndex: -1,
      treeDataBak: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      this.getRoleList();
      this.findAllMenu();
    },
    // 查询
    onSearch() {
      this.pageNum = 1;
      this.roleFindPage();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.roleFindPage();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.roleFindPage();
    },
    //   时间转换
    formatTime(time) {
      return Format(time, "yy-MM-dd hh:mm:ss");
    },
    //	触发新增角色
    popupBtn() {
      this.treeData[0].children = JSON.parse(JSON.stringify(this.treeDataBak));
      this.$refs["formItem"].resetFields();
      this.showModalRole = true;
      this.formItem.roleName = "";
      this.showModals("add");
    },
    // 点击子节点展开收起
    showSelect(treeData) {
      if (treeData.length === 1) {
        this.currentChild = treeData[0];
      }
      if (this.currentChild.id && this.currentChild.id == "-1") return false; // 禁止选择全选展开收起子级
      this.currentChild.expand = !this.currentChild.expand;
    },
    // 提交信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addRole();
            this.treeChangeExpand1(this.treeData);
          } else if (this.modalFlag == "edit") {
            this.editCashierDate();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    // 新添信息
    addRole() {
      this.saveRole();
    },
    // 修改信息弹窗
    editCashier(index) {
      this.treeData[0].children = JSON.parse(JSON.stringify(this.treeDataBak));
      this.formIndex = index;
      this.showModals("edit");
      this.formItem.roleName = this.cashierData[index].roleName;
      this.formItem.roleAuthen = this.cashierData[index].menuAuthen;
      let roleAuthen = this.formItem.roleAuthen;
      let tid = [];
      if (roleAuthen.length > 0) {
        tid = roleAuthen.split(",");
        var reg = new RegExp('"', "g");
        for (var i = 0; i < tid.length; i++) {
          this.treeChangeExpand(this.treeData, tid[i].replace(reg, ""));
        }
      }
    },
    treeChangeExpand(newDate, ids) {
      let _this = this;
      for (var i = 0; i < newDate.length; i++) {
        if (newDate[i].id == ids) {
          this.$set(newDate[i], "checked", true);
        }
        if (newDate[i].children) {
          // 递归打开所有节点
          newDate[i].children = _this.treeChangeExpand(
            newDate[i].children,
            ids
          );
        }
      }
      return newDate;
    },
    treeChangeExpand1(newDate1) {
      let _this = this;
      for (var i = 0; i < newDate1.length; i++) {
        this.$set(newDate1[i], "checked", false);
        this.$set(newDate1[i], "indeterminate", false);
        if (newDate1[i].children) {
          // 递归打开所有节点
          newDate1[i].children = _this.treeChangeExpand1(newDate1[i].children);
        }
      }
      return newDate1;
    },
    // 保存修改信息
    editCashierDate() {
      this.modifyUpdate();
    },
    // 关闭弹窗
    closeModal() {
      this.handleReset("formItem");
    },
    // 取消弹窗
    handleReset(name) {
      this.showModalRole = false;
      this.$refs[name].resetFields();
      this.formItem.roleName = "";
      this.treeChangeExpand1(this.treeData);
    },
    // 获取选中权限的ID
    checkedId() {
      let checkedList = this.$refs.tree.getCheckedNodes();
      let List = [];
      for (let i = 0; i < checkedList.length; i++) {
        List.push(checkedList[i].id);
        this.formItem.roleAuthen = JSON.stringify(List)
          .split("[")[1]
          .split("]")[0];
      }
    },
    // 设置弹窗唯一
    showModals(type) {
      this.modalFlag = type;
      this.title = this.setModalTitle(type);
      this.showModalRole = true;
    },
    // 删除
    delCashier(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    updateCashier() {
      this.cashierData.splice(this.formIndex, 1);
    },
    async delSure() {
      this.delLoading = true;
      let id = this.cashierData[this.formIndex].id;
      const { data, status } = await storeRoleDelete(id);
      if (data.code == 200 && status == 200) {
        this.updateCashier();
        this.delLoading = false;
        this.modalDel = false;
        this.formIndex = -1;
      } else {
        this.delLoading = false;
        this.modalDel = false;
        this.formIndex = -1;
        this.$Message.error({ content: data.message, duration: 4 });
      }
    },
    setModalTitle(type) {
      let title = "新增角色";
      switch (type) {
        case "add":
          title = "新增角色";
          break;
        case "edit":
          title = "修改角色信息";
          break;
        default:
          break;
      }
      return title;
    },
    // 角色列表
    async getRoleList() {
      let storeCode = this.$store.state.user.storeCode;
      const { data, status } = await storeRoleFindList(storeCode);
      console.log(data);
      if (status == 200 && data.code == 200) {
        this.tableLoading = false;
        this.roleFindPage();
        this.cashierData = data.data;
      } else {
        this.$Message.error(data.message);
      }
    },
    // 权限设置
    async findAllMenu() {
      const { data, status } = await findAllMenu();
      // console.log(data)
      if (status == 200 && data.code == 200) {
        let newJson = data.data;
        let newArr = [];
        for (let i = 0; i < newJson.length; i++) {
          let jsonTile = newJson[i];
          if (jsonTile.title != "首页") {
            newArr.push(jsonTile);
          }
        }
        this.treeDataBak = newArr;
        // this.treeData[0].children = newArr;
      }
    },
    // 保存角色
    async saveRole() {
      let itemList = storage.getStorage("storeInfo");
      const item = {
        createBy: itemList.userPhone,
        menuAuthen: this.formItem.roleAuthen,
        roleName: this.formItem.roleName,
        storeCode: itemList.storeCode
      };
      this.Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await roleSave(item);
      if (status == 200 && data.code == 200) {
        setTimeout(() => {
          let roleNames = this.formItem.roleName;
          let roleAuthen = this.formItem.roleAuthen;
          let newDate = new Date();
          console.log(newDate);
          let JsonData = {
            roleName: roleNames,
            createTime: Format(newDate, "yy-MM-dd hh:mm:ss"),
            menuAuthen: roleAuthen,
            registFlag: true,
            source: 0,
            roleStatus: 1
          };
          this.cashierData.unshift(JsonData);
          this.showModalRole = false;
          this.Loading.close();
          this.$Message.success("保存成功!");
        }, 1000);
      } else {
        this.loading = false;
        this.Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 修改角色信息
    async modifyUpdate() {
      let itemList = storage.getStorage("storeInfo");
      const item = {
        createBy: itemList.userPhone,
        id: this.cashierData[this.formIndex].id,
        menuAuthen: this.formItem.roleAuthen,
        roleName: this.formItem.roleName,
        storeCode: itemList.storeCode
      };
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const { data, status } = await roleUpdate(item);
      if (status == 200 && data.code == 200) {
        setTimeout(() => {
          this.cashierData[this.formIndex].roleName = this.formItem.roleName;
          this.cashierData[this.formIndex].menuAuthen = this.formItem.roleAuthen;
          this.closeModal();
          Loading.close();
        }, 1000);
      } else {
        this.loading = false;
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 分页查询
    async roleFindPage() {
      this.tableLoading = true;
      let fastQuery = this.fastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      // let pid = this.pid;
      const { data, status } = await roleFindPage({
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
.form-box {
  height: 400px;
  overflow: auto;
}
.treeMtop {
  margin-top: -7px;
}
.hidenInput {
  display: none;
}
</style>
