<template>
  <div class="forget-password">
    <div class="title-background">
      <Steps :current="current" class="step">
        <Step title="手机号码验证" style="font-size:16px"></Step>
        <Step title="重新设定密码" style="font-size:16px"></Step>
        <Step title="设置成功" style="font-size:16px"></Step>
      </Steps>
    </div>
    <!-- 第一个表单 -->
    <Form ref="formInline" :model="formInline" :rules="ruleInline" v-show="isShow_1" class="form_1">
      <FormItem prop="phone" label="手机号">
        <Input type="text" v-model="formInline.phone" placeholder="请输入手机号" style="width:300px"></Input>
      </FormItem>
      <FormItem prop="code" label="验证码">
        <Input type="password" v-model="formInline.code" placeholder="请输入验证码" style="width:200px"></Input>
        <Button style="margin-left:10px">获取验证码</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="next('formInline')">下一步</Button>
      </FormItem>
    </Form>
    <!-- 第二个表单 -->
    <Form
      ref="formItem"
      label-position="left"
      :model="formItem"
      :rules="formItem"
      v-show="isShow_2"
      class="form_1"
    >
      <FormItem prop="firmName" label="企业名称">
        <Select v-model="formItem.firmName" style="width:300px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="user" label="新密码">
        <Input
          v-model="formItem.newPassword"
          placeholder="请输入新密码"
          style="width:300px; margin-left:12px"
        ></Input>
      </FormItem>
      <FormItem prop="password" label="确认密码">
        <Input v-model="formItem.confirmpassword" placeholder="确认密码" style="width:300px"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">完成</Button>
      </FormItem>
    </Form>
    <!-- 点击完成后显示 -->
    <div v-show="isShow_3" class="isShow_3">
      <span>
        <Icon type="md-checkmark-circle-outline" size="200" color="green"/>
      </span>
      <h2>密码设置成功！</h2>
      <!-- <p>企业号注册需要审核，审核结果会以短信告知...</p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model1: "",
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      current: 0,
      isShow_1: true,
      isShow_2: false,
      isShow_3: false,
      formInline: {
        phone: "",
        code: "",
        confirmpassword: ""
      },
      formItem: {
        firmName: "",
        confirmpassword: "",
        newPassword: ""
      },
      ruleInline: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.current = 2;
      this.isShow_2 = false;
      this.isShow_3 = true;
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    },
    next(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
      this.current = 1;
      this.isShow_1 = false;
      this.isShow_2 = true;
    }
  }
};
</script>

<style>
.step {
  width: 800px;
  /* background: #fff; */
  /* opacity: 0.7; */
  padding: 30px 0 30px 120px;
  margin:0 auto;
  background: transparent
}
.title-background{
  background:#ffffff;
}
.forget-password {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/regbg.png");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow-y: auto;
}
.form_1 {
  width: 450px;
  margin: 50px auto;
  text-align: center;
  border: 1px solid #999;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
}
.isShow_3 {
  text-align: center;
  width: 500px;
  border-radius: 10px;
  margin: 100px auto 0;
  padding: 40px;
  background-color: #fff;
}
</style>
