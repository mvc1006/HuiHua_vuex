<template>
  <div class="layout" style="height:100%; overflow:auto;">
    <Layout style="height:100%;" class="layout_layout">
      <!-- <Header style="height:30%;">
        <h1 style="color:#fff">占位符</h1>
      </Header>-->
      <Content>
        <!-- 第一个表单 -->
        <Form
          :model="formItem"
          ref="formItem"
          label-position="left"
          :label-width="100"
          :rules="ruleValidate"
          class="form_1"
          v-show="isshow_1"
        >
          <FormItem label="手机号码" prop="linkMobile">
            <Input v-model="formItem.linkMobile" placeholder="请输入手机号码"></Input>
          </FormItem>
          <FormItem label="图形验证码" prop="codeImg" v-if="flag">
            <Input v-model="formItem.codeImg" placeholder="请填写图形验证码" style="width:190px;"></Input>
            <Button style="padding:0;height:32px;margin-left:30px;">
              <img :src="formItem.imgSrc" class="codeImg" @click="getVodeImg">
            </Button>
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Input v-model="formItem.code" placeholder="请输入验证码" style="width:60%"></Input>
            <!-- <span class="gitInfo" :disabled="isShow_code" @click="codeClick()">获取验证码</span> -->
            <Button class="gitInfo" :disabled="isShow" @click="codeClick()">{{refreshTitle}}</Button>
          </FormItem>
          <FormItem label="设置密码" prop="Password">
            <Input v-model="formItem.Password" placeholder="请设置账号登陆密码"></Input>
            <p>为了密码安全，密码设置规则为：由大写字母、小写字母、数字组成~</p>
          </FormItem>
          <FormItem label="密码确认" prop="confirmPassword">
            <Input v-model="formItem.confirmPassword" placeholder="请再次输入账号登陆密码"></Input>
          </FormItem>
          <Button class="btn1" size="large" @click="go_1">继续</Button>
        </Form>
        <!-- 第二个表单 -->
        <Form
          :model="formItem"
          ref="formItem"
          label-position="left"
          :label-width="100"
          class="form_2"
          :rules="ruleValidate"
          v-show="isshow_2"
        >
          <h1>请完善企业信息</h1>
          <FormItem label="企业名称" style="margin-top:7%" prop="firmName">
            <Input v-model="formItem.firmName" placeholder="请输入企业名称"></Input>
          </FormItem>
          <FormItem label="联系人" prop="linkman">
            <Input v-model="formItem.linkman" placeholder="请输入联系人"></Input>
          </FormItem>
          <FormItem label="联系方式" prop="phone">
            <Input v-model="formItem.phone" placeholder="请输入联系方式"></Input>
          </FormItem>
          <FormItem label="所在地" prop="storeAdd">
            <Cascader
              :render-format="format"
              :data="data2"
              v-model="formItem.storeAdd"
              trigger="hover"
            ></Cascader>
          </FormItem>
          <FormItem label="营业执照" prop="businessLicense">
            <Upload action="//jsonplaceholder.typicode.com/posts/" :format="['jpg','jpeg','png']">
              <Button icon="ios-cloud-upload-outline">点击上传营业执照</Button>
            </Upload>
          </FormItem>
          <Button type="primary" size="large" class="submitBut" @click="handleSubmit('formItem')">完成</Button>
          <Button size="large" @click="cancel()">取消</Button>
        </Form>
        <!-- 点击完成之后显示的内容 -->
        <div v-show="isshow_3" class="isshow_3">
          <span>
            <Icon type="md-checkmark-circle-outline" size="200" color="green"/>
          </span>
          <h2>资料提交成功，</h2>
          <p>企业号注册需要审核，审核结果会以短信告知...</p>
        </div>
      </Content>
      <!-- <Footer style="height:10%;background-color:#666">
        <h2 style="color:#fff">我是占位符</h2>
      </Footer>-->
    </Layout>
    <Modal v-model="cancel1" draggable scrollable title="取消确认">
      <div>是否确认取消？确认取消后本次注册及填写信息将无效哦</div>
    </Modal>
  </div>
</template>

<script>
import { chinaCity, getChilds } from "@/assets/chinaCity";
import {
  storeInfoRegister,
  verifyCode,
  getVerifyCode
} from "../../api/storeInfo.js";
export default {
  data() {
    return {
      cancel1: false,
      data2: chinaCity,
      // 表单提交数据
      formItem: {
        // 注册手机号
        linkMobile: "",
        // 短信验证码
        code: "",
        // 密码
        Password: "",
        // 密码验证
        confirmPassword: "",
        // 图片验证码
        codeImg: "",
        imgSrc: "",
        // 企业名
        firmName: "",
        // 联系人
        linkman: "",
        // 联系方式
        phone: "",
        // 省市区
        storeAdd: [],
        // 营业执照
        businessLicense: ""
      },
      // 表单验证
      ruleValidate: {
        Password: [
          {
            required: true,
            // message: "密码不能为空",
            trigger: "blur",
            validator: this.validatelPassword
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "密码不一致",
            trigger: "blur",
            validator: this.validatelLinkPassword
          }
        ],
        codeImg: [
          { required: true, message: "图形验证码不能为空", trigger: "blur" }
        ],
        linkMobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        firmName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" }
        ],
        storeAdd: [
          {
            required: true,
            message: "所在地不为空",
            trigger: "change",
            type: "array"
          }
        ],
        businessLicense: [
          {
            required: true,
            message: "营业执照不能为空",
            trigger: "blur",
            type: "images"
          }
        ]
      },

      addressMap: [],
      imageId: "",
      imgCode: "",
      flag: false,
      isshow_1: true,
      isshow_2: false,
      isshow_3: false,
      // disabled: true,
      countdown: 120, // 初始化默认倒计时
      refreshTitle: "获取验证码", // 初始化默认展示文字
      timer: null,
      isShow: false
    };
  },

  methods: {
    cancel() {
      this.cancel1 = true;
    },
    // 倒计时
    settime() {
      if (!this.timer) {
        this.countdown = 120;
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 120) {
            this.countdown--;
            this.refreshTitle = "倒计时(" + this.countdown + "s)";
            this.isShow = true;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.isShow = false;
            this.refreshTitle = "重新获取验证码";
          }
        }, 1000);
      }
    },
    // 注册api
    async register() {
      let arryList = this.formItem;
      const addList = arryList.storeAdd;
      let add = [];
      addList.forEach(item => {
        add.push(this.getLabel(item));
      });
      const item = {
        linkMobile: "arryList.linkMobile",
        linkName: "arryList.linkman",
        companyName: "arryList.firmName",
        province: add[0],
        city: add[1],
        pass: "arryList.Passworde",
        vercode: "arryList.code"
        // linkMobile: "",
        // code: "",
        // Password: "",
        // confirmPassword: "",
        // codeImg: "",
        // imgSrc: "",
        // firmName: "",
        // linkman: "",
        // phone: "",
        // storeAdd: [],
        // businessLicense: ""
      };
      this.registerLoading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await storeInfoRegister(item);
      console.log(data);
      if (data.code == 200 && status == 200) {
        this.$Message.success("注册成功!");
        setTimeout(() => {
          this.registerLoading.close();
          this.GoLogin();
        }, 1000);
      } else {
        this.$Message.error(data.message);
        this.registerLoading.close();
      }
    },
    // 手机验证码api
    async verifyCode() {
      const item = {
        phone: this.formItem.linkMobile,
        imgId: this.imageId,
        imgCode: this.formItem.codeImg
      };
      const { data, status } = await verifyCode(item);
      if (data.code == 200 && status == 200) {
        this.settime();
      } else {
        console.log(data);
        this.$Message.error(data.message);
      }
    },
    // 图形验证码api
    async getVerifyCode() {
      const { data, status } = await getVerifyCode();
      if (data.code == 200 && status == 200) {
        console.log(data);
        this.formItem.imgSrc = "data:imageId/png;base64," + data.data.content;
        this.imageId = data.data.imageId;
        this.imgCode = "";
      }
    },
    GoLogin() {
      this.$router.push({
        name: "login"
      });
    },
    // 操作提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register();
          this.isshow_2 = false;
          this.isshow_3 = true;
        } else {
          this.$Message.error("必填项未填写");
        }
      });
      console.log(register());
    },
    // 卡片的显示
    go_1: function() {
      let item = this.formItem;
      if (this.formItem.linkMobile == "") {
        this.$Message.error("请填写必填项");
      } else if (item.code == "") {
        this.$Message.error("请填写必填项");
      } else if (item.Password == "") {
        this.$Message.error("请填写必填项");
      } else if (item.confirmPassword == "") {
        this.$Message.error("请填写必填项");
      } else if (item.codeImg == "") {
        this.$Message.error("请填写必填项");
      } else if (item.imgSrc == "") {
        this.$Message.error("请填写必填项");
      } else {
        this.isshow_1 = false;
        this.isshow_2 = true;
      }
    },
    // 省市区选择
    format(labels, selectedData) {
      return labels.join("-");
    },
    getLabel(value) {
      for (let i = 0; i < this.addressMap.length; i++) {
        const item = this.addressMap[i];
        if (item.value == value) {
          return item.label;
        }
      }
    },
    // 按钮验证码
    codeClick() {
      let myreg = /^1\d{10}$/;
      let linkMobile = this.formItem.linkMobile;
      if (myreg.test(linkMobile)) {
        if (!this.flag) {
          this.flag = true;
          this.getVerifyCode();
        }
      } else {
        this.$Message.error("请输入正确的手机号");
      }
      if (this.flag == true) {
        if (this.formItem.codeImg != undefined) {
          this.verifyCode();
        }
      }
    },
    // 验证密码强度
    validatelPassword(rule, value, callback) {
      let myreg = /^\d{6,12}$/;
      let Password = this.formItem.Password;
      if (!myreg.test(Password)) {
        callback(new Error("请输入6-12位的数字"));
      } else {
        callback();
      }
    },
    // 单独验证密码是否一致
    validatelLinkPassword(rule, value, callback) {
      let linkPassword = this.formItem.Password;
      console.log(value, linkPassword);
      if (value !== linkPassword) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    },
    getVodeImg() {
      this.getVerifyCode();
    }
  },
  mounted() {
    this.addressMap = getChilds();
  }
};
</script>

<style>
.submitBut {
  margin-right: 30%;
}
.isshow_3 {
  text-align: center;
  width: 500px;
  border-radius: 10px;
  margin: 100px auto 0;
  padding: 40px;
  background-color: #fff;
}
.isshow_3 h2 {
  margin-top: 20px;
  font-size: 30px;
  color: green;
}
.isshow_3 p {
  font-size: 20px;
  color: green;
  font-weight: 700;
}
.layout_layout {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/talkingdata.png");
  background-size: cover;
  background-position: 50%;
  position: relative;
}
.form_1,
.form_2 {
  width: 500px;
  margin: 100px auto 0;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 2px 3px #ffffff;
  z-index: 1;
  position: relative;
}
.form_2 {
  text-align: center;
}
.gitInfo {
  width: 30%;
  margin-left: 10%;
}
.register {
  height: 100%;
  overflow: auto;
}
.ivu-card-body {
  height: 100%;
}
.midden_h1 {
  text-align: center;
  margin-bottom: 20px;
}
i {
  margin-left: 10px;
}
.register_bottom_ul {
  overflow: hidden;
  margin-left: 45px;
}
.register_bottom_li {
  float: left;
  margin-left: 15px;
  list-style: none;
}
.btn1 {
  margin-top: 10px;
  margin-left: 45%;
}
.fontSize {
  font-size: 16px;
}
.codeImg {
  border: 1px solid #ffffff;
  cursor: pointer;
}
</style>
