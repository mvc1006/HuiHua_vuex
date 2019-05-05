<template>
  <div class="content-box">
    <Card title="条码秤信息">
      <Row>
        <Button v-if="showBtn == true" icon="md-add" @click="popupBtn">新增条码秤信息</Button>
      </Row>
      <div class="content-body">
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
            </div>
          </template>
        </Table>
      </div>
    </Card>
    <Modal v-model="showModal" :title="title" @on-cancel="closeModal" width="800">
      <Form ref="formItem" :model="formItem" :label-width="120" :rules="formRules" class="form-box">
        <FormItem label="条码标志位长度" prop="flagLength">
          <Select v-model="formItem.flagLength" @on-change="flagSelect" placeholder="请选择条码标志位长度">
            <Option
              v-for="item in flagLength"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="条码秤标志位" prop="flagContent">
          <Input
            v-model="formItem.flagContent"
            :maxlength="maxLength"
            :disabled="inputHiden"
            placeholder="请输入条码秤标志位"
          ></Input>
        </FormItem>
        <FormItem label="商品编号长度" prop="codeLength">
          <Select v-model="formItem.codeLength" placeholder="请选择商品编号长度">
            <Option
              v-for="item in codeLength"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="内容码长度" prop="expressLength">
          <Select v-model="formItem.expressLength" placeholder="请选择内容码长度">
            <Option
              v-for="item in expressLength"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="内容码精度" prop="expressAccuracy">
          <Select v-model="formItem.expressAccuracy" placeholder="请选择内容码精度">
            <Option
              v-for="item in expressAccuracy"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="内容码表示为" prop="expressFlag">
          <Select v-model="formItem.expressFlag">
            <Option
              v-for="item in expressFlag"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
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
import { balanceFlag, balanceFlagSave, balanceFlagUpdate } from "@/api/machine";
export default {
  name: "balanceFlag",
  data() {
    return {
      showBtn: true,
      loading: false,
      title: "添加条码秤信息",
      modalFlag: "popupBtn",
      isShow: false,
      showModal: false,
      tableData: [],
      inputHiden: true,
      maxLength: 1,
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
          title: "条码标志位长度",
          key: "flagLength",
          align: "center"
        },
        {
          title: "条码秤标志位",
          key: "flagContent",
          align: "center"
        },
        {
          title: "商品编号长度",
          key: "codeLength",
          align: "center"
        },
        {
          title: "内容码长度",
          key: "expressLength",
          align: "center"
        },
        {
          title: "内容码精度",
          key: "expressAccuracy",
          align: "center"
        },
        {
          title: "表示码标识",
          key: "expressFlag",
          align: "center",
          render: (h, params) => {
            let status = params.row.expressFlag; //  0金额 1重量 ,
            if (status === 0) {
              return h("p", "金额");
            }
            if (status === 1) {
              return h("p", "重量");
            }
          }
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
        codeLength: "",
        expressAccuracy: "",
        expressFlag: "",
        expressLength: "",
        flagLength: ""
      },
      flagLength: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        }
      ],
      expressAccuracy: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        }
      ],
      codeLength: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        },
        {
          value: 6,
          label: "6"
        },
        {
          value: 7,
          label: "7"
        },
        {
          value: 8,
          label: "8"
        }
      ],
      expressLength: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        },
        {
          value: 6,
          label: "6"
        },
        {
          value: 7,
          label: "7"
        },
        {
          value: 8,
          label: "8"
        }
      ],
      expressFlag: [
        {
          value: 0,
          label: "金额"
        },
        {
          value: 1,
          label: "重量"
        }
      ],
      formRules: {
        codeLength: { required: true, message: "此项不能为空" },
        expressAccuracy: { required: true, message: "此项不能为空" },
        expressFlag: { required: true, message: "此项不能为空" },
        expressLength: { required: true, message: "此项不能为空" },
        flagContent: {
          required: true,
          trigger: "blur",
          validator: this.flagValue
        },
        flagLength: { required: true, message: "此项不能为空" }
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
      this.balanceFlag();
    },
    flagValue(rule, value, callback) {
      let numBers = this.formItem.flagLength;
      let res = /^[0-9]*$/;
      if (!res.test(value)) {
        callback(new Error("请输入纯数字"));
      } else {
        if (numBers == "1") {
          if (value == "") {
            callback(new Error("请输入一位数字"));
          } else {
            callback();
          }
        } else if (numBers == "2") {
          if (value.length == 2) {
            callback();
          } else {
            callback(new Error("请输入两位数字"));
          }
        }
      }
    },
    flagSelect() {
      this.inputHiden = false;
      this.$nextTick(() => {
        let numBers = this.formItem.flagLength;
        if (numBers == "1") {
          this.maxLength = 1;
          this.formItem.flagContent = "";
        } else if (numBers == "2") {
          this.maxLength = 2;
          this.formItem.flagContent = "";
        }
      });
    },
    handleData(item) {
      return {
        codeLength: item.codeLength,
        expressAccuracy: item.expressAccuracy,
        expressFlag: item.expressFlag,
        expressLength: item.expressLength,
        flagContent: item.flagContent,
        flagLength: item.flagLength
      };
    },
    popupBtn() {
      this.showModal = true;
      this.showModals("popupBtn");
      this.$refs["formItem"].resetFields();
    },
    edit(index) {
      this.isShow = false;
      this.formIndex = index;
      this.inputHiden = false;
      this.formItem = this.handleData(this.tableData[this.formIndex]);
      let numBers = this.formItem.flagLength;
      if (numBers == "1") {
        this.maxLength = 1;
      } else if (numBers == "2") {
        this.maxLength = 2;
      }
      this.showModals("edit");
    },
    async addData() {
      const item = this.handleData(this.formItem);
      item.storeCode = this.storeCode;
      console.log("debug");
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const { data, status } = await balanceFlagSave(item);
      if (data.code == 200 && status == 200) {
        this.balanceFlag(Loading);
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
    async balanceFlagUpdate() {
      const item = this.handleData(this.formItem);
      item.id = this.tableData[this.formIndex].id;
      item.storeCode = this.storeCode;
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const { data, status } = await balanceFlagUpdate(item);
      if (data.code == 200 && status == 200) {
        this.balanceFlag(Loading);
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
      this.balanceFlagUpdate(item);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "popupBtn") {
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
      this.$nextTick(() => {
        if (type == "edit") {
          this.inputHiden = false;
        } else if (type == "popupBtn") {
          this.inputHiden = true;
        }
      });
    },
    closeModal() {
      this.handleReset("formItem");
    },
    setModalTitle(type) {
      let title = "添加条码秤信息";
      switch (type) {
        case "add":
          title = "添加条码秤信息";
          break;
        case "edit":
          title = "修改条码秤信息";
          break;
        default:
          break;
      }
      return title;
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 500);
    },
    async balanceFlag() {
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      const { data, status } = await balanceFlag({
        page,
        pageSize,
        storeCode
      });
      if (data.code == 200 && status == 200) {
        if (data.data.list == "") {
          this.showBtn = true;
        } else {
          this.showBtn = false;
          this.tableData = data.data.list;
          this.total = data.data.total;
        }
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
