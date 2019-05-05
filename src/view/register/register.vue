<template>
  <div class="register">
    <Card class="registerCard" :bordered="false" :shadow="true" :dis-hover="true">
      <div class="registertitle">E团火店铺注册</div>
      <Form
        class="formList"
        ref="formItem"
        :model="formItem"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="门店名称" prop="storeName">
          <Input v-model="formItem.storeName" placeholder="请输入门店名称"/>
        </FormItem>
        <FormItem label="联系人">
          <Input v-model="formItem.linkName" placeholder="请输入联系人姓名"/>
        </FormItem>
        <FormItem label="联系人手机号">
          <Input v-model="formItem.linkPhone" placeholder="请输入联系人手机号"/>
        </FormItem>
        <FormItem label="联系邮箱">
          <AutoComplete
            v-model="formItem.linkEmail"
            @on-search="handleSearch"
            placeholder="请输入联系邮箱"
          >
            <Option v-for="item in domains" :value="item" :key="item">{{ item }}</Option>
          </AutoComplete>
        </FormItem>
        <FormItem label="密码" prop="loginPassword">
          <Input type="password" v-model="formItem.loginPassword" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="确认密码" prop="loginPasswordConfirm">
          <Input type="password" v-model="formItem.loginPasswordConfirm" placeholder="请输入确认密码"/>
        </FormItem>
        <FormItem label="门店地址" prop="storeAdd">
          <Cascader
            :render-format="format"
            v-model="formItem.storeAdd"
            :data="data2"
            trigger="hover"
          ></Cascader>
        </FormItem>
        <FormItem label>
          <Input v-model="formItem.address" placeholder="请填写详细信息"/>
        </FormItem>
        <FormItem label="业态选择" prop="bussinessType">
          <Select v-model="formItem.bussinessType">
            <Option value="1">超市</Option>
            <Option value="2">服装</Option>
            <Option value="3">药店</Option>
            <Option value="4">百货</Option>
            <Option value="5">孕婴</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号" prop="linkMobile">
          <Input v-model="formItem.linkMobile" placeholder="请填写详细信息"/>
        </FormItem>
        <FormItem label="验证码" prop="codeImg" v-if="flag">
          <Input v-model="formItem.codeImg" placeholder="请填写图形验证码" style="width:200px;"></Input>
          <Button style="padding:0;height:32px;margin-left:15px;">
            <img :src="formItem.imgSrc" class="codeImg" @click="getVodeImg">
          </Button>
        </FormItem>
        <FormItem label="验证码" prop="code">
          <Input v-model="formItem.code" placeholder="请填写手机验证码" style="width:200px"></Input>
          <Button
            type="primary"
            :disabled="isShow"
            @click="codeClick()"
            style="margin-left:15px;"
          >{{refreshTitle}}</Button>
        </FormItem>

        <FormItem style="text-align:center">
          <Button
            type="primary"
            @click="handleSubmit('formItem')"
            style="width:300px;margin-left:-80px;"
          >注册提交</Button>
        </FormItem>
      </Form>
      <p @click="GoLogin" class="registerLogin">用已有账号登录</p>
    </Card>
  </div>
</template>

<script>
import { chinaCity, getChilds } from "@/assets/chinaCity";
import { storeInfoRegister, verifyCode, getVerifyCode } from "@/api/storeInfo";
export default {
  data() {
    return {
      formItem: {
        storeName: "",
        linkName: "",
        linkEmail: "",
        loginPassword: "",
        storeAdd: [],
        address: "",
        bussinessType: "",
        linkMobile: "",
        imgSrc: ""
      },
      imageId: "",
      imgCode: "",
      flag: false,
      refreshTitle: "获取验证码", // 初始化默认展示文字
      timer: null,
      isShow: false,
      countdown: 60, // 初始化默认倒计时
      ruleValidate: {
        storeName: [
          { required: true, message: "门店名称不能为空", trigger: "blur" }
        ],
        loginPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        loginPasswordConfirm: [
          {
            required: true,
            message: "密码不一致",
            trigger: "blur",
            validator: this.validatelLinkPassword
          }
        ],
        storeAdd: [
          {
            required: true,
            message: "门店地址不能为空",
            trigger: "change",
            type: "array"
          }
        ],
        bussinessType: [
          { required: true, message: "业态选择不能为空", trigger: "change" }
        ],
        linkMobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" }
        ],
        codeImg: [
          { required: true, message: "图形验证码不能为空", trigger: "blur" }
        ],
        linkEmail: [
          {
            message: "请填写有效邮箱",
            trigger: "change",
            validator: this.validatelLinkEmail
          }
        ],
        linkPhone: [
          {
            message: "请填写正确电话",
            trigger: "blur",
            validator: this.validatelLinkPhone
          }
        ]
      },
      data2: chinaCity,
      domains: [],
      addressMap: []
    };
  },
  methods: {
    format(labels, selectedData) {
      return labels.join("-");
    },

    validatelLinkEmail(rule, value, callback) {
      /* eslint-disable */
      let email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var domains = [
        "qq.com",
        "163.com",
        "vip.163.com",
        "263.net",
        "yeah.net",
        "sohu.com",
        "sina.cn",
        "sina.com",
        "eyou.com",
        "gmail.com",
        "hotmail.com",
        "42du.cn"
      ];
      let linkEmail = this.formItem.linkEmail;
      if (email.test(linkEmail)) {
        callback();
        var domain = linkEmail.substring(linkEmail.indexOf("@") + 1);
        for (var i = 0; i < domains.length; i++) {
          if (domain == domains[i]) {
            return true;
          }
        }
      } else {
        callback(new Error("请输入正确邮箱"));
      }
    },
    validatelLinkPhone(rule, value, callback) {
      let myreg = /^1\d{10}$/;
      let linkPhone = this.formItem.linkPhone;
      if (!myreg.test(linkPhone)) {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    },
    validatelLinkPassword(rule, value, callback) {
      let linkPassword = this.formItem.loginPassword;
      console.log(value, linkPassword);
      if (value !== linkPassword) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register();
        } else {
          this.$Message.error("必填项未填写");
        }
      });
    },
    handleSearch(value) {
      this.domains =
        !value || value.indexOf("@") >= 0
          ? []
          : [
            value + "@qq.com",
            value + "@163.com",
            value + "@vip.163.com",
            value + "@263.net",
            value + "@yeah.net",
            value + "@sohu.com",
            value + "@sina.cn",
            value + "@sina.com",
            value + "@eyou.com",
            value + "@gmail.com",
            value + "@hotmail.com",
            value + "@42du.cn"
          ];
    },
    codeClick() {
      let myreg = /^1\d{10}$/;
      let linkMobile = this.formItem.linkMobile;
      if (myreg.test(linkMobile)) {
        if (!this.flag) {
          this.flag = true;
          this.getVerifyCode();
        }
      } else {
        this.$Message.error("请填写正确手机号");
      }
      if (this.flag == true) {
        if (this.formItem.codeImg != undefined) {
          console.log(this.formItem.codeImg);
          this.verifyCode();
        }
      }
    },
    settime() {
      if (!this.timer) {
        this.countdown = 60;
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
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
    // 注册提交
    async register() {
      let arryList = this.formItem;
      const addList = arryList.storeAdd;
      let add = [];
      addList.forEach(item => {
        add.push(this.getLabel(item));
      });
      const item = {
        address: arryList.address,
        area: add[2],
        bussinessType: arryList.bussinessType,
        city: add[1],
        linkEmail: arryList.linkEmail,
        linkMobile: arryList.linkMobile,
        linkName: arryList.linkName,
        linkPhone: arryList.linkPhone,
        loginPassword: arryList.loginPassword,
        province: add[0],
        storeName: arryList.storeName,
        vercode: arryList.code
      };
      this.registerLoading = this.$myLoading({ content: "正在保存,请稍等..." });
      const { data, status } = await storeInfoRegister(item);
      if (data.code == 200 && status == 200) {
        this.$Message.success("注册成功!");
        setTimeout(() => {
          this.registerLoading.close();
          this.tohome();
        }, 1000);
      } else {
        this.$Message.error(data.message);
        this.registerLoading.close();
      }
    },
    // 图形验证码
    async getVerifyCode() {
      const { data, status } = await getVerifyCode();
      if (data.code == 200 && status == 200) {
        this.formItem.imgSrc = "data:image/png;base64," + data.data.content;
        this.imageId = data.data.imageId;
        this.imgCode = "";
      }
    },
    // 手机验证码
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
        this.$Message.error(data.message);
      }
    },
    tohome() {
      this.$router.push({
        name: "login"
      });
    },
    GoLogin() {
      this.$router.push({
        name: "login"
      });
    },
    getLabel(value) {
      for (let i = 0; i < this.addressMap.length; i++) {
        const item = this.addressMap[i];
        if (item.value == value) {
          return item.label;
        }
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
.register {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/regbg.png");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow-y: auto;
}
.registertitle {
  text-align: center;
  font-size: 22px;
  padding-bottom: 15px;
  border-bottom: 1px solid #cccccc;
}
.registerCard {
  position: relative;
  width: 650px;
  top: 50px;
  left: 50%;
  margin-left: -325px;
  margin-bottom: 50px;
  background-color: rgba(255, 255, 255, 0.5);
}
.formList {
  margin-top: 15px;
}
.ivu-select-dropdown.ivu-auto-complete {
  height: 300px;
  overflow: auto;
}
.registerLogin {
  text-align: right;
  margin-right: 5px;
  cursor: pointer;
  color: #57a3f3;
}
.codeImg {
  border: 1px solid #ffffff;
  cursor: pointer;
}
</style>
