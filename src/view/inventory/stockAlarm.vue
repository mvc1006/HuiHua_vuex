<template>
  <div class='content-box'>
    <Card title="库存预警">
      <div class='content-body'>
        <Row class='pbtom10'>
          <label class='search-label fl'>查询类型</label>
          <Col span="6">
          <Select v-model="operateType">
            <Option
              v-for="item in logList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class='pbtom10'>
          <label class='search-label fl'></label>
          <Col span="12">
          <Button
            type="primary"
            @click="search"
            class="mright15"
          >查询</Button>
          <!-- <Button
            type="primary"
            @click="orderLogExport"
          >导出</Button> -->
          </Col>
        </Row>
        <Table
          class="table-all-width mtop15"
          border
          :loading="loading"
          :columns="trackColumns"
          :data="trackData"
        ></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import storage from '@/libs/storage';
import { stockAlarmList } from "@/api/stock";
export default {
  name: "tracking",
  data() {
    return {
      productName: "",
      operateType: "",
      productCode: "",
      depotCode: "",
      dateVal: "",
      model1: "",
      logList: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "库存不足"
        },
        {
          value: "3",
          label: "库存溢出"
        }
      ],
      trackColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          minWidth: 60,
          align: "center",
          className: "td-index"
        },
        {
          title: "门店编号",
          key: "storeCode",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "商品编号",
          key: "productCode",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "商品名称",
          key: "productName",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "单位名称",
          key: "unitName",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "库存数量",
          key: "stockNum",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "最小库存数量",
          key: "minNum",
          width: 150,
          headerAlign: "center",
          align: "center"
        },
        {
          title: "最大库存数量",
          key: "maxNum",
          width: 150,
          headerAlign: "center",
          align: "center"
        }
      ],
      trackData: [],
      loading: false
    };
  },
  methods: {
    init() {
      this.stockAlarmList();
    },
    search() {
      this.stockAlarmList();
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.stockAlarmList();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
    },
    // async orderLogExport() {
    //   console.log("orderExport");
    //   const item = {
    //     operateType: this.operateType,
    //     productCode: this.productCode,
    //     productName: this.productName,
    //     depotCode: this.depotCode,
    //     storeCode: this.$store.state.user.storeCode
    //   };
    //   const { data, status } = await orderLogExport(item);
    //   if (status == 200) {
    //     let newTimeDate = new Date();
    //     let storeName = storage.getStorage("storeInfo").storeName;
    //     let date = Format(newTimeDate, "yy年MM月dd日hh时mm分ss秒");
    //     saveAs(data, storeName + "—库存追踪统计报表—" + date + ".xls");
    //   }
    // },
    async stockAlarmList() {
      let storeCode = storage.getStorage('storeInfo');
      const item = {
        queryType: this.operateType,
        storeCode: storeCode.storeCode
      }
      const { data, status } = await stockAlarmList(item);
      if (data.code == 200 && status == 200) {
        this.trackData = data.data;
      }
    }
  },
  mounted: function() {
    this.init()
  }
};
</script>

<style scoped>
.search-label {
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
  width: 100px;
}
</style>
