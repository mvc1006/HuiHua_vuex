<template>
  <div class="content-box">
    <Card title="支付设置">
      <p class="iview-fontColor">用于支付。</p>
      <div class="content-body">
        <Row>
          <Button icon="md-add" @click="add">新增支付方式</Button>
        </Row>
        <Table
          class="table-all-width mtop15"
          border
          :loading="loading"
          :columns="tableColumns"
          :data="tableData"
        >
          <template slot-scope="{ row,index }" slot="webPay">
            <div v-if="!showDel(row.payModeName)">{{row.webPay == 1 ? "是" : "否"}}</div>
            <div v-else class="relative">
              <div class="switch-mark" @click="switchChange(index,'webPay')"></div>
              <i-switch :value="row['webPay']==1" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="actions">
            <div>
              <Button
                type="primary"
                icon="ios-eye"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
              >查看</Button>
              <Button
                type="info"
                icon="md-create"
                size="small"
                style="margin-right: 5px"
                @click="edit(index)"
              >修改</Button>
              <Button
                type="error"
                v-if="showDel(row.payModeName)"
                icon="md-trash"
                size="small"
                @click="delTableData(index)"
              >删除</Button>
            </div>
          </template>
        </Table>
        <div class="page-box" v-if="true">
          <Page
            :total="total"
            :page-size="pageSize"
            show-sizer
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          />
        </div>
      </div>
    </Card>
    <Modal v-model="showModal" :title="title" @on-cancel="closeModal" class="modal-body-scroll">
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="formRules" class="form-box">
        <FormItem label="名称" prop="payModeName" class="form-box-item">
          <Input
            v-model="formItem.payModeName"
            :disabled="modalFlag == 'show' || modalFlag == 'edit'"
            placeholder="请输入支付方式名称"
          ></Input>
        </FormItem>
        <FormItem
          label="支付方式编号"
          prop="payModeCode"
          v-if="modalFlag == 'show' || modalFlag == 'edit'"
          class="form-box-item"
        >
          <Input v-model="formItem.payModeCode" :disabled="true" placeholder="请输入支付方式名称"></Input>
        </FormItem>
        <template
          v-if="formItem.payModeName =='微信'|| formItem.payModeName=='支付宝'"
          class="form-box-item"
        >
          <FormItem label="服务商" class="form-box-item">
            <RadioGroup v-model="formItem.payType" @on-change="radioChange">
              <Radio label="1" v-if="formItem.payModeName =='微信'" :disabled="isShow">官方</Radio>
              <Radio label="2" v-if="formItem.payModeName=='支付宝'" :disabled="isShow">官方</Radio>
              <Radio label="3" :disabled="isShow">码上赢</Radio>
              <Radio label="4" :disabled="isShow">会员宝</Radio>
              <Radio label="5" :disabled="isShow">扫呗</Radio>
            </RadioGroup>
          </FormItem>
          <template v-if="formItem.payType=='1'">
            <FormItem label="商户号" prop="mchId" class="form-box-item">
              <Input v-model="formItem.mchId" :disabled="isShow"></Input>
            </FormItem>
          </template>
          <template v-if="formItem.payType=='2'">
            <FormItem label="商户号" prop="pid" class="form-box-item">
              <Input v-model="formItem.pid" :disabled="isShow"></Input>
            </FormItem>
          </template>
          <template v-if="formItem.payType=='3'" class="form-box-item">
            <FormItem label="设备号" prop="deviceId">
              <Input v-model="formItem.deviceId" :disabled="isShow"></Input>
            </FormItem>
          </template>
          <template v-if="formItem.payType=='4'" class="form-box-item">
            <FormItem label="商户号" prop="mid">
              <Input v-model="formItem.mid" :disabled="isShow"></Input>
            </FormItem>
            <FormItem label="秘钥" prop="key" class="form-box-item">
              <Input v-model="formItem.key" :disabled="isShow"></Input>
            </FormItem>
            <FormItem label="机构编码" prop="orgNo" class="form-box-item">
              <Input v-model="formItem.orgNo" :disabled="isShow"></Input>
            </FormItem>
            <FormItem label="设备号" prop="deviceId" class="form-box-item">
              <Input v-model="formItem.deviceId" :disabled="isShow"></Input>
            </FormItem>
            <FormItem label="appid" prop="appletAppId" class="form-box-item">
              <Input v-model="formItem.appletAppId" :disabled="isShow"></Input>
            </FormItem>
          </template>
          <template v-if="formItem.payType=='5'">
            <FormItem label="商户号" prop="merchantNo" class="form-box-item">
              <Input v-model="formItem.merchantNo" :disabled="isShow"></Input>
            </FormItem>
            <FormItem label="终端号" prop="terminalId" class="form-box-item">
              <Input v-model="formItem.terminalId" :disabled="isShow"></Input>
            </FormItem>
            <FormItem label="密钥" prop="accessToken" class="form-box-item">
              <Input v-model="formItem.accessToken" :disabled="isShow"></Input>
            </FormItem>
          </template>
        </template>
        <FormItem label="拥有权限" prop="checkbox" class="form-box-item">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox
              v-for="(item,index) in slotList"
              :disabled="isShow"
              :label="item.key"
              :key="index"
            >{{item.value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="备注" prop="remarks" class="form-box-item">
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
  payModeFindPage,
  payModeSave,
  payModeUpdate,
  payModeDelete,
  payConfigFind,
  payConfigSave,
  payChannelFind,
  payChannelSave
} from "@/api/payMode";
export default {
  name: "paySet",
  data() {
    return {
      storeCode: "",
      loading: false,
      title: "添加支付方式",
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
          title: "名称",
          key: "payModeName",
          align: "center"
        },
        {
          title: "支付方式编号",
          key: "payModeCode",
          align: "center"
        },
        {
          title: "是否为网络支付",
          slot: "webPay",
          align: "center"
        },
        {
          title: "是否允许前台使用",
          key: "receptionUse",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.receptionUse == 1 ? "是" : "否")
            ]);
          }
        },
        {
          title: "是否允许会员使用",
          key: "memberUse",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.memberUse == 1 ? "是" : "否")
            ]);
          }
        },
        {
          title: "备注",
          key: "remarks",
          align: "center"
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
      tableData: [],
      showModal: false,
      formItem: {
        payModeName: "",
        remarks: "",
        payModeCode: "",
        checkbox: [],
        payType: "1", // 1 微信 2支付宝 3 码上赢 4 会员宝  5 扫呗
        // 支付宝支付参数
        pid: "", // 支付宝商户号
        // 扫呗支付参数
        accessToken: "", // 扫呗密钥
        merchantNo: "", // 扫码商户号
        terminalId: "", // 扫呗终端号
        // 会员宝支付参数 or 码上赢支付参数 deviceId
        appletAppId: "", // 小程序appid
        deviceId: "", // 和融通设备号（二维码编号）or 码上赢设备号
        key: "", // 和融通密钥
        mid: "", // 和融通商户号
        orgNo: "", // 和融通机构号
        // 微信支付参数
        mchId: "" // 微信支付商户号
      },
      formRules: {
        payModeName: { required: true, message: "名称必须填写" }
      },
      slotList: [
        {
          key: "receptionUse",
          value: "是否允许前台使用"
        },
        {
          key: "memberUse",
          value: "是否允许会员使用"
        }
      ],
      modalFlag: "add",
      formIndex: -1,
      isShow: false,
      modalDel: false,
      delLoading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      this.storeCode = this.$store.state.user.storeCode;
      const Loading = this.$myLoading({
        content: "正在查询，请稍后…"
      });
      this.payModeFindPage(Loading);
    },
    showDel(name) {
      let names = [
        "现金",
        "支付宝",
        "微信",
        "欠款",
        "免单",
        "优惠券",
        "会员余额支付",
        "会员积分抵现",
        "会员优惠券支付"
      ];
      return names.indexOf(name) == -1;
    },
    resetFormItem() {
      this.formItem = {
        payModeName: "",
        remarks: "",
        payModeCode: "",
        checkbox: [],
        payType: "1", // 1 微信 2支付宝 3 码上赢 4 会员宝  5 扫呗
        // 支付宝支付参数
        pid: "", // 支付宝商户号
        // 扫呗支付参数
        accessToken: "", // 扫呗密钥
        merchantNo: "", // 扫码商户号
        terminalId: "", // 扫呗终端号
        // 会员宝支付参数 or 码上赢支付参数 deviceId
        appletAppId: "", // 小程序appid
        deviceId: "", // 和融通设备号（二维码编号）or 码上赢设备号
        key: "", // 和融通密钥
        mid: "", // 和融通商户号
        orgNo: "", // 和融通机构号
        // 微信支付参数
        mchId: "" // 微信支付商户号
      };
    },
    add() {
      console.log("add");
      this.resetFormItem();
      this.$refs["formItem"].resetFields();
      this.formIndex = -1;
      this.modalFlag = "add";
      this.title = "添加支付方式";
      this.isShow = false;
      this.showModal = true;
    },
    show(index) {
      console.log("show");
      this.resetFormItem();
      this.$refs["formItem"].resetFields();
      this.formIndex = index;
      this.modalFlag = "show";
      if (this.tableData[index].payModeName == "微信") {
        this.payChannelFind("1");
      } else if (this.tableData[index].payModeName == "支付宝") {
        this.payChannelFind("2");
      } else {
        this.showPaySet();
      }
    },
    showPaySet() {
      this.setFormItem();
      this.title = "查看支付方式";
      this.isShow = true;
      this.showModal = true;
    },
    edit(index) {
      console.log("paySet-edit");
      this.$refs["formItem"].resetFields();
      this.formIndex = index;
      this.modalFlag = "edit";
      if (this.tableData[index].payModeName == "微信") {
        this.payChannelFind("1");
      } else if (this.tableData[index].payModeName == "支付宝") {
        this.payChannelFind("2");
      } else {
        this.editPaySet();
      }
    },
    editPaySet() {
      this.setFormItem();
      this.title = "修改支付方式";
      this.isShow = false;
      this.showModal = true;
    },
    switchChange(index, key) {
      this.formIndex = index;
      const item = this.tableData[index];
      if (item[key] == 1) {
        this.$Modal.confirm({
          title: "提示",
          content: `确认关闭该支付方式`,
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            const options = {};
            options.id = item.id;
            options[key] = item[key] === 1 ? 0 : 1;
            this.payModeUpdate(options);
          }
        });
      } else {
        if (this.tableData[index].payModeName == "微信") {
          this.modalFlag = "edit";
          this.payChannelFind("1");
        } else if (this.tableData[index].payModeName == "支付宝") {
          this.modalFlag = "edit";
          this.payChannelFind("2");
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: `确认启用该支付方式`,
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              const options = {};
              options.id = item.id;
              options[key] = 1;
              this.payModeUpdate(options);
            }
          });
        }
      }
    },
    setFormItem() {
      const item = this.tableData[this.formIndex];
      this.formItem.payModeName = item.payModeName;
      this.formItem.checkbox = item.sortId;
      this.formItem.remarks = item.remarks;
      this.formItem.payModeCode = item.payModeCode;
      this.formItem.webPay = item.webPay;
      const checkbox = [];
      this.slotList.forEach(items => {
        let key = items.key;
        if (item[key]) {
          checkbox.push(key);
        }
      });
      this.formItem.checkbox = checkbox;
    },
    handleData() {
      let checkbox = this.formItem.checkbox;
      const item = {
        memberUse: 0,
        payModeName: this.formItem.payModeName,
        receptionUse: 0,
        remarks: this.formItem.remarks,
        storeCode: this.storeCode
      };
      checkbox.forEach(key => {
        item[key] = 1;
      });
      return item;
    },
    async addData() {
      const item = this.handleData();
      item.webPay = 0;
      const Loading = this.$myLoading({
        content: "正在添加，请稍后…"
      });
      const { data, status } = await payModeSave(item);
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.payModeFindPage(Loading);
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
      if (this.tableData[this.formIndex].payModeName == "微信") {
        this.payChannelSave("1");
      } else if (this.tableData[this.formIndex].payModeName == "支付宝") {
        this.payChannelSave("2");
      } else {
        const item = this.handleData();
        item.webPay = this.tableData[this.formIndex].webPay;
        this.payModeUpdate(item);
      }
    },
    async payModeUpdate(option) {
      const options = Object.assign(this.tableData[this.formIndex], option);
      const Loading = this.$myLoading({
        content: "正在修改，请稍后…"
      });
      const { data, status } = await payModeUpdate(options);
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
    },
    closeModal() {
      console.log("paySet-closeModal");
      this.handleReset("formItem");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalFlag == "add") {
            this.addData();
          } else if (this.modalFlag == "edit") {
            this.editData();
          } else if (this.modalFlag == "show") {
            this.closeModal();
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      this.showModal = false;
    },
    delTableData(index) {
      this.formIndex = index;
      this.modalDel = true;
    },
    async delSure() {
      console.log("delSure");
      this.delLoading = true;
      let id = this.tableData[this.formIndex].id;
      const { data, status } = await payModeDelete({ id });
      if (data.code == 200 && status == 200) {
        this.pageNum = 1;
        this.payModeFindPage();
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
    async payModeFindPage(Loading) {
      let page = this.pageNum;
      let pageSize = this.pageSize;
      let storeCode = this.storeCode;
      const { data, status } = await payModeFindPage({
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
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.payModeFindPage();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.payModeFindPage();
    },
    closeLoading(Loading) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        Loading && Loading.close();
      }, 500);
    },
    getPayConfigUrl() {
      let payType = this.formItem.payType;
      let urlFind = "wechatFind";
      let urlSave = "wechatSave";
      switch (payType) {
        case "1":
          urlFind = "wechatFind";
          urlSave = "wechatSave";
          break;
        case "2":
          urlFind = "aliFind";
          urlSave = "aliSave";
          break;
        case "3":
          urlFind = "gaodaFind";
          urlSave = "gaodaSave";
          break;
        case "4":
          urlFind = "treasureFind";
          urlSave = "treasureSave";
          break;
        case "5":
          urlFind = "saobeiFind";
          urlSave = "saobeiSave";
          break;
        default:
          urlFind = "wechatFind";
          urlSave = "wechatSave";
          break;
      }
      return { urlFind, urlSave };
    },
    setPayParam(data) {
      let payType = this.formItem.payType;
      if (payType == 1) {
        this.formItem.mchId = data.mchId;
      } else if (payType == 2) {
        this.formItem.pid = data.pid;
      } else if (payType == 3) {
        this.formItem.deviceId = data.deviceId;
      } else if (payType == 4) {
        this.formItem.appletAppId = data.appletAppId;
        this.formItem.deviceId = data.deviceId;
        this.formItem.key = data.treasureKey;
        this.formItem.mid = data.mid;
        this.formItem.orgNo = data.orgNo;
      } else if (payType == 5) {
        this.formItem.accessToken = data.accessToken;
        this.formItem.merchantNo = data.merchantNo;
        this.formItem.terminalId = data.terminalId;
      }
    },
    handlePayParam() {
      let payType = this.formItem.payType;
      const data = {};
      if (payType == 1) {
        data.mchId = this.formItem.mchId;
      } else if (payType == 2) {
        data.pid = this.formItem.pid;
      } else if (payType == 3) {
        data.deviceId = this.formItem.deviceId;
      } else if (payType == 4) {
        data.appletAppId = this.formItem.appletAppId;
        data.deviceId = this.formItem.deviceId;
        data.key = this.formItem.key;
        data.mid = this.formItem.mid;
        data.orgNo = this.formItem.orgNo;
      } else if (payType == 5) {
        data.accessToken = this.formItem.accessToken;
        data.merchantNo = this.formItem.merchantNo;
        data.terminalId = this.formItem.terminalId;
      }
      data.storeCode = this.storeCode;
      return data;
    },
    async payConfigSave() {
      let urlKey = this.getPayConfigUrl().urlSave;
      const option = this.handlePayParam();
      const { data, status } = await payConfigSave(urlKey, option);
      if (data.code == 200 && status == 200) {
        const item = this.handleData();
        item.webPay = 1;
        this.payModeUpdate(item);
      }
    },
    async payConfigFind(Loading) {
      let urlKey = this.getPayConfigUrl().urlFind;
      const { data, status } = await payConfigFind(urlKey);
      if (data.code == 200 && status == 200) {
        this.setPayParam(data.data);
      }
      if (this.modalFlag == "edit") {
        this.editPaySet(this.formIndex);
      } else if (this.modalFlag == "show") {
        this.showPaySet(this.formIndex);
      }
      this.closeLoading(Loading);
    },
    async radioChange(val) {
      // this.formItem.payType = val;
      const formItem = {
        payType: val, // 1 微信 2支付宝 3 码上赢 4 会员宝  5 扫呗
        // 支付宝支付参数
        pid: "", // 支付宝商户号
        // 扫呗支付参数
        accessToken: "", // 扫呗密钥
        merchantNo: "", // 扫码商户号
        terminalId: "", // 扫呗终端号
        // 会员宝支付参数 or 码上赢支付参数 deviceId
        appletAppId: "", // 小程序appid
        deviceId: "", // 和融通设备号（二维码编号）or 码上赢设备号
        key: "", // 和融通密钥
        mid: "", // 和融通商户号
        orgNo: "", // 和融通机构号
        // 微信支付参数
        mchId: "" // 微信支付商户号
      };
      this.formItem = Object.assign(this.formItem, formItem);
      let urlKey = this.getPayConfigUrl().urlFind;
      const Loading = this.$myLoading({
        content: "正在查询支付信息，请稍后…"
      });
      const { data, status } = await payConfigFind(urlKey);
      if (data.code == 200 && status == 200) {
        this.setPayParam(data.data);
      } else {
        console.log(data, status);
      }
      this.closeLoading(Loading);
    },
    async payChannelSave(type) {
      let storeCode = this.storeCode;
      const option = {};
      if (type == "1") {
        option.wechatChannel =
          this.formItem.payType == "1" ? "1" : +this.formItem.payType - 1 + "";
      } else if (type == "2") {
        option.alipayChannel =
          this.formItem.payType == "2" ? "1" : +this.formItem.payType - 1 + "";
      }
      option.storeCode = storeCode;
      const { data, status } = await payChannelSave(option);
      if (data.code == 200 && status == 200) {
        this.payConfigSave();
      }
    },
    async payChannelFind(type) {
      const Loading = this.$myLoading({
        content: "正在查询支付信息，请稍后…"
      });
      let storeCode = this.storeCode;
      this.resetFormItem();
      const { data, status } = await payChannelFind({ storeCode });
      if (data.code == 200 && status == 200) {
        if (type == "1") {
          this.formItem.payType =
            data.data.wechatChannel == "1"
              ? "1"
              : +data.data.wechatChannel + 1 + "";
        } else if (type == "2") {
          this.formItem.payType =
            data.data.alipayChannel == "1"
              ? "2"
              : +data.data.wechatChannel + 1 + "";
        }
      } else {
        if (type == "1") {
          this.formItem.payType = "1";
        } else if (type == "2") {
          this.formItem.payType = "2";
        }
      }
      this.payConfigFind(Loading);
    }
  },
  mounted() {
    console.log("paySet-mounted");
    this.init();
  }
};
</script>

<style scoped src='./index.css'>
</style>
