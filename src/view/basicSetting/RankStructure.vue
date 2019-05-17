<template>
  <div class="content-box">
    <Card title="职级架构">
      <div class="content-body">
        <Row>
          <span>快速查询：</span>
          <Input type="text" v-model="fastQuery" placeholder="请输入职级名称" size="large" style="width: 300px"></Input>
          <Button type="primary" style="margin-left:20px;" size="large" @click="quickSearch">查询</Button>
        </Row>
        <Row class="ptop20"></Row>
        <tree-table
          class="table-all-width mtop15"
          border
          :loading="tableLoading"
          :columns="tableColumns"
          :data="tableData"
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
              >编辑</Button>
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
              >编辑</Button>
              <Button type="error" @click="delSureApi(row,rowIndex)" icon="md-trash" size="small">删除</Button>
            </div>
          </template>
        </tree-table>
        <div class="page-box" v-if="true">
          <Page
            class="pageClass"
            :total="total"
            :page-size="pageSize"
            show-sizer
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          />
        </div>
      </div>
    </Card>
    <!-- 模态窗-新增-查看-编辑 -->
    <Modal :mask-closable="false" v-model="showAdd" :title="title" @on-cancel="closeModal">
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="formRules" class="form-box">
        <FormItem label="上级职称" prop="superiorTitle">
          <Input type="text" v-model="formItem.superiorTitle" :disabled="showTrue" placeholder="请输入上级职称"></Input>
        </FormItem>
        <FormItem label="职级名称" prop="name">
          <Input type="text" v-model="formItem.name" :disabled="showTrue" placeholder="请输入职级名称"></Input>
        </FormItem>
        <FormItem label="创建人" prop="founder">
          <Input type="text" v-model="formItem.founder" :disabled="true" placeholder="请输入创建人"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
        <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
      </div>
    </Modal>
    <Modal :mask-closable="false" v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <Input type="text" v-model="RowId" v-if="hidden = false" placeholder="请输入库房级别"></Input>
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
export default {
  name: "RankStructure",
  data() {
    return {
      fastQuery: "", // 快速查询
      modalDel: false,
      delLoading: false,
      tableLoading: false, // tableLoading表格是否加载中
      tableColumns: [
        {
          title: "职级名称",
          key: "name",
          align: "left",
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
          title: "创建人",
          key: "createUser",
          align: "center",
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
      ], // 表格列的配置描述
      tableData: [
        {
          name: "麦当劳品牌",
          createTime: "2019-05-09 10:33",
          createUser: "admin",
          pid: 95,
          pids: "74,95",
          id: 1,
          level: 1,
          children: [
            {
              name: "运营经理",
              createTime: "2019-06-09 10:33",
              createUser: "admin",
              id: 146,
              level: 2,
              pid: 1,
              pids: "74,95,1",
              children: [
                {
                  name: "河南AAA店长",
                  createTime: "2019-06-09 10:33",
                  createUser: "admin",
                  children: []
                },
                {
                  name: "河南AAA店长",
                  createTime: "2019-06-09 10:33",
                  createUser: "admin",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "麦当劳品牌",
          createTime: "2019-05-09 10:33",
          createUser: "admin",
          id: 2,
          level: 1,
          pid: null,
          pids: null,
          children: []
        },
        {
          name: "麦当劳品牌",
          createTime: "2019-05-09 10:33",
          createUser: "admin",
          id: 12,
          level: 1,
          pid: null,
          pids: null,
          children: []
        },
        {
          name: "麦当劳品牌",
          createTime: "2019-05-09 10:33",
          createUser: "admin",
          id: 111,
          level: 1,
          pid: null,
          pids: null,
          children: []
        }
      ], // 显示的结构化数据
      showAdd: false, // 模态窗是否显示
      title: "详情", // 模态窗标题
      formItem: {
        superiorTitle: "",
        name: "",
        founder: "admin"
      }, // 表单数据对象
      formRules: {
        superiorTitle: { required: true, message: "请完善信息" },
        name: { required: true, message: "请完善信息" },
        founder: { required: true, message: "请完善信息" }
      },
      showTrue: false,
      modalFlag: "add", // 默认模态窗
      pageNum: 1, // 当前页数
      total: 5, // 总页数
      pageSize: 1, // 每页条数
      index: -1,
      newData: [],
      newDataRow: [],
      RowId: ""
    };
  },
  methods: {
    quickSearch() {},
    changePage() {},
    changePageSize() {},
    // 关闭模态窗重置form
    closeModal() {
      this.handleReset("formItem");
    },
    handleTreeSelectChange() {},
    handleTreeSelectExpand() {},
    handleTreeSelectCheckChange() {},
    handleTreeSelectClick() {},
    handleReset(name) {
      this.$refs[name].resetFields();
      this.showAdd = false;
      this.index = -1;
      this.modalFlag = "add";
      this.showTrue = false;
      this.newData = [];
    },
    // 获取每条数据
    evaluate(row) {
      this.formItem.superiorTitle = row.name;
      this.formItem.name = row.name;
      this.formItem.founder = row.createUser;
      this.formItem.level = row.level;
      this.formItem.id = row.pid;
      console.log(row.id);
    },
    // 触发新增add
    add(row, rowIndex) {
      this.modalFlag = "addRow";
      this.title = "新增信息";
      this.formItem.pid = row.id;
      this.formItem.level = row.level + 1;
      this.formItem.superiorTitle = row.name;
      this.showAdd = true;
      this.newData = row;
    },
    // 触发查看show
    show(row, rowIndex) {
      this.modalFlag = "show";
      this.title = "查看信息";
      this.evaluate(row);
      this.showTrue = true;
      this.showAdd = true;
    },
    // 触发修改edit
    edit(row, rowIndex) {
      this.modalFlag = "edit";
      this.evaluate(row);
      this.title = "修改信息";
      this.formItem.id = row.id;
      this.formItem.pid = row.pid;
      this.formItem.level = row.level;
      this.showAdd = true;
    },
    // 触发删除
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
        // let row = this.RowId;
        // this.stockWareHouseDelete(row);
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
    // 提交触发添加-查看-编辑-新增
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "addRow") {
            this.addRow();
          } else if (this.modalFlag == "edit") {
            this.editWareset();
          } else if (this.modalFlag == "show") {
            this.closeWareset();
          }
        } else {
          this.$Message.error("请完善信息！");
        }
      });
    },
    append(dataList) {
      const children = dataList.children || [];
      children.push({
        name: "河南bbb店长",
        createTime: "2019-06-09 10:33",
        createUser: "admin",
        children: []
      });
      this.$set(dataList, "children", children);
    },
    // 模态窗新增保存
    addRow() {
      let dataList = this.newData;
      this.append(dataList);
      this.handleReset("formItem");
    }
  }
};
</script>

<style scoped>
</style>
