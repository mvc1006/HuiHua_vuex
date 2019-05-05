<template>
  <div class="content-box">
    <Card title="收银台详情">
      <p class="iview-fontColor">以下参数为系统默认值，为避免使用中出现错误，营业后请勿修改。</p>
      <div class="content-body">
        <Row>
          <label class="search-label fl">快速查询</label>
          <Col span="10">
            <Input v-model="fastQuery" placeholder="请输入编号、名称、IP..."/>
          </Col>
          <Col span="3" class="tc">
            <Button type="primary" @click="onSearch">查询</Button>
          </Col>
        </Row>
        <Row class="ptop20">
          <Button icon="md-add" @click="add">新增收银台</Button>
        </Row>
        <Table class="mtop15" border :loading="loading" :columns="tableColumns" :data="tableData">
          <template slot-scope="{ row, index }" slot="actions">
            <div>
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="edit(index)"
              >修改</Button>
              <Button type="error" icon="md-trash" size="small" @click="delTableData(index)">删除</Button>
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
    <Modal v-model="showModal" :title="title" @on-cancel="closeModal" width="800">
      <Form ref="formItem" :model="formItem" :label-width="120" :rules="formRules" class="form-box">
        <FormItem label="名称" prop="machineName">
          <Input v-model="formItem.machineName" :disabled="isShow" placeholder="请输入收银台名称"></Input>
        </FormItem>
        <FormItem label="IP地址" prop="machineIp">
          <Input v-model="formItem.machineIp" :disabled="isShow" placeholder="请输入收银台IP地址"></Input>
        </FormItem>
        <FormItem label="位置" prop="machinePosition">
          <Input v-model="formItem.machinePosition" :disabled="isShow" placeholder="请输入收银台位置"></Input>
        </FormItem>
        <FormItem label="开钱箱端口" prop="openboxPort">
          <Select :disabled="isShow" v-model="formItem.openboxPort">
            <Option
              v-for="item in openboxPort"
              :value="item.value"
              :key="item.value"
              placeholder="请选择开钱箱端口"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="电子秤端口" prop="balancePort">
          <Select :disabled="isShow" v-model="formItem.balancePort">
            <Option
              v-for="item in balancePort"
              :value="item.value"
              :key="item.value"
              placeholder="请选择电子秤端口"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="顾客显示屏型号" prop="guestledModel">
          <Input v-model="formItem.guestledModel" :disabled="isShow" placeholder="请输入顾客显示屏型号"></Input>
        </FormItem>-->
        <FormItem label="顾客显示屏端口" prop="guestledPort">
          <Select :disabled="isShow" v-model="formItem.guestledPort">
            <Option
              v-for="item in guestledPort"
              :value="item.value"
              :key="item.value"
              placeholder="请选择显示屏端口"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="打印机型号" prop="printerModel">
          <Input v-model="formItem.printerModel" :disabled="isShow" placeholder="请输入打印机型号"></Input>
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
  machineFindPage,
  machineSave,
  machineUpdate,
  machineDelete
} from "@/api/machine";

export default {
  name: "workstation",
  data() {
    return {
      fastQuery: "",
      loading: false,
      title: "添加收银台",
      modalFlag: "add",
      isShow: false,
      showModal: false,
      tableData: [],
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          minWidth: 60,
          align: "center",
          className: "td-index"
        },
        {
          title: "收银台编号",
          key: "machineCode",
          align: "center"
        },
        {
          title: "名称",
          key: "machineName",
          align: "center"
        },
        {
          title: "IP地址",
          key: "machineIp",
          align: "center",
          className: "td-index"
        },
        {
          title: "位置",
          key: "machinePosition",
          align: "center"
        },
        {
          title: "开钱箱端口",
          key: "openboxPort",
          align: "center"
        },
        {
          title: "电子秤端口",
          key: "balancePort",
          align: "center",
          render: (h, params) => {
            let comLits =
              params.row.balancePort == "" ? "0" : params.row.balancePort;
            if (comLits == 0) {
              return h("p", "没有安装");
            } else {
              return h("p", comLits);
            }
          }
        },
        // {
        //   title: "顾客显示屏型号",
        //   key: "guestledModel",
        //   align: "center",
        //   width: 120,
        //   minWidth: 120,
        //   className: "td-index"
        // },
        {
          title: "顾客显示屏端口",
          key: "guestledPort",
          align: "center",
          width: 120,
          minWidth: 120,
          className: "td-index",
          render: (h, params) => {
            let comLit =
              params.row.guestledPort == "" ? "0" : params.row.guestledPort;
            if (comLit == 0) {
              return h("p", "没有安装");
            } else {
              return h("p", comLit);
            }
          }
        },
        {
          title: "打印机型号",
          key: "printerModel",
          align: "center"
        },
        {
          title: "操作",
          slot: "actions",
          align: "center",
          width: 150,
          minWidth: 150,
          className: "td-index"
        }
      ],
      formItem: {
        balancePort: "",
        guestledModel: "",
        guestledPort: "",
        machineIp: "",
        machineName: "",
        machinePosition: "",
        openboxPort: "",
        printerModel: ""
      },
      openboxPort: [
        {
          value: "LPT1",
          label: "LPT1"
        },
        {
          value: "LPT2",
          label: "LPT2"
        },
        {
          value: "LPT3",
          label: "LPT3"
        },
        {
          value: "LPT4",
          label: "LPT4"
        },
        {
          value: "COM1",
          label: "COM1"
        },
        {
          value: "COM2",
          label: "COM2"
        },
        {
          value: "COM3",
          label: "COM3"
        },
        {
          value: "COM4",
          label: "COM4"
        },
        {
          value: "COM5",
          label: "COM5"
        },
        {
          value: "COM6",
          label: "COM6"
        },
        {
          value: "COM7",
          label: "COM7"
        },
        {
          value: "COM8",
          label: "COM8"
        }
      ],
      balancePort: [
        {
          value: "0",
          label: "没有安装"
        },
        {
          value: "COM1",
          label: "COM1"
        },
        {
          value: "COM2",
          label: "COM2"
        },
        {
          value: "COM3",
          label: "COM3"
        },
        {
          value: "COM4",
          label: "COM4"
        },
        {
          value: "COM5",
          label: "COM5"
        },
        {
          value: "COM6",
          label: "COM6"
        },
        {
          value: "COM7",
          label: "COM7"
        },
        {
          value: "COM8",
          label: "COM8"
        }
      ],
      guestledPort: [
        {
          value: "0",
          label: "没有安装"
        },
        {
          value: "COM1",
          label: "COM1"
        },
        {
          value: "COM2",
          label: "COM2"
        },
        {
          value: "COM3",
          label: "COM3"
        },
        {
          value: "COM4",
          label: "COM4"
        },
        {
          value: "COM5",
          label: "COM5"
        },
        {
          value: "COM6",
          label: "COM6"
        },
        {
          value: "COM7",
          label: "COM7"
        },
        {
          value: "COM8",
          label: "COM8"
        }
      ],
      formRules: {
        machineName: { required: true, message: "名称必须填写" }
      },
      modalDel: false,
      delLoading: false,
      formIndex: -1,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      storeCode: ""
    };
  },
  methods: {
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      this.search();
    },
    onSearch() {
      this.pageNum = 1;
      this.search();
    },
    search() {
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.machineFindPage(Loading);
    },
    handleData(item) {
      return {
        balancePort: item.balancePort == 0 ? "" : item.balancePort,
        guestledModel: item.guestledModel,
        guestledPort: item.guestledPort == 0 ? "" : item.guestledPort,
        machineIp: item.machineIp,
        machineName: item.machineName,
        machinePosition: item.machinePosition,
        openboxPort: item.openboxPort,
        printerModel: item.printerModel
      };
    },
    handleDataNew(item) {
      return {
        balancePort: item.balancePort == "" ? "0" : item.balancePort,
        guestledModel: item.guestledModel,
        guestledPort: item.guestledPort == "" ? "0" : item.guestledPort,
        machineIp: item.machineIp,
        machineName: item.machineName,
        machinePosition: item.machinePosition,
        openboxPort: item.openboxPort,
        printerModel: item.printerModel
      };
    },
    add() {
      this.isShow = false;
      this.$refs["formItem"].resetFields();
      this.showModals("add");
    },
    edit(index) {
      this.isShow = false;
      this.formIndex = index;
      this.formItem = this.handleDataNew(this.tableData[this.formIndex]);
      console.log(this.formItem,"1111");
      this.showModals("edit");
    },
    async addData() {
      const item = this.handleData(this.formItem);
      item.storeCode = this.storeCode;
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const { data, status } = await machineSave(item);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.machineFindPage(Loading);
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 300);
      } else {
        Loading.close();
        this.$Message.error(data.message);
      }
    },
    editData() {
      const item = this.handleData(this.formItem);
      this.machineUpdate(item);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addData();
          } else if (this.modalFlag == "edit") {
            this.editData();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      console.log("handleReset");
      this.showModal = false;
      this.isShow = false;
      this.modalFlag = "add";
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
      let title = "添加收银台";
      switch (type) {
        case "add":
          title = "添加收银台";
          break;
        case "edit":
          title = "修改收银台";
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
      const { data, status } = await machineDelete({ id });
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.machineFindPage();
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.delLoading = false;
          this.modalDel = false;
          this.formIndex = -1;
        }, 300);
      } else {
        this.$Message.error(data.message);
      }
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.search();
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 500);
    },
    async machineFindPage(Loading) {
      let fastQuery = this.fastQuery;
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      const { data, status } = await machineFindPage({
        fastQuery,
        page,
        pageSize,
        storeCode
      });
      if (data.code == 200 && status == 200) {
        this.tableData = data.data.list;
        this.total = data.data.total;
      }
      this.closeLoading(Loading);
    },
    async machineUpdate(option) {
      const options = Object.assign(this.tableData[this.formIndex], option);
      const Loading = this.$myLoading({
        content: "正在修改，请稍后…"
      });
      const { data, status } = await machineUpdate(options);
      if (data.code == 200 && status == 200) {
        this.tableData[this.formIndex] = options;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.closeModal();
          Loading.close();
        }, 300);
      } else {
        Loading.close();
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
</style>
