<template>
  <div>
    <Card title="参数设置展示">
      <p class="iview-fontColor">以下参数为系统默认值，为避免使用中出现错误，营业后请勿修改。</p>
      <Tabs class="iview-tabsM" type="card" value="parameterList">
        <TabPane label="基础设置" name="parameterList">
          <div class="iview-selectTitle">日流水设置</div>
          <Select size="large" :transfer="true" v-model="PatternDate" style="max-width:500px">
            <Option v-for="item in Pattern" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="iview-selectTitle">电子秤称重单位</div>
          <Select size="large" :transfer="true" v-model="PatternDate1" style="max-width:500px">
            <Option v-for="item in Pattern1" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!-- <div class="iview-switchList">
            <div class="list-block">
              <span class="iview-switchList-title">是否允许会员退款</span>
              <i-switch v-model="switch1" size="large" @on-change="change">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </div>
            <div class="list-block">
              <span class="iview-switchList-title">会员积分方式</span>
              <i-switch v-model="switch2" size="large" @on-change="change">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </div>
            <div class="list-block">
              <span class="iview-switchList-title">是否限制会员输入手机号消费</span>
              <i-switch v-model="switch3" size="large" @on-change="change">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </div>
          </div>-->
        </TabPane>
        <TabPane label="收款设置" name="parameterList1">
          <div class="iview-selectTitle">结账金额精确到</div>
          <Select size="large" :transfer="true" v-model="PatternDate2" style="max-width:500px">
            <Option v-for="item in Pattern2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="iview-selectTitle">结账金额计算方法</div>
          <Select size="large" :transfer="true" v-model="PatternDate3" style="max-width:500px">
            <Option v-for="item in Pattern3" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="iview-switchList">
            <div class="list-block">
              <span class="iview-switchList-title">是否允许折上折</span>
              <i-switch v-model="switch4" size="large" @on-change="change">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </div>
            <div class="list-block">
              <span class="iview-switchList-title">是否允许欠款结账</span>
              <i-switch v-model="switch5" size="large" @on-change="change">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <i-button class="iview-btnSave" @click="btnSave" size="large" type="primary">保存</i-button>
    </Card>
  </div>
</template>

<script>
import { storeSet, storeSave } from "@/api/loginMenu";
export default {
  data() {
    return {
      Pattern: [
        {
          value: "0",
          label: "零点清零"
        },
        {
          value: "1",
          label: "营业结束清零"
        },
        {
          value: "2",
          label: "交接班清零"
        }
      ],
      Pattern1: [
        {
          value: "0",
          label: "克"
        },
        {
          value: "1",
          label: "千克"
        }
      ],
      Pattern2: [
        {
          value: "0",
          label: "分"
        },
        {
          value: "1",
          label: "角"
        },
        {
          value: "2",
          label: "元"
        },
        {
          value: "3",
          label: "十元"
        }
      ],
      Pattern3: [
        {
          value: "0",
          label: "四舍五入"
        },
        {
          value: "1",
          label: "进位"
        },
        {
          value: "2",
          label: "去尾"
        }
      ],
      PatternDate: "0",
      PatternDate1: "0",
      PatternDate2: "0",
      PatternDate3: "0",
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      switch5: false
    };
  },
  methods: {
    init() {
      this.storeSet();
    },
    btnSave() {
      this.storeSave();
      this.storeSetLoading = this.$myLoading({ content: "正在保存,请稍等..." });
      setTimeout(() => {
        this.storeSetLoading.close();
        this.$Message.success("保存成功!");
      }, 3000);
    },
    change(value) {},
    onChangInput(number) {
      if (number == 1) {
        return true;
      } else {
        return false;
      }
    },
    saveChangInput(isShow) {
      if (isShow == true) {
        return "1";
      } else {
        return "0";
      }
    },
    async storeSet() {
      const { data, status } = await storeSet();
      if (data.code == 200 && status == 200) {
        let newData = data.data;
        console.log(newData);
        for (let i = 0; i < newData.length; i++) {
          if (newData[i].parameterName == "waterNoClearModel") {
            this.PatternDate = JSON.stringify(newData[i].parameterValue);
          } else if (newData[i].parameterName == "balanceFlag") {
            this.PatternDate1 = JSON.stringify(newData[i].parameterValue)
          } else if (newData[i].parameterName == "computeCashTo") {
            this.PatternDate2 = JSON.stringify(newData[i].parameterValue);
          } else if (newData[i].parameterName == "computeCashModel") {
            this.PatternDate3 = JSON.stringify(newData[i].parameterValue);
          } else if (newData[i].parameterName == "discountUp") {
            this.switch4 = this.onChangInput(newData[i].parameterValue);
          } else if (newData[i].parameterName == "debtPay") {
            this.switch5 = this.onChangInput(newData[i].parameterValue);
          }
        }
      }
    },
    async storeSave() {
      console.log("123");
      const item = [
        {
          parameterName: "waterNoClearModel",
          parameterValue: this.PatternDate
        },
        {
          parameterName: "balanceFlag",
          parameterValue: this.PatternDate1
        },
        // {
        //   parameterName:"g_para_memberReturnMoney",
        //   parameterValue:this.saveChangInput(this.switch1)
        // },
        // {
        //   parameterName:"g_para_memberIntegralModel",
        //   parameterValue:this.saveChangInput(this.switch2)
        // },
        // {
        //   parameterName:"g_para_memberMobile",
        //   parameterValue:this.saveChangInput(this.switch3)
        // },
        {
          parameterName: "computeCashTo",
          parameterValue: this.PatternDate2
        },
        {
          parameterName: "computeCashModel",
          parameterValue: this.PatternDate3
        },
        {
          parameterName: "discountUp",
          parameterValue: this.saveChangInput(this.switch4)
        },
        {
          parameterName: "debtPay",
          parameterValue: this.saveChangInput(this.switch5)
        }
      ];
      await storeSave(item);
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style scoped>
.iview-tabsM {
  margin-top: 15px;
}
.iview-selectTitle {
  margin: 15px 0 15px 5px;
}
.ivu-select-item {
  font-size: 14px !important;
}
.iview-switchList {
  margin-top: 30px;
}
.list-block {
  margin-bottom: 15px;
}
.iview-switchList-title {
  width: 280px;
  display: inline-block;
}
.iview-btnSave {
  width: 120px;
  margin: 20px 0 50px 25px;
}
.ivu-tabs-tabpane {
  padding-left: 15px;
}
</style>
