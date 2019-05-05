<template>
  <div class="content-box">
    <Card title="库房管理">
      <div class="content-body">
        <!--  <ButtonGroup>
          <Button icon="md-add" @click="setWarement">新增</Button>
          <Button icon="md-trash">删除</Button>
        </ButtonGroup>
        -->
        <Form ref="formSearch" :model="formSearch" :label-width="80" class="form-box">
          <FormItem label="库房名称">
            <Input v-model="formSearch.depotName" placeholder="请输入库房名称" style="width:200px"></Input>
          </FormItem>
          <FormItem label="库房编号">
            <Input v-model="formSearch.depotCode" placeholder="请输入库房编号" style="width:200px"></Input>
            <Button type="primary" @click="onSearch" icon="ios-search" style="margin-left:15px;">查询</Button>
          </FormItem>
        </Form>
        <Row class="ptop20">
          <Button icon="md-add" @click="setWarement">新增</Button>
        </Row>
        <tree-table
          class="table-all-width mtop15"
          border
          :loading="tableLoading"
          :columns="wareColumns"
          :data="wareData"
          expand-key="storeCode"
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
        <FormItem label="库房名称" prop="depotName">
          <Input v-model="formItem.depotName" :disabled="isShow" placeholder="请输入库房名称"></Input>
        </FormItem>
        <FormItem label="库房级别" prop="level">
          <Input v-model="formItem.level" :disabled="true" placeholder="请输入库房级别"></Input>
        </FormItem>
        <FormItem label="pid" class="hiddenNone">
          <Input v-model="formItem.pid" placeholder="pid"></Input>
        </FormItem>
        <FormItem label="id" class="hiddenNone">
          <Input v-model="formItem.id" placeholder="id"></Input>
        </FormItem>
        <FormItem label="备注" prop="remarks">
          <Input
            v-model="formItem.remarks"
            type="textarea"
            :disabled="isShow"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入备注信息"
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
      <Input v-model="RowId" v-if="hidden = false" placeholder="请输入库房级别"></Input>
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
  stockWareHouseList,
  stockWareHouseSave,
  stockWareHouseTreeList,
  stockWareHouseUpdata,
  stockWareHouseDelete
} from "@/api/stock";
export default {
  name: "warehouse",
  data() {
    return {
      key: "",
      tableLoading: true,
      modalDel: false,
      title: "添加库房",
      delLoading: false,
      wareDataTree: [],
      RowId: "",
      wareColumns: [
        {
          title: "门店编号",
          key: "storeCode",
          align: "left",
          headerAlign: "center"
        },
        {
          title: "库房编号",
          key: "depotCode",
          align: "center",
          width: "80px",
          headerAlign: "center"
        },
        {
          title: "库房名称",
          key: "depotName",
          align: "center",
          headerAlign: "center"
        },
        {
          title: "库房级别",
          key: "level",
          align: "center",
          width: "120px",
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
      wareData: [],
      showAdd: false,
      formSearch: {
        depotCode: "",
        depotName: ""
      },
      formItem: {
        storeCode: "",
        depotCode: "",
        depotName: "",
        level: "1",
        createTime: "",
        pid: ""
      },
      formRules: {
        depotName: { required: true, message: "库房名称必须填写" },
        level: { required: true, message: "库房级别不能为空" }
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
      this.wareHouseList();
    },
    // 查询登录名
    onSearch() {
      // this.searchList();
      if (this.formSearch.depotCode == "" && this.formSearch.depotName == "") {
        this.wareHouseList();
      } else {
        this.searchList();
      }
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.searchList();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.searchList();
    },
    resetFormItem() {
      this.formItem = {
        storeCode: "",
        depotCode: "",
        depotName: "",
        level: "1",
        createTime: "",
        pid: ""
      };
    },
    setWarement() {
      this.resetFormItem();
      this.modalFlag = "add";
      this.title = "添加库房";
      this.showAdd = true;
    },
    add(row, rowIndex) {
      this.modalFlag = "addRow";
      this.title = "添加库房";
      this.formItem.pid = row.id;
      this.formItem.level = row.level + 1;
      this.showAdd = true;
    },
    addRow() {
      this.wareHouseSave();
    },
    show(row, rowIndex) {
      this.modalFlag = "show";
      this.title = "查看库房";
      this.evaluate(row);
      this.isShow = true;
      this.showAdd = true;
    },
    evaluate(row) {
      this.formItem.storeCode = row.storeCode;
      this.formItem.depotCode = row.depotCode;
      this.formItem.depotName = row.depotName;
      this.formItem.level = row.level;
      this.formItem.id = row.pid;
      this.formItem.remarks = row.remarks;
      this.formItem.createTime = row.createTime;
    },
    edit(row, rowIndex) {
      this.modalFlag = "edit";
      this.evaluate(row);
      this.title = "修改库房";
      this.formItem.id = row.id;
      this.formItem.pid = row.pid;
      this.formItem.level = row.level;
      this.showAdd = true;
    },
    addWareset() {
      this.wareHouseSave();
    },
    editWareset() {
      this.stockWareHouseUpdata();
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
        this.$Message.error("此库房下有子级库房不能删除！");
      } else {
        let row = this.RowId;
        this.stockWareHouseDelete(row);
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
    // 查询库存信息
    async wareHouseList() {
      let item = {
        level: "1"
      };
      const { data, status } = await stockWareHouseTreeList(item);
      if (status == 200 && data.code == 200) {
        this.tableLoading = false;
        let treeNewData = data.data;
        this.wareData = treeNewData;
        console.log(this.wareData);
      } else {
        this.$Message.error(data.message);
      }
    },
    // 新增库存
    async wareHouseSave() {
      let depotName = this.formItem.depotName;
      let level = this.formItem.level;
      let pid = this.formItem.pid;
      let item = {
        depotName: depotName,
        level: level,
        pid: pid
      };
      this.Loading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await stockWareHouseSave(item);
      if (status == 200 && data.code == 200) {
        setTimeout(() => {
          this.closeWareset();
          this.Loading.close();
          this.$Message.success("保存成功!");
          this.wareHouseList();
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
          this.wareHouseList();
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
      const { data, status } = await stockWareHouseList(item);
      if (status == 200 && data.code == 200) {
        this.tableLoading = false;
        let treeNewData = data.data;
        this.total = data.data.total;
        this.wareData = treeNewData;
      } else {
        this.$Message.error(data.message);
      }
    },
    // 删除库房
    async stockWareHouseDelete(id) {
      const { data, status } = await stockWareHouseDelete(id);
      if (status == 200 && data.code == 200) {
        this.$Message.success("删除成功");
        this.wareHouseList();
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  mounted() {
    console.log("wareSet-mounted");
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
