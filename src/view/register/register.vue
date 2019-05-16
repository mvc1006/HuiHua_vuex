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
          label-position="left"
          :label-width="100"
          :rules="ruleValidate"
          class="form_1"
          v-show="isshow_1"
        >
          <FormItem label="手机号码" >
            <Input v-model="formItem.linkMobile" placeholder="请输入手机号码"></Input>
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Input v-model="formItem.code" placeholder="请输入验证码" style="width:60%"></Input>
            <!-- <span class="gitInfo" :disabled="isShow_code" @click="codeClick()">获取验证码</span> -->
            <Button class="gitInfo" :disabled="isShow_code" @click="codeClick()">获取验证码</Button>
          </FormItem>
          <FormItem label="设置密码" prop="password">
            <Input v-model="formItem.password" placeholder="请设置账号登陆密码"></Input>
            <p>为了密码安全，密码设置规则为：由大写字母、小写字母、数字组成~</p>
          </FormItem>
          <FormItem label="密码确认" prop="confirmpassword">
            <Input v-model="formItem.confirmpassword" placeholder="请再次输入账号登陆密码" ></Input>
          </FormItem>
          <Button @click="go_1" class="btn1" size="large" :disabled="dis">继续</Button>
        </Form>
        <!-- 第二个表单 -->
        <Form
          :model="formData"
          label-position="left"
          :label-width="100"
          class="form_2"
          :rules="ruleValidate1"
          v-show="isshow_2"
        >
          <h1>请完善企业信息</h1>
          <FormItem label="企业名称" style="margin-top:7%" prop="firmName">
            <Input v-model="formData.firmName" placeholder="请输入企业名称"></Input>
          </FormItem>
          <FormItem label="联系人" prop="linkman">
            <Input v-model="formData.linkman" placeholder="请输入联系人" ></Input>
          </FormItem>
          <FormItem label="联系方式" prop="phone">
            <Input v-model="formData.phone" placeholder="请输入联系方式" ></Input>
          </FormItem>
          <FormItem label="所在地" prop="storeAdd">
            <Cascader
              :render-format="format"
              :data="data2"
              v-model="formData.storeAdd"
              trigger="hover"
            ></Cascader>
          </FormItem>
          <FormItem label="营业执照" prop="businessLicense">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">点击上传营业执照</Button>
            </Upload>
          </FormItem>
          <Button type="primary" size="large" class="submitBut" @click="handleSubmit">完成</Button>
          <Button size="large">取消</Button>
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
  </div>
</template>

<script>
import { chinaCity, getChilds } from "@/assets/chinaCity";
export default {
  data() {
    return {
      data2: chinaCity,
      formItem: {
        linkMobile: "",
        code: "",
        password: "",
        passd: "",
        confirmpassword: ""
      },
      formData: {
        firmName: "",
        linkman: "",
        phone: "",
        storeAdd: [],
        businessLicense: ""
      },
      ruleValidate: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        confirmpassword: [
          {
            required: true,
            message: "密码不一致",
            trigger: "blur",
            validator: this.validatelLinkPassword
          }
        ],
        linkMobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
            validator: this.validatelLinkPhone
          }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      },
      ruleValidate1: {
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
          { required: true, message: "所在地不为空", trigger: "change", type: "array" }
        ],
        businessLicense: [
          { required: true, message: "营业执照不能为空", trigger: "blur" }
        ]
      },
      addressMap: [],
      isShow_code: false,
      isshow_1: true,
      isshow_2: false,
      isshow_3: false,
      dis: false
    };
  },
  methods: {
    handleSubmit: function() {
      this.isshow_2 = false;
      this.isshow_3 = true;
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    },
    // 卡片的显示
    go_1: function() {
      this.isshow_1 = false;
      this.isshow_2 = true;
    },
    format(labels, selectedData) {
      labels.join("-");
    },
    codeClick() {
      alert("我是验证码");
    },
    getLabel(value) {
      for (let i = 0; i < this.addressMap.length; i++) {
        const item = this.addressMap[i];
        if (item.value == value) {
          return item.label;
        }
      }
    }
  },
  mounted() {
    this.addressMap = getChilds();
  },
  // 验证手机号
  validatelLinkPhone(rule, value, callback) {
    let myreg = /^1\d{10}$/;
    let linkMobile = this.formItem.linkMobile;
    if (!myreg.test(linkMobile)) {
      callback(new Error("请输入正确手机号"));
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
</style>
