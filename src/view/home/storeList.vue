<template>
  <div>
    <Card title="门店基本信息展示">
      <Row>
        <Button icon="md-create" @click="popupBtn">修改门店信息</Button>
      </Row>
      <Table
        class="table-all-width"
        :show-header="false"
        border
        :loading="loading"
        :columns="columns1"
        :data="data1"
      ></Table>
    </Card>
    <Modal v-model="popup" @on-cancel="closeModals" title="修改门店信息">
      <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="80">
        <FormItem label="门店名称" prop="storeName">
          <Input v-model="formItem.storeName" placeholder="请输入门店名称" clearable></Input>
        </FormItem>
        <FormItem label="营业时间" prop="businessTime">
          <TimePicker type="timerange" confirm @on-ok="timeChang"  format="HH:mm"  v-model="formItem.businessTime" :editable="false"  placement="bottom-start" placeholder="请选择营业时间"></TimePicker>
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
          <Input v-model="formItem.addres" class="inputAddres" placeholder="请填写详细信息"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="close('formItem')" size="large">取消</Button>
        <Button type="primary"  size="large" @click="doSomething('formItem')">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getBussinessType } from "./keyList";
import { menuInfo,saveMenuInfo ,menuInfoKey } from '@/api/loginMenu';
import storage from '@/libs/storage';
import { chinaCity, getChilds } from "@/assets/chinaCity";
export default {
  data() {
    return {
      popup: false,
      storeCodeId: "",
      loading: false,
      columns1: [
        {
          title: "Name",
          key: "name",
          width: 100,
          align: "center",
          className: "tab-font-color"
        },
        {
          title: "title",
          key: "title"
        }
      ],
      data1: [],
      formItem: {
        storeName: "",
        businessTime: [],
        storeAdd: [],
        addres: ""
      },
      newTime: "",
      upDataTime: "",
      data2: chinaCity,
      addressMap: [],
      ruleValidate: {
        storeName: [
          {
            required: true,
            message: "门店名称不能为空",
            trigger: "blur"
          }
        ],
        storeAdd: [
          {
            required: true,
            message: "所在区域不能为空",
            trigger: "change",
            type: "array"
          }
        ],
        businessTime: [
          {
            required: true,
            validator: this.dataTime,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    menuInfo(storeCode) {
      menuInfo(storeCode).then(res => {
        const storeData = res.data
        if (storeData.code == 200) {
          this.storeCodeId = storeData.data.id
          this.handleData1(storeData.data)
        }
      })
    },
    dataTime(rule, value, callback) {
      if (value[0] == "" || value[1] == "") {
        callback(new Error("请选择营业时间"));
      } else {
        callback();
      }
    },
    timeChang() {
      let newdata = this.formItem.businessTime[0] + ' — ' + this.formItem.businessTime[1]
      this.newTime = newdata
    },
    handleData1(storeInfo) {
      const keyList = [
        {
          name: "门店名称",
          key: "storeName",
          title: storeInfo.storeName
        },
        {
          name: "门店编号",
          key: "storeCode",
          title: storeInfo.storeCode
        },
        {
          name: "门店类型",
          key: "storeType",
          title: storeInfo.storeType
        },
        {
          name: "门店品牌",
          key: "storeBrand",
          title: storeInfo.storeBrand
        },
        {
          name: "所在区域",
          key: "province-area",
          title:
            storeInfo.province + "-" + storeInfo.city + "-" + storeInfo.area
        },
        {
          name: "详细地址",
          key: "address",
          title: storeInfo.address
        },
        {
          name: "经纬度",
          key: "longitude@latitude",
          title: storeInfo.longitude + " —— " + storeInfo.latitude
        },
        {
          name: "业态",
          key: "bussinessType",
          title: getBussinessType(storeInfo.bussinessType)
        },
        {
          name: "联系人",
          key: "linkName",
          title: storeInfo.linkName
        },
        {
          name: "手机号",
          key: "linkMobile",
          title: storeInfo.linkMobile
        },
        {
          name: "邮箱",
          key: "linkEmail",
          title: storeInfo.linkEmail
        },
        {
          name: "营业时间",
          key: "storeBrand",
          title: storeInfo.businessTime
        }
      ];
      this.data1 = keyList;
      this.menuInfoKey()
    },
    closeModals() {
      this.close('formItem');
    },
    close(name) {
      this.$refs[name].resetFields();
      this.popup = false;
    },
    // 修改门店
    popupBtn() {
      this.formItem.businessTime = [];
      this.formItem.storeName = this.data1[0].title;
      this.getCode();
      this.newTime = "";
      let newbussTime = this.data1[11].title
      if (newbussTime) {
        this.formItem.businessTime.push(newbussTime.substring(0,5),newbussTime.substring(7,13));
      } else {
        this.formItem.businessTime.push('','')
      }

      this.formItem.addres = this.data1[5].title;
      this.popup = true;
    },
    // 经纬度
    async menuInfoKey() {
      const addLists = this.data1[4].title;
      const item = {
        address: addLists.replace(/-/g,'')
      }
      const { data,status } = await menuInfoKey(item);
      console.log(data);
      if (status == 200) {
        let longitude = data.data;
        this.data1[6].title = longitude.replace(/,/g,'——')
      }
    },
    // 保存信息
    doSomething(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.storeListLoading = this.$myLoading({ content: '正在保存,请稍等...' })
          this.data1[0].title = this.formItem.storeName;
          this.data1[5].title = this.formItem.addres;
          this.data1[11].title = this.formItem.businessTime[0] + ' — ' + this.formItem.businessTime[1];
          const addList = this.formItem.storeAdd;
          let add = [];
          addList.forEach(item => {
            add.push(this.getLabel(item));
          });
          const obj = {
            storeName: this.formItem.storeName,
            province: add[0],
            city: add[1],
            area: add[2],
            address: this.formItem.addres,
            id: this.storeCodeId,
            businessTime: this.formItem.businessTime[0] + ' — ' + this.formItem.businessTime[1]
          };
          saveMenuInfo(obj).then(res => {
            this.data1[4].title = add.join("-");
            this.popup = false;
            setTimeout(() => {
              this.closeModals()
              this.storeListLoading.close();
              this.$Message.success("保存成功!");
              this.menuInfoKey()
            }, 1000);
          })
        } else {
          this.$Message.error("保存失败！");
        }
      });
    },
    // 省市value对应label
    getCode() {
      const labelList = this.data1[4].title.split("-");
      let arr = [];
      labelList.forEach(item => {
        arr.push(this.getValue(item));
      });
      if (arr.length > 1) {
        if (arr[0] == arr[1]) {
          arr[1] = "" + (+arr[1] + 100);
        }
      }
      this.formItem.storeAdd = arr;
    },
    getValue(label) {
      for (let i = 0; i < this.addressMap.length; i++) {
        const item = this.addressMap[i];
        if (item.label == label) {
          return item.value;
        }
      }
    },
    getLabel(value) {
      for (let i = 0; i < this.addressMap.length; i++) {
        const item = this.addressMap[i];
        if (item.value == value) {
          return item.label;
        }
      }
    },
    format(labels, selectedData) {
      return labels.join("-");
    }
  },
  mounted() {
    let storeCode = storage.getStorage('storeInfo')
    this.addressMap = getChilds();
    this.menuInfo(storeCode.storeCode);
  }
};
</script>

<style>
.ivu-table-wrapper {
  margin-top: 15px;
}
.ivu-table td.tab-font-color {
  font-weight: bold;
  color: #333;
}
.ivu-modal-confirm-head-title {
  margin-top: -5px;
  margin-bottom: 15px;
}
</style>
