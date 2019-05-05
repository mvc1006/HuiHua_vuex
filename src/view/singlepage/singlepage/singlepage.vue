<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" :decimals="infor.decimals" :count-class="infor.className"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie v-if="pieData.length>0" style="height: 300px;" :value="pieData" text="支付方式占比"></chart-pie>
          <div v-else class="no-data">暂无数据</div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="销售额"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <!-- <example style="height: 310px;" :value="lineData"  text="销售额"/> -->
        <chart-line style="height: 300px;" :value="lineData" text="销售额"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar, ChartLine } from "_c/charts";

// import Example from "./example.vue";
import {
  orderSale7Total,
  orderTodayPayMode,
  orderTodaySale,
  openCardCount
} from "@/api/order";
import numeral from "numeral";
export default {
  name: "singlepage",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    // Example,
    ChartLine
  },
  data() {
    return {
      inforCardData: [],
      pieData: [],
      barData: {},
      lineData: {}
    };
  },
  methods: {
    init() {
      this.orderTodayPayMode();
      this.orderTodaySale();
      this.orderSale7Total();
    },
    async orderTodayPayMode() {
      const { data, status } = await orderTodayPayMode();
      if (data.code == 200 && status == 200) {
        this.pieData = data.data;
      }
    },
    async orderTodaySale() {
      const operateId = {
        operate: 10
      };
      let count = 0;
      const { data, status } = await orderTodaySale();
      const { data: datas, status: status1 } = await openCardCount(operateId);
      console.log(datas);
      if (datas.code == 200 && status1 == 200) {
        count = datas.data;
      }
      if (data.code == 200 && status == 200) {
        // this.pieData = data.data;
        // arrearsMoney (number, optional): 欠款金额 ,
        // orderCount  (number, optional): 今日订单
        // billMoney (number, optional): 订单金额 ,
        // giftMoney (number, optional): 赠送金额 ,
        // noSingleMoney (number, optional): 免单金额 ,
        // preferentialMoney (number, optional): 优惠金额 ,
        // realMoney (number, optional): 实收金额 ,
        // rebateMoney (number, optional): 折扣金额 ,
        // returnMoney (number, optional): 退货金额
        //
        data.data.count = count;
        console.log(data.data);
        this.setInforCardData(data.data);
      }
    },
    async orderSale7Total() {
      const { data, status } = await orderSale7Total();
      if (data.code == 200 && status == 200) {
        this.barData = data.data;
        this.lineData = data.data;
      }
    },
    setInforCardData(data) {
      let inforCardData = [
        {
          title: "今日收入",
          icon: "md-person-add",
          count: 803,
          color: "#2d8cf0",
          className: "",
          decimals: 2
        },
        {
          title: "今日订单",
          icon: "md-locate",
          count: 232,
          color: "#19be6b",
          className: "",
          decimals: 0
        },
        {
          title: "单均消费",
          icon: "md-help-circle",
          count: 142,
          color: "#ff9900",
          className: "",
          decimals: 2
        },
        {
          title: "今日欠款",
          icon: "md-share",
          count: 657,
          color: "#ed3f14",
          className: "",
          decimals: 2
        },
        {
          title: "今日退款",
          icon: "md-chatbubbles",
          count: 12,
          color: "#E46CBB",
          className: "",
          decimals: 2
        },
        {
          title: "新增会员",
          icon: "md-map",
          count: 14,
          color: "#9A66E4",
          className: "",
          decimals: 0
        }
      ];
      inforCardData[0].count = +data.realMoney; // 实收金额
      inforCardData[1].count = +data.orderCount; // 今日订单
      inforCardData[2].count =
        +data.orderCount > 0
          ? +numeral(data.realMoney)
            .divide(data.orderCount)
            .value()
          : 0;
      inforCardData[3].count = +data.arrearsMoney; // 欠款金额
      inforCardData[4].count = +data.returnMoney; // 退货金额
      inforCardData[5].count = +data.count;
      inforCardData.forEach(item => {
        item.className = this.setClass(numeral(item.count).format("0.00"));
      });
      this.inforCardData = inforCardData;
      console.log(this.inforCardData)
    },
    setClass(value) {
      let className = "fz50";
      if (value.length < 4) {
        className = "fz50";
      } else if (value.length < 6 && value.length >= 4) {
        className = "fz40";
      } else if (value.length < 7 && value.length >= 6) {
        className = "fz30";
      } else if (value.length < 10 && value.length >= 7) {
        className = "fz20";
      } else if (value.length < 15 && value.length >= 10) {
        className = "fz12";
      }
      return className;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
  line-height: 56px;
}
.fz50 {
  font-size: 50px;
  line-height: 56px;
}
.fz40 {
  font-size: 40px;
  line-height: 56px;
}
.fz30 {
  font-size: 30px;
  line-height: 56px;
}
.fz20 {
  font-size: 20px;
  line-height: 56px;
}
.fz12 {
  font-size: 12px;
  line-height: 56px;
}
.no-data {
  height: 300px;
  line-height: 300px;
  text-align: center;
}
</style>
