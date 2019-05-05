<template>
  <div class="content-box">
    <Card title="商品分类设置">
      <Layout class="class-layout">
        <Sider
          hide-trigger
          collapsible
          :width="256"
          :collapsed-width="64"
          v-model="collapsed"
          class="left-sider"
        >
          <div class="iu-tree1">
            <!-- :load-data="loadData" -->
            <Tree
              :data="treeListData"
              ref="tree"
              @on-select-change="choice1"
              @on-toggle-expand="closeOpen"
            ></Tree>
          </div>
        </Sider>
        <Layout>
          <Content class="goods-content-con">
            <div class="iu-table-div">
              <!--  <Row :gutter="20">
                <Col span="8">
                  <Input placeholder="请输入分类名称" size="large">
                    <span slot="prepend">分类名称:</span>
                  </Input>
                </Col>
                <Col span="6">
                  <Button icon="ios-search" type="primary" @click="search" size="large">查询</Button>
                </Col>
              </Row>-->
              <div class="operTime">
                <span>分类名称：</span>
                <Input placeholder="请输入分类名称" size="large" style="width: 300px" v-model="fastQuery"></Input>
                <Button type="primary" @click="search" size="large">查询</Button>
              </div>

              <div class="ive-button">
                <ButtonGroup>
                  <Button icon="md-add" type="primary" @click="addClassPage">增加</Button>
                  <!--  <Button icon="md-trash" type="error" @click="remove">删除</Button> -->
                </ButtonGroup>
              </div>
              <Table
                :columns="columns1"
                :data="data1"
                :stripe="true"
                :border="true"
                :loading="tableLoading"
              >
                <template slot-scope="{ row, index }" slot="actions">
                  <Button
                    type="primary"
                    icon="ios-eye"
                    size="small"
                    style="margin-right: 5px"
                    @click="show(index)"
                  >查看</Button>
                  <Button
                    type="primary"
                    style="margin-right: 5px"
                    icon="md-create"
                    size="small"
                    @click="edit(index)"
                  >修改</Button>
                  <Button icon="md-trash" type="error" size="small" @click="removeTable(index)">删除</Button>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="total" :page-size="pageSize" show-sizer @on-change="changePage"/>
                </div>
              </div>
            </div>

            <Modal v-model="showAdd" :title="showTitle" @on-cancel="closeClassset">
              <Form
                ref="formItem"
                :model="formItem"
                :label-width="80"
                :rules="formRules"
                class="form-box"
              >
                <!--  <FormItem label="门店编号" prop="storeCode">
                  <Input v-model="formItem.storeCode" :disabled="true" placeholder="请输入门店编号"/>
                </FormItem>-->
                <FormItem label="父菜单" prop="pidName">
                  <Input v-model="formItem.pidName" :disabled="true" placeholder="请输入父节点"/>
                </FormItem>
                <FormItem label="类别编号" prop="classCode">
                  <Input v-model="formItem.classCode" :disabled="true" placeholder="类别编号"/>
                </FormItem>
                <FormItem label="类别名称" prop="className">
                  <Input v-model="formItem.className" :disabled="isShow" placeholder="请输入类别名称"/>
                </FormItem>
                <FormItem label="颜色选择">
                  <CheckboxGroup v-model="formItem.classColor">
                    <Checkbox
                      v-for="item in colorCodeList"
                      :disabled="isShow"
                      :key="item.value"
                      :label="item.value"
                    >{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem label="尺码选择">
                  <CheckboxGroup v-model="formItem.classSize">
                    <Checkbox
                      v-for="item in sizeCodeList"
                      :disabled="isShow"
                      :key="item.value"
                      :label="item.value"
                    >{{item.label}}</Checkbox>
                  </CheckboxGroup>
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
                <Button
                  type="error"
                  size="large"
                  long
                  :loading="delLoading"
                  @click="productClassDel"
                >删除</Button>
              </div>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Card>
  </div>
</template>

<script>
import { buildTree } from "@/assets/util";
import {
  productClassFindList,
  productClassFindPage,
  productClassDel,
  GetMaxClassCode,
  productClassSave,
  updateproductClass,
  goodsColorFindListByStoreCode,
  productSizeFindList,
  findClassColorList,
  findClassSizeList
} from "@/api/goods";

export default {
  data() {
    return {
      collapsed: false,
      split1: 0.25,
      subdata: [], // 用户半选和全选的数据
      choices: [], // 在右边需展示出来的数据
      power: [], // 用户全选的数据
      showAdd: false,
      delLoading: false,
      modalDel: false,
      showTitle: "",
      pid: null,
      level: 1,
      tableLoading: false,
      formItem: {
        classCode: "",
        className: "",
        pidName: "",
        pid: null,
        id: null,
        storeCode: "",
        classColor: [],
        classSize: []
      },
      colorCodeList: [],
      sizeCodeList: [],
      allTreeList: [],
      formRules: {
        className: { required: true, message: "类别名称必须填写" },
        classCode: { required: true, message: "类别编号必须填写" }
      },
      modalFlag: "add",
      editIndex: -1,
      isShow: false,
      treeListData: [
        {
          loading: false,
          selected: true,
          expand: true,
          id: null,
          classCode: "0",
          className: "全部",
          title: "全部",
          pid: null,
          pids: null,
          level: 0,
          children: []
        }
      ],
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
          sortable: true
        },
        {
          title: "分类编号",
          key: "classCode"
        },
        {
          title: "分类名称",
          key: "className"
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
      data1: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      fastQuery: "",
      formIndex: -1,
      openId: [],
      checkId: 0,
      currentTreeNode: {}
    };
  },
  methods: {
    closeOpen(t) {
      if (t.expand) {
        this.openId.push(t.id);
      } else {
        for (var d = 0; d < this.openId.length; d++) {
          if (t.id == this.openId[d]) {
            this.openId.splice(d, 1);
          }
        }
      }
    },
    async productClassFindList() {
      this.tableLoading = true;
      let fastQuery = this.fastQuery;
      let page = 0;
      let pageSize = 0;
      // let storeCode = this.storeCode;
      let pid = this.pid;
      const { data, status } = await productClassFindList({
        fastQuery,
        page,
        pageSize,
        // storeCode,
        pid
      });
      if (data.code == 200 && status == 200) {
        // console.log("data.data21", data.data);
        let TreeUpdateList = buildTree(data.data, null);
        this.treeListData[0].children = TreeUpdateList;
        this.allTreeList.push(data.data);
        // this.delTreelist.push(data.data);
        // 分页查询分类数据（table）
        this.productClassFindPage();
      } else {
        this.data1 = [];
        this.$Message.info(data.message);
      }
      this.tableLoading = false;
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 300);
    },
    async productClassFindPage(Loading) {
      this.tableLoading = true;
      let fastQuery = this.fastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      // let storeCode = this.storeCode;
      let pid = this.pid;
      const { data, status } = await productClassFindPage({
        fastQuery,
        page,
        pageSize,
        //  storeCode,
        pid
      });
      if (data.code == 200 && status == 200) {
        this.data1 = data.data.list;
        this.total = data.data.total;
      } else {
        this.data1 = [];
        this.$Message.info(data.message);
      }
      this.tableLoading = false;
      this.closeLoading(Loading);
    },
    async productClassDel() {
      console.log("productClassDel");
      this.delLoading = true;
      let id = this.data1[this.formIndex].id;
      const { data, status } = await productClassDel({ id });
      if (data.code == 200 && status == 200) {
        this.data1.splice(this.formIndex, 1);
        this.rloadTree(id);
      } else {
        this.$Message.error(data.message);
      }
      this.delLoading = false;
      this.modalDel = false;
      this.formIndex = -1;
    },
    async addClassPage() {
      let checkNode1 = this.$refs.tree.getSelectedNodes();
      if (checkNode1.length > 0) {
        this.isShow = false;
        this.$refs["formItem"].resetFields();
        //  let storeCode = this.storeCode;
        const { data, status } = await GetMaxClassCode();
        if (data.code == 200 && status == 200) {
          this.formItem.classCode = data.data;
          this.findSizeAndColorList();
          this.setClassment();
        } else {
          this.$Message.error(data.message);
        }
      } else {
        this.$Message.error("请先选择分类");
      }
    },
    async productClassSave() {
      let classCode = this.formItem.classCode;
      let className = this.formItem.className;
      let level = this.level;
      let pid = this.formItem.pid;
      let colorCode = this.formItem.classColor;
      let sizeCode = this.formItem.classSize;
      console.log("pid", pid);
      const Loading = this.$myLoading({
        content: "正在保存，请稍后…"
      });
      const obj = {
        classCode: classCode,
        className: className,
        title: className,
        level: level,
        pid: pid,
        pids: "",
        colorCodes: colorCode,
        sizeCodes: sizeCode,
        hasChildNode: ""
        // storeCode: this.storeCode
      };
      console.log("obj", obj);
      const { data, status } = await productClassSave(obj);
      if (data.code == 200 && status == 200) {
        this.productClassFindPage();
        this.data1.push(obj);
        obj.id = data.data;
        this.allTreeList[0].push(obj);
        this.treeListData[0].children = [];
        this.treeListData[0].children = this.createTree(
          this.allTreeList[0],
          null,
          -1
        ); // buildTree(this.allTreeList[0],null)
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeClassset();
          Loading.close();
        }, 1000);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    regroupTree(data, parentId, updateId, name) {
      var itemArr = [];
      for (var i = 0; i < data.length; i++) {
        var node = data[i];
        if (node.pid == parentId) {
          var newNode = {};
          newNode.id = node.id;
          newNode.storeCode = node.storeCode;
          newNode.classCode = node.classCode;
          if (node.id == updateId) {
            newNode.title = name;
            newNode.className = name;
          } else {
            newNode.title = node.className;
            newNode.className = node.className;
          }
          newNode.pid = node.pid;
          newNode.pids = node.pids;
          newNode.level = node.level;
          newNode.hasChildNode = node.hasChildNode;
          newNode.children = this.regroupTree(data, node.id, updateId, name);
          for (var j = 0; j < this.openId.length; j++) {
            if (node.id == this.openId[j]) {
              newNode.expand = true;
            }
          }
          if (node.id == this.checkId) {
            newNode.selected = true;
          }
          itemArr.push(newNode);
        }
      }
      return itemArr;
    },
    createTree(data, parentId, delId) {
      var itemArr = [];
      for (var i = 0; i < data.length; i++) {
        var node = data[i];
        if (node.pid == parentId) {
          var newNode = {};
          newNode.id = node.id;
          // newNode.storeCode = node.storeCode;
          newNode.classCode = node.classCode;
          newNode.title = node.className;
          newNode.className = node.className;
          newNode.pid = node.pid;
          newNode.pids = node.pids;
          newNode.level = node.level;
          newNode.hasChildNode = node.hasChildNode;
          newNode.children = this.createTree(data, node.id, delId);
          for (var j = 0; j < this.openId.length; j++) {
            if (node.id == this.openId[j]) {
              newNode.expand = true;
            }
          }
          if (node.id == this.checkId) {
            newNode.selected = true;
          }
          itemArr.push(newNode);
        }
      }
      return itemArr;
    },
    rloadTree(delId) {
      if (delId != null && delId != "") {
        this.treeListData[0].children = [];
        console.log("eee:", this.allTreeList[0]);
        var list1 = [];
        for (var i = 0; i < this.allTreeList[0].length; i++) {
          if (delId != this.allTreeList[0][i].id) {
            list1.push(this.allTreeList[0][i]);
          }
        }
        console.log("list1", list1);
        this.allTreeList = [];
        this.allTreeList.push(list1);
        console.log("lisy", this.allTreeList[0]);
        this.treeListData[0].children = this.createTree(
          this.allTreeList[0],
          null,
          delId
        );
      }
    },
    // 初始化方法：加载树结构和默认选中子节点分类下的所有信息
    init() {
      // 查询分类数据list（Tree）
      this.productClassFindList();
    },
    // 删除页面数据
    removeTable(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    // 选中节点查询对应的信息
    choice1(treeNode) {
      console.log(treeNode, "BUG");
      if (treeNode.length == 0) {
        this.currentTreeNode[0].selected = true;
      } else {
        this.currentTreeNode = treeNode;
        this.checkId = treeNode[0].id;
        this.pid = treeNode[0].id;
        this.fastQuery = "";
        this.formItem.pid = treeNode[0].id;
        this.pageNum = 1;
        this.productClassFindPage();
      }
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.productClassFindPage();
    },
    // 定义查询方法
    search() {
      const Loading = this.$myLoading({
        content: "正在查询商品，请稍后…"
      });
      this.productClassFindPage(Loading);
    },
    setClassment() {
      console.log("setclassment");
      this.modalFlag = "add";
      this.showAdd = true;
      this.showTitle = "新增商品类别";
      let checkNode1 = this.$refs.tree.getSelectedNodes();
      this.formItem.pidName = checkNode1[0].className;
      this.formItem.pid = checkNode1[0].id;
      this.level = checkNode1[0].level + 1;
    },
    evaluate(index) {
      this.formItem.storeCode = this.data1[index].storeCode;
      this.formItem.classCode = this.data1[index].classCode;
      this.formItem.className = this.data1[index].className;
      this.formItem.id = this.data1[index].id;
    },
    show(index) {
      console.log("class-show");
      let classCode = this.data1[index].classCode;
      this.evaluate(index);
      this.modalFlag = "show";
      this.showTitle = "查看商品类别信息";
      this.isShow = true;
      this.showAdd = true;
      this.findSizeAndColorList(classCode);
      this.findClassSizeList(classCode);
      this.findClassColorList(classCode);
    },
    edit(index) {
      console.log("class-edit");
      let classCode = this.data1[index].classCode;
      this.$refs["formItem"].resetFields();
      this.evaluate(index);
      this.editIndex = index;
      this.modalFlag = "edit";
      this.showTitle = "修改商品类别信息";
      this.showAdd = true;
      this.isShow = false;
      this.findSizeAndColorList();
      this.findClassSizeList(classCode);
      this.findClassColorList(classCode);
    },
    async updateproductClass() {
      const Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      let index = this.editIndex;
      const item = {
        id: this.formItem.id,
        className: this.formItem.className,
        colorCodes: this.formItem.classColor,
        sizeCodes: this.formItem.classSize
        // pid:this.formItem.pid,
      };
      const { data, status } = await updateproductClass(item);
      if (data.code == 200 && status == 200) {
        this.loading = true;
        this.data1[index].className = this.formItem.className;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          Loading.close();
          this.loading = false;
          this.treeListData[0].children = [];
          this.treeListData[0].children = this.regroupTree(
            this.allTreeList[0],
            null,
            this.formItem.id,
            this.formItem.className
          );
          this.closeClassset();
        }, 1000);
      } else {
        this.loading = false;
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    /* editClassset() {
      this.$Spin.show();
      let index = this.editIndex;
      this.data1[index].storeCode = this.formItem.storeCode;
      this.data1[index].classCode = this.formItem.classCode;
      this.data1[index].className = this.formItem.className;
      this.$Spin.hide();
      this.closeClassset();
    }, */
    closeClassset() {
      console.log("classSet-closeclassset");
      this.handleReset("formItem");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(valid);
          if (this.modalFlag == "add") {
            this.productClassSave();
          } else if (this.modalFlag == "edit") {
            this.updateproductClass(); // editClassset();
          } else if (this.modalFlag == "show") {
            this.closeClassset();
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
      this.formItem.classColor = [];
      this.formItem.classSize = [];
      console.log(this.formItem.colorCode);
      // this.modalFlag = 'add';
    },

    // 调用方法打开Tree的节点
    exchangeTree(flag) {
      this.taskTreeData = this.treeChangeExpand(
        this.treeListData,
        flag,
        this.pid
      );
      console.log("treeList.data", this.treeListData);
    },
    // 递归循环Tree，给Tree所有节点加上expand属性
    treeChangeExpand(treeData, flag, pid) {
      // 循环打开Tree所有第一层节点
      let _this = this;
      console.log("ererer", treeData);
      for (var i = 0; i < treeData.length; i++) {
        // this.$set(treeData[i], "expand", flag); // 重要！用set方法
        if (treeData[i].id == pid) {
          this.$set(treeData[i], "selected", true);
        }
        if (treeData[i].children) {
          // 递归打开所有节点
          treeData[i].children = _this.treeChangeExpand(
            treeData[i].children,
            flag,
            pid
          );
        }
      }
      return treeData;
    },
    async findSizeAndColorList() {
      let storeCode = this.$store.state.user.storeCode;
      const { data: sizeData, status: sizeStatus } = await productSizeFindList({
        storeCode
      });
      const {
        data: colorData,
        status: colorStatus
      } = await goodsColorFindListByStoreCode(storeCode);
      const sizeCodeList = [];
      const colorCodeList = [];
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
      this.colorCodeList = colorCodeList;
      this.sizeCodeList = sizeCodeList;
    },
    // 获取尺码
    async findClassSizeList(classCode) {
      let item = {
        classCode: classCode
      };
      const { data, status } = await findClassSizeList(item);
      if (data.code == 200 && status == 200) {
        let sizeCodeList = [];
        let sizeData = data.data;
        for (let i = 0; i < sizeData.length; i++) {
          sizeCodeList.push(sizeData[i].sizeCode);
        }
        this.formItem.classSize = sizeCodeList;
      }
    },
    // 获取颜色
    async findClassColorList(classCode) {
      let item = {
        classCode: classCode
      };
      const { data, status } = await findClassColorList(item);
      if (data.code == 200 && status == 200) {
        let colorCodeList = [];
        let colorData = data.data;
        for (let i = 0; i < colorData.length; i++) {
          colorCodeList.push(colorData[i].colorCode);
        }
        this.formItem.classColor = colorCodeList;
      }
    }
  },
  // 执行方法
  mounted() {
    this.init();
    // this.exchangeTree(true);
  }
};
</script>

<style scoped src='./index.css' />
