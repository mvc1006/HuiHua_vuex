<template>
  <div class="content-box">
    <Card title="权限设置">
      <div class="content-body">
        <Form ref="formSearch" :model="formSearch" :label-width="80" class="form-box">
          <FormItem label="快速搜索">
            <Input v-model="formSearch.depotCode" placeholder="请输入权限名称" style="width:200px"/>
            <Button type="primary" @click="onSearch" icon="ios-search" style="margin-left:15px;">查询</Button>
          </FormItem>
        </Form>
        <div style="overflow: auto;">
          <Button type="info" icon="md-trash" style="float:right; ">批量删除</Button>
          <Button
            type="info"
            icon="md-add"
            class="btn-add"
            style="float:right; margin-right:20px"
            @click="add()"
          >新增</Button>
        </div>
        <!-- <Row class="ptop20">
          <Button icon="md-add" @click="setWarement">新增</Button>
        </Row>-->
        <Table
          border
          ref="selection"
          class="table-all-width mtop15"
          :columns="columns4"
          :data="data1"
          style="margin-top:30px;"
        >
          <template slot-scope="{ row, index }" slot="action">
            <!-- <Button size="small" style="margin-right: 5px" @click="add(index)">新增</Button> -->
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              icon="ios-eye"
              @click="show(index)"
            >查看</Button>
            <Button
              type="info"
              icon="md-create"
              size="small"
              style="margin-right: 5px"
              @click="edit(index)"
            >编辑</Button>
            <Button type="error" icon="md-trash" size="small" @click="del(index)">删除</Button>
          </template>
        </Table>
        <div style="margin-top: 10px;overflow: hidden" v-if="true">
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
    <Modal v-model="showAdd" :title="title">
      <Form ref="formItem" :model="formItem" :label-width="80" class="form-box">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="formItem.roleName" placeholder="请输入登录名"/>
        </FormItem>
        <FormItem label="权限设置" prop="roleAuthen">
          <Input class="hidenInput" v-model="formItem.roleAuthen" placeholder="请输入登录名"/>
          <Tree :data="data2" show-checkbox class="treeMtop"></Tree>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
        <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模态框
      formItem: {
        roleName: "",
        roleAuthen: ""
      },
      data2: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      showAdd: false,
      title: "查看角色权限",
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "数据多点好看",
          age: 26,
          address: "数据多点好看 No. 2 Lake Park",
          date: "数据多点好看"
        }
      ],
      // 搜索
      formSearch: {
        organCode: "",
        organName: ""
      },
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          align: "center",
          title: "权限组名称",
          key: "name"
          // width: "500px"
        },
        {
          align: "center",
          title: "创建时间",
          key: "age"
          // width: "200px"
        },
        {
          align: "center",
          title: "创建人",
          key: "address"
          // width: "500px"
        },
        {
          title: "操作",
          align: "center",
          width: "300px",
          slot: "action"
        }
      ],
      // 分页相关
      total: 0,
      pageNum: 1,
      pageSize: 1
    };
  },
  methods: {
    // 搜索
    onSearch() {
      /*  if (this.formSearch.depotCode == "" && this.formSearch.depotName == "") {
        this.wareHouseList();
      } else {
        this.searchList();
      } */
    },
    // 分页相关
    changePage(pageNum) {
      /* this.pageNum = pageNum;
      this.searchList(); */
    },
    changePageSize(pageSize) {
      /*  this.pageSize = pageSize;
      this.pageNum = 1;
      this.searchList(); */
    },
    // 模态框相关
    show(index) {
      // alert("我是查看");
      this.showAdd = true;
    },
    add() {
      // alert("我是编辑");
      this.showAdd = true;
    },
    edit(index) {
      // alert("我是编辑");
      this.showAdd = true;
    },
    del(index) {
      this.$Message.info("删除按钮");
    },
    handleSubmit() {
      // alert(123)
      this.showAdd = false;
    },
    handleReset() {
      this.showAdd = false;
    }
  },
  mounted() {}
};
</script>

<style>
.hidenInput {
  display: none;
}
.treeMtop {
  margin-top: -7px;
}
</style>
