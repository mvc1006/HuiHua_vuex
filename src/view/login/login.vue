<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p @click="GoRegister" class="login-tip">立即注册</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
import { setMeunlistInLocalstorage } from "@/libs/util";
import { loginStoreMenu } from "@/api/storeInfo";
import storage from "@/libs/storage";
export default {
  data() {
    return {
      Loading: "value"
    };
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo", "getMenuList"]),
    handleSubmit({ mobile, pass, companyNo }) {
      window.Loading = this.$myLoading({ content: "正在登录…" });
      this.handleLogin({ mobile, pass, companyNo }).then(
        res => {
          const { code, data, message } = res;
          if (code == 200) {
            // storage.getStorage('storeInfo');
            storage.setStorage("storeInfo", data);
            storage.setStorage("token", data.token);
            this.getUserInfo(data).then(result => {
              if (result) {
                let adminFlag = 1;
                let menuFlag = 1;
                this.loginStoreMenu({
                  adminFlag: adminFlag,
                  menuFlag: menuFlag
                });
              }
            });
          } else {
            window.Loading.close();
            this.$Message.error(message);
          }
        },
        reject => {
          if (reject.message == "Network Error") {
            window.Loading.close();
            this.$Message.error({ content: "杜总接口不给力", duration: 2000 });
          } else {
            window.Loading.close();
            this.$Message.error(reject.message);
          }
        }
      );
    },
    tohome() {
      this.$router.push({
        // path: '/' + this.$config.homeName
        name: this.$config.homeName
      });
      // window.Loading.close();
    },
    GoRegister() {
      this.$router.push({
        name: "register"
      });
    },
    loginStoreMenu({ adminFlag, menuFlag }) {
      loginStoreMenu({ adminFlag: adminFlag, menuFlag: menuFlag }).then(res => {
        let navlist = res.data.data;
        console.log(navlist, "navlist");
        for (let i = 0; i < navlist.length; i++) {
          let listName = navlist[i].name; // 获取name值
          console.log(listName, "nnnn");
          let str = listName.replace("/", ""); // 替换
          navlist[i].name = str; // 重新赋值

          // 获取图标
          let iconImg = navlist[i].icon;
          // 赋值空字符串
          console.log(iconImg);
          if (iconImg == null) {
            navlist[i].icon = navlist[i].meta.icon;
          }

          // 获取父级下面的子级数量以及图标
          let numBer = 0;
          if (
            navlist[i] &&
            navlist[i].children &&
            navlist[i].children.length > 0
          ) {
            numBer = navlist[i].children.length;
          }
          for (let j = 0; j < numBer; j++) {
            let numBerIcon = navlist[i].children[j].menuIco;

            // 子图图标
            if (numBerIcon == null) {
              navlist[i].children[j].icon = "ios-disc";
            }
          }
          // 如果等于1则显示父级
          if (numBer == 1) {
            navlist[i].meta.showAlways = true;
          }
          if (navlist[i].path == "/home") {
            navlist[i].path = "/";
            navlist[i].name = "_home";
            navlist[i].meta.showAlways = false;
            navlist[i].meta.hideInMenu = true;
            navlist[i].meta.notCache = true;
            navlist[i].hideInMenu = true;
          }
        }
        setMeunlistInLocalstorage(navlist);
        this.getMenuList();
        this.tohome();
      });
    }
  }
};
</script>

<style>
</style>
