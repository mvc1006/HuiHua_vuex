<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="phone">
      <!-- <Input type="text" v-model="value14" v-show="false"/>
      <Input type="password" v-model="value14" v-show="false"/> -->
      <Input v-model="form.phone" placeholder="请输入手机号" @on-blur="searchUserId">
        <span slot="prepend">
          <Icon :size="16" type="ios-phone-portrait"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <div class="ivu-input-group-prepend" style="float:left;width:31px;height:31px;">
        <span>
          <i class="ivu-icon ivu-icon-ios-football" style="font-size: 16px;"></i>
        </span>
      </div>
      <Select
        v-model="form.userId"
        class="selectList"
        :disabled="disabledSelect"
        placeholder="请选择角色"
        style="width:236px;;border-left:0;"
      >
        <Option v-for="item in userIdList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem prop="pwd">
      <Input
        type="password"
        v-model="form.pwd"
        placeholder="请输入密码"
      >
      <span slot="prepend">
        <Icon
          :size="14"
          type="md-lock"
        ></Icon>
      </span>
      </Input>
    </FormItem>
    <!-- <FormItem prop="pwd">
      <Input :type="inputType" v-model="form.pwd" placeholder="请输入密码" @on-focus="setType">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem> -->
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { storeUserFindListByLinkMobile } from "@/api/storeUser";
export default {
  name: "LoginForm",
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "手机号不能为空", trigger: "blur" }];
      }
    },
    pwdRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      form: {
        phone: "",
        userId: "",
        pwd: ""
      },
      userIdList: [],
      disabledSelect: true,
      isShowSelect: false,
      inputType: "text",
      value14: ""
    };
  },
  computed: {
    rules() {
      return {
        phone: this.phoneRules,
        pwd: this.pwdRules
      };
    }
  },
  methods: {
    setType() {
      this.inputType = "password";
      console.log("setType");
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            phone: this.form.phone,
            userId: this.form.userId,
            pwd: this.form.pwd
          });
        }
      });
    },
    async getUserIdList() {
      let linkMobile = this.form.phone;
      if (!linkMobile) return false;
      // const Loading = this.$myLoading({ content: "正在获取角色列表…" });
      const { data, status } = await storeUserFindListByLinkMobile(linkMobile);
      const res = [];
      if (status == 200) {
        data.data.forEach(item => {
          res.push({
            value: item.id,
            label: item.roleName
          });
        });
        this.userIdList = res;
        this.disabledSelect = false;
        this.isShowSelect = true;
      }
      // setTimeout(() => {
      //   Loading.close();
      // }, 1000);
    },
    searchUserId() {
      this.getUserIdList();
    }
  },
  mounted() {}
};
</script>
