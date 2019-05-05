<template>
  <div>
    <Card title="申请加盟">
      <p class="iview-fontColor">填写申请加盟总店的手机号加盟总店</p>
      <div class="joinCentr" v-if="showBox">
        <div class="joininBox">
          <div class="iview-selectTitle">经营模式:</div>
          <Input
            size="large"
            search
            enter-button="查询"
            @on-change="iphoneCode"
            @on-search="searchBtn"
            v-model="iphoneNumber"
            placeholder="请输入加盟总店的手机号"
            style="width: 500px"
          />
        </div>
        <div class="joininBox">
          <div class="iview-selectTitle">品牌名称:</div>
          <Select size="large" :transfer="true" v-model="PatternDate" style="width:500px">
            <Option v-for="item in Pattern" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="joininBox">
          <div class="iview-selectTitle">加盟方式:</div>
          <Select size="large" :transfer="true" v-model="PatternDate1" style="width:500px">
            <Option v-for="item in Pattern1" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <i-button class="iview-btnSave" @click="btnSave" size="large" type="primary">申请加盟</i-button>
      </div>
      <div class="joinCenter" v-if="hideBox">
        <h3>正在审核中...</h3>
      </div>
      <Divider class="dividerCenter" orientation="left">申请记录</Divider>
      <Table
        class="table-all-width"
        highlight-row
        ref="currentRowTable"
        :columns="columns3"
        :data="data1"
      >
        <template slot-scope="{ row }" slot="actions">
          <span v-if="row.status =='1'">待审核</span>
          <span v-else-if="row.status =='2'">审核未通过</span>
          <span v-else>审核通过</span>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import { Format } from "@/assets/util";
export default {
  data() {
    return {
      iphoneNumber: "",
      PatternDate: "",
      PatternDate1: "0",
      Pattern: "",
      Pattern1: [
        {
          value: "0",
          label: "1"
        },
        {
          value: "1",
          label: "2"
        },
        {
          value: "2",
          label: "3"
        }
      ],
      isRun: false,
      showBox: true,
      hideBox: false,
      columns3: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号",
          key: "序号"
        },
        {
          align: "center",
          title: "企业",
          key: "companyName"
        },
        {
          align: "center",
          title: "联系电话",
          key: "contactsPhone"
        },
        {
          align: "center",
          title: "品牌",
          key: "brandName"
        },
        {
          align: "center",
          title: "加盟方式",
          key: "managementMode"
        },
        {
          align: "center",
          title: "申请时间",
          key: "createTime",
          render: (h, params) => {
            return h("span", this.formatTime(params.row.createTime));
          }
        },
        {
          align: "center",
          title: "审核状态",
          key: "status",
          slot: "actions"
        }
      ],
      data1: [
        {
          companyName: "名牌",
          contactsPhone: 18000000000,
          brandName: "SSW",
          managementMode: "自由",
          createTime: "1547795087000",
          status: "1"
        },
        {
          companyName: "名牌",
          contactsPhone: 18000000000,
          brandName: "SSW",
          managementMode: "自由",
          createTime: "1547795087000",
          status: "2"
        },
        {
          companyName: "名牌",
          contactsPhone: 18000000000,
          brandName: "SSW",
          managementMode: "自由",
          createTime: "1547795087000",
          status: "3"
        }
      ]
    };
  },
  mounted: function() {
    this.tableList();
  },
  methods: {
    // 手机号为空
    iphoneCode() {
      let numBer = this.iphoneNumber;
      let re = /^1\d{10}$/;
      if (!re.test(numBer) || numBer == "") {
        this.PatternDate = "";
        this.Pattern = "";
      }
    },
    formatTime(time) {
      return Format(time, "yy-MM-dd hh:mm:ss");
    },
    // 查询手机号是否存在
    searchBtn() {
      if (this.isRun) return false;
      this.isRun = true;
      let value = this.iphoneNumber;
      let re = /^1\d{10}$/;
      if (!re.test(value) || value == "") {
        console.log("456");
        this.$Message.error({
          content: "手机号错误",
          onClose: () => {
            this.isRun = false;
          }
        });
      } else {
        this.joininLoading = this.$myLoading({ content: "正在查找,请稍等..." });
        setTimeout(() => {
          this.joininLoading.close();
          this.$Message.success("查询成功!");
          this.Pattern = [
            {
              value: "0",
              label: "1"
            },
            {
              value: "1",
              label: "2"
            },
            {
              value: "2",
              label: "3"
            }
          ];
          this.PatternDate = "2";
          this.isRun = false;
        }, 3000);
      }
    },
    btnSave() {
      if (this.isRun) return false;
      this.isRun = true;
      let value = this.PatternDate;
      if (value === "") {
        this.$Message.error({
          content: "请选择品牌",
          onClose: () => {
            this.isRun = false;
          }
        });
      } else {
        this.joinLoading = this.$myLoading({
          content: "正在提交信息,请稍等..."
        });
        setTimeout(() => {
          this.joinLoading.close();
          this.showBox = false;
          this.hideBox = true;
          let dataTime = new Date();
          let JsonList = {
            companyName: "名牌",
            contactsPhone: 18000000000,
            brandName: "SSW",
            managementMode: "自由",
            createTime: Format(dataTime, "yy-MM-dd hh:mm:ss"),
            status: "1"
          };
          this.data1.unshift(JsonList);
          this.$Message.success("信息提交成功!");
          this.isRun = false;
        }, 3000);
      }
    },
    tableList() {
      // let arryList = this.data1
      // let ArryJson = []
      // for (let i=0; i<arryList.length; i++){
      // 	arryList[i].createTime = Format(arryList[i].createTime,'yy-MM-dd hh:mm:ss');
      // 	// if(arryList[i].status == "1"){
      // 	// 	arryList[i].status = '待审核'
      // 	// }else if(arryList[i].status == "2"){
      // 	// 	arryList[i].status = '审核未通过'
      // 	// }else{
      // 	// 	arryList[i].status = '审核通过'
      // 	// }
      // 	ArryJson.push(arryList[i])
      // }
      // this.data1 = ArryJson
    }
  }
};
</script>

<style scoped>
.joininBox {
  margin-top: 15px;
}
.iview-selectTitle {
  float: left;
  line-height: 36px;
  margin-right: 15px;
}
.ivu-select-item {
  font-size: 14px !important;
}
.iview-btnSave {
  margin: 35px 0 0 75px;
}
.dividerCenter {
  margin-top: 50px;
  font-size: 20px;
  color: #009688;
}
.joinCenter h3 {
  color: #f00;
  margin: 30px;
}
table {
  min-width: 950px;
}
</style>
