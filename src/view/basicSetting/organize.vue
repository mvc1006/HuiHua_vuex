<template>
  <div class="content-box">
    <Card title="组织机构">
      <div class="content-body">
        <Form ref="formSearch" :model="formSearch" :label-width="80" class="form-box">
          <FormItem label="快速搜索">
            <Input v-model="formSearch.name" placeholder="请输入机构名称" style="width:200px"/>
            <Button type="primary" @click="onSearch" icon="ios-search" style="margin-left:15px;">查询</Button>
          </FormItem>
        </Form>
        <!-- <Row class="ptop20">
          <Button icon="md-add" @click="setWarement">新增</Button>
        </Row>-->
        <tree-table
          class="table-all-width mtop15"
          border
          :loading="tableLoading"
          :columns="organColumns"
          :data="organData"
          expand-key="name"
          :expand-type="false"
          :selectable="false"
          :show-index="true"
          children-prop="children"
        >
          <template slot-scope="{ row, rowIndex }" slot="actions">
            <div v-if="row.pids && row.pids.split(',').length >3">
              <Button
                type="primary"
                icon="ios-eye"
                size="small"
                style="margin-right: 5px"
                @click="show(row,rowIndex)"
              >查看</Button>
              <Button
                style="margin-right: 5px"
                type="info"
                icon="md-create"
                size="small"
                @click="edit(row,rowIndex)"
              >修改</Button>
              <Button type="error" @click="delSureApi(row,rowIndex)" icon="md-trash" size="small">删除</Button>
            </div>
            <div v-else>
              <Button
                type="primary"
                icon="md-add"
                size="small"
                style="margin-right: 5px"
                @click="add(row,rowIndex)"
              >新增</Button>
              <Button
                type="primary"
                icon="ios-eye"
                size="small"
                style="margin-right: 5px"
                @click="show(row,rowIndex)"
              >查看</Button>
              <Button
                style="margin-right: 5px"
                type="info"
                icon="md-create"
                size="small"
                @click="edit(row,rowIndex)"
              >修改</Button>
              <Button type="error" @click="delSureApi(row,rowIndex)" icon="md-trash" size="small">删除</Button>
            </div>
          </template>
        </tree-table>
        <div style="margin-top: 10px;overflow: hidden" v-if="false">
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
    </Card>
    <Modal v-model="showAdd" :title="title" @on-cancel="closeWareset">
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="formRules" class="form-box">
        <FormItem label="上级机构" prop="parentName">
          <Input v-model="formItem.parentName" :disabled="true"/>
        </FormItem>
        <FormItem label="机构名称" prop="name">
          <Input v-model="formItem.name" :disabled="isShow" placeholder="请输入机构名称"/>
        </FormItem>
        <FormItem label="机构级别" prop="level">
          <Input v-model="formItem.level" :disabled="true"/>
        </FormItem>
        <FormItem label="是否是店家" prop="storeFlag">
          <RadioGroup v-model="formItem.storeFlag">
            <Radio label="1" :disabled="isShow">是</Radio>
            <Radio label="2" :disabled="isShow">否</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="pid" class="hiddenNone">
          <Input v-model="formItem.pid" placeholder="pid"/>
        </FormItem>
        <FormItem label="id" class="hiddenNone">
          <Input v-model="formItem.id" placeholder="id"/>
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
      <Input v-model="RowId" v-if="hidden = false" placeholder="请输入库房级别"/>
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
/* import {
  stockorganList,
  stockorganSave,
  stockWareHouseTreeList,
  stockWareHouseUpdata,
  organDelete
} from "@/api/stock"; */
export default {
  name: "organize",
  data() {
    return {
      key: "",
      tableLoading: true,
      modalDel: false,
      title: "添加组织机构",
      delLoading: false,
      organDataTree: [],
      RowId: "",
      organColumns: [
        {
          title: "组织名称",
          key: "name",
          align: "left",
          headerAlign: "center"
        },
        {
          title: "创建人",
          key: "createUser",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          width: "150px",
          headerAlign: "center"
        },
        {
          title: "操作",
          align: "center",
          width: "280px",
          type: "template",
          template: "actions",
          headerAlign: "center",
          className: "td-index"
        }
      ],
      organData: [
        {
          id: 121,
          name: "化妆品公司",
          pid: null,
          pids: null,
          level: 1,
          createTime: "2019-03-19 15:34:58",
          yn: 1,
          children: [
            {
              id: 122,
              name: "化妆品二级库房",
              pid: 121,
              pids: "121",
              level: 2,
              createTime: "2019-03-19 15:35:38",
              yn: 1,
              children: [
                {
                  id: 123,
                  name: "化妆品三级库房",
                  pid: 122,
                  pids: "121,122",
                  level: 3,
                  createTime: "2019-03-19 15:35:55",
                  yn: 1,
                  storeFlag: 2,
                  children: [],
                  radionCheck: false
                }
              ],
              radionCheck: false
            }
          ],
          radionCheck: false
        }
      ],
      showAdd: false,
      formSearch: {
        name: ""
      },
      formItem: {
        name: "",
        createUser: "",
        createTime: "",
        pid: "",
        parentName: "",
        storeFlag: "2"
      },
      formRules: {
        name: { required: true, message: "机构名称必须填写" }
      },
      modalFlag: "add",
      newDataRow: [],
      editIndex: -1,
      isShow: false,
      checkIndex: -1,
      treeNewArry: [],
      pageNum: 1,
      pageSize: 1,
      total: 0
    };
  },
  methods: {
    init() {
      //   this.organList();
    },
    // 树形下拉框开始
    /* changeTreeSelectData() {
      this.treeSelected = [111, 114];
    },
    changeTreeData() {
      this.treeData = newTreeData;
    },
    handleTreeSelectChange(list) {
    },
    handleTreeSelectExpand(item) {
    },
    handleTreeSelectCheckChange(selectedArray, item) {
    },
    handleTreeSelectClick(selectArray, item) {
    },
    loadData(item, callback) {
      setTimeout(() => {
        let data = [
          {
            id: 111,
            title: "1-1-1"
          },
          {
            id: 112,
            title: "1-1-2"
          },
          {
            id: 113,
            title: "1-1-3"
          },
          {
            id: 114,
            title: "1-1-4"
          }
        ];
        callback(data);
      }, 1000);
    }, */
    // 树形下拉框结束
    // 查询登录名
    onSearch() {
      /*  if (this.formSearch.depotCode == "" && this.formSearch.depotName == "") {
        this.organList();
      } else {
        this.searchList();
      } */
    },
    // 分页
    changePage(pageNum) {
      /* this.pageNum = pageNum;
      this.searchList(); */
    },
    changePageSize(pageSize) {
      /*  this.pageSize = pageSize;
      this.pageNum = 1;
      this.searchList(); */
    },
    resetFormItem() {
      this.formItem = {
        name: "",
        createUser: "",
        createTime: "",
        pid: "",
        parentName: ""
      };
    },
    setWarement() {
      this.resetFormItem();
      this.modalFlag = "add";
      this.title = "添加机构";
      this.showAdd = true;
    },
    add(row, rowIndex) {
      this.modalFlag = "addRow";
      this.title = "添加机构";
      this.formItem.pid = row.id;
      this.showAdd = true;
      this.formItem.parentName = row.name;
      this.formItem.level = row.level + 1;
    },
    addRow() {
      /*  this.organSave(); */
    },
    show(row, rowIndex) {
      this.modalFlag = "show";
      this.title = "查看机构";
      this.evaluate(row);
      this.isShow = true;
      this.showAdd = true;
    },
    evaluate(row) {
      this.formItem.name = row.name;
      this.formItem.id = row.pid;
      this.formItem.createUser = row.createUser;
      this.formItem.createTime = row.createTime;
      this.formItem.parentName = row.name;
      this.formItem.level = row.level;
      this.formItem.storeFlag = JSON.stringify(row.storeFlag);
    },
    edit(row, rowIndex) {
      this.modalFlag = "edit";
      this.evaluate(row);
      this.title = "修改机构";
      this.formItem.id = row.id;
      this.formItem.pid = row.pid;
      this.showAdd = true;
    },
    addWareset() {
      /*  this.organSave(); */
    },
    editWareset() {
      /*  this.stockWareHouseUpdata(); */
    },
    closeWareset() {
      console.log("wareSet-closeWareset");
      this.handleReset("formItem");
    },
    delSureApi(row) {
      this.newDataRow = [];
      this.newDataRow = row;
      this.RowId = "";
      this.modalDel = true;
      this.RowId = row.id;
    },
    delSure() {
      let delData = this.newDataRow;
      if (delData.children.length > 0) {
        this.$Message.error("此机构下有子级机构不能删除！");
      } else {
        let row = this.RowId;
        this.organDelete(row);
      }
      this.delLoading = true;
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.setTimeout = false;
        this.modalDel = false;
        this.delLoading = false;
        this.formIndex = -1;
      }, 2000);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addWareset();
          } else if (this.modalFlag == "addRow") {
            this.addRow();
          } else if (this.modalFlag == "edit") {
            this.editWareset();
          } else if (this.modalFlag == "show") {
            this.closeWareset();
          }
        } else {
          // this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.showAdd = false;
      this.isShow = false;
      this.editIndex = -1;
      this.modalFlag = "add";
    },
    // 查询机构信息
    async organList() {
      let item = {
        level: "1"
      };
      const { data, status } = await stockWareHouseTreeList(item);
      if (status == 200 && data.code == 200) {
        this.tableLoading = false;
        let treeNewData = data.data;
        this.organData = treeNewData;
        console.log(this.organData);
      } else {
        this.$Message.error(data.message);
      }
    },
    // 新增机构
    async organSave() {
      let depotName = this.formItem.depotName;
      let level = this.formItem.level;
      let pid = this.formItem.pid;
      let item = {
        depotName: depotName,
        level: level,
        pid: pid
      };
      this.Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await stockorganSave(item);
      if (status == 200 && data.code == 200) {
        setTimeout(() => {
          this.closeWareset();
          this.Loading.close();
          this.$Message.success("保存成功!");
          this.organList();
        }, 1000);
      } else {
        this.Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 修改库存
    async stockWareHouseUpdata() {
      let depotName = this.formItem.depotName;
      let level = this.formItem.level;
      let id = this.formItem.id;
      let item = {
        depotName: depotName,
        level: level,
        id: id
      };
      console.log(item);
      this.Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await stockWareHouseUpdata(item);
      if (status == 200 && data.code == 200) {
        setTimeout(() => {
          this.closeWareset();
          this.Loading.close();
          this.$Message.success("保存成功!");
          this.organList();
        }, 1000);
      } else {
        this.Loading.close();
        this.$Message.error(data.message);
      }
    },
    // 条件查询
    async searchList() {
      let item = {
        depotCode: this.formSearch.depotCode,
        depotName: this.formSearch.depotName,
        pageSize: this.pageSize,
        page: this.pageNum
      };
      const { data, status } = await stockorganList(item);
      if (status == 200 && data.code == 200) {
        this.tableLoading = false;
        let treeNewData = data.data;
        this.total = data.data.total;
        this.organData = treeNewData;
      } else {
        this.$Message.error(data.message);
      }
    },
    // 删除库房
    async organDelete(id) {
      const { data, status } = await organDelete(id);
      if (status == 200 && data.code == 200) {
        this.$Message.success("删除成功");
        this.organList();
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

<style>
.checkInput {
  position: relative;
}
.checkbox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  z-index: 90;
  cursor: pointer;
}
.hiddenNone {
  display: none;
}
</style>
