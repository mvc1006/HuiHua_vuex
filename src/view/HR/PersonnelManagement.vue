<template>
  <div class="content-box">
    <Card title="员工名单" style="min-height:100%">
      <div class="iu-table-div">
        <Row>
          <label class="search-label-w120 fl">快速搜索</label>
          <Col span="8">
            <Input size="large" v-model="fastQuery" placeholder="请输入姓名、手机号"/>
          </Col>
          <label class="search-label-w120 fl">机构</label>
          <Col span="8">
            <Select size="large" clearable>
              <!-- <Option
                v-for="item in scrapStatusList"
                :value="item.value"
                :key="item.key"
                :label="item.label"
              ></Option>-->
            </Select>
          </Col>
        </Row>

        <Row class="ptop20">
          <label class="search-label-w120 fl">用工类型</label>
          <Col span="8">
            <Select size="large" clearable>
              <!-- <Option
                v-for="item in scrapStatusList"
                :value="item.value"
                :key="item.key"
                :label="item.label"
              ></Option>-->
            </Select>
          </Col>
          <label class="search-label-w120 fl">用工状态</label>
          <Col span="8">
            <Select size="large" clearable>
              <!-- <Option
                v-for="item in scrapStatusList"
                :value="item.value"
                :key="item.key"
                :label="item.label"
              ></Option>-->
            </Select>
          </Col>
        </Row>

        <Row class="ptop20">
          <label class="search-label-w120 fl">健康证时间</label>
          <Col span="8">
            <DatePicker
              type="daterange"
              :options="optionTime"
              format="yyyy-MM-dd"
              @on-change="handleChange"
              :value="startTime"
              :editable="true"
              split-panels
              style="width: 355px"
            ></DatePicker>
          </Col>
          <label class="search-label-w120 fl">合同时间</label>
          <Col span="8">
            <DatePicker
              type="daterange"
              :options="optionTime"
              format="yyyy-MM-dd"
              @on-change="handleChange"
              :value="startTime"
              :editable="true"
              split-panels
              style="width: 355px"
            ></DatePicker>
          </Col>
        </Row>
        <Row class="ptop20">
          <label class="search-label-w120 fl"></label>
          <Col span="6">
            <Button type="primary" size="large" @click="onSearch">查询</Button>
          </Col>
        </Row>

        <div class="ptop20 pbtom10">
          <ButtonGroup>
            <Button icon="md-add" @click="add" type="primary">增加</Button>
            <Button icon="ios-eye" @click="show" type="info">查看</Button>
            <!-- <Button icon="md-trash" @click="deleted" type="error">删除</Button> -->
            <Button icon="md-create" @click="edit()" type="warning">修改</Button>

            <Button icon="md-download" type="primary" @click="productTmplDownload">下载导入模板</Button>
            <Upload
              :show-upload-list="false"
              :headers="headers"
              :action="actionUrl"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccessUpload"
              :on-error="handleErrorUpload"
              class="fl"
            >
              <Button icon="md-log-in" type="primary">导入</Button>
            </Upload>
            <Button icon="md-log-out" type="primary" @click="productExportExcel">导出</Button>
          </ButtonGroup>
        </div>

        <Table
          class="table-all-width"
          :columns="tableColumns"
          :data="tableData"
          :stripe="true"
          :border="true"
          @on-select="selectTable"
          @on-select-cancel="selectTableCancel"
          @on-select-all="selectTableAll"
          @on-select-all-cancel="selectTableAllCancel"
        ></Table>
        <div class="page-box" v-if="true">
          <Page
            :total="total"
            :page-size="pageSize"
            show-sizer
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          />
        </div>
      </div>

      <Modal
        class="formTop"
        v-model="showAdd"
        :title="showTitle"
        @on-cancel="closeModal"
        width="94%"
      >
        <Form
          ref="formItem"
          :model="formItem"
          :label-width="110"
          :rules="formRules"
          class="form-box"
        >
          <Divider orientation="left">基础信息</Divider>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="姓名" prop="personName">
                <Input v-model="formItem.personName" :disabled="isShow" placeholder="请输入员工姓名"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="员工编号" prop="personCode">
                <Input
                  v-model="formItem.personCode"
                  :disabled="true"
                  :placeholder="(modalFlag=='add')?'系统自动生成':'请输入员工编号'"
                />
              </FormItem>
            </Col>

            <Col span="8">
              <FormItem label="性别" prop="sex">
                <RadioGroup v-model="animal">
                  <Radio label="男" :disabled="isShow"></Radio>
                  <Radio label="女" :disabled="isShow"></Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="20">
            <Col span="8">
              <FormItem label="拼音" prop="personEnglishName">
                <Input
                  v-model="formItem.personEnglishName"
                  :disabled="isShow"
                  placeholder="请输入姓名拼音"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="民族" prop="productUnit">
                <Input v-model="formItem.productUnit" :disabled="isShow" placeholder="请输入民族"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="籍贯" prop="productBarcode">
                <Input v-model="formItem.productBarcode" :disabled="isShow" placeholder="请输入籍贯"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="现居地址" prop="productBarcode">
                <Input v-model="formItem.productBarcode" :disabled="isShow" placeholder="请输入现居地址"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="身份证号" prop="maxNum">
                <Input v-model="formItem.maxNum" :disabled="isShow" placeholder="请输入身份证号"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="年龄" prop="minNum">
                <Input v-model="formItem.minNum" :disabled="isShow" placeholder="请输入年龄"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="学历" prop="classCode">
                <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                  <!--  <Option
                    v-for="item in selecteClass"
                    :value="item.classCode"
                    :key="item.classCode"
                  >{{ item.className }}</Option>-->
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="婚姻状况" prop="classCode">
                <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                  <!-- <Option
                    v-for="item in selecteClass"
                    :value="item.classCode"
                    :key="item.classCode"
                  >{{ item.className }}</Option>-->
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="手机号" prop="salePrice">
                <Input number v-model="formItem.salePrice" :disabled="isShow" placeholder="请输入手机号"/>
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="20">
            <Col span="8">
              <FormItem label="开户行" prop="salePrice">
                <Input
                  number
                  v-model="formItem.salePrice"
                  :disabled="isShow"
                  placeholder="请输入银行卡开户行"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="银行账号" prop="wholesalePrice">
                <Input
                  number
                  v-model="formItem.wholesalePrice"
                  :disabled="isShow"
                  placeholder="请输入银行账号"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="入职部门" prop="costPrice">
                <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                  <!-- <Option
                    v-for="item in selecteClass"
                    :value="item.classCode"
                    :key="item.classCode"
                  >{{ item.className }}</Option>-->
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="20">
            <Col span="8">
              <FormItem label="所属职级" prop="memberPrice">
                <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                  <!-- <Option
                    v-for="item in selecteClass"
                    :value="item.classCode"
                    :key="item.classCode"
                  >{{ item.className }}</Option>-->
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="入职工作岗" prop="specifications">
                <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                  <!--  <Option
                    v-for="item in selecteClass"
                    :value="item.classCode"
                    :key="item.classCode"
                  >{{ item.className }}</Option>-->
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="后台权限" prop="brand">
                <Select v-model="formItem.classCode" :disabled="isShow" filterable>
                  <!--  <Option
                    v-for="item in selecteClass"
                    :value="item.classCode"
                    :key="item.classCode"
                  >{{ item.className }}</Option>-->
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="员工头像">
                <div class="demo-upload-list" v-if="formItem.productPicture">
                  <template>
                    <img :src="formItem.productPicture">
                    <div class="demo-upload-list-cover" v-if="!isShow">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  v-if="!formItem.productPicture"
                  ref="upload"
                  :show-upload-list="false"
                  :headers="headers"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  type="drag"
                  :on-success="handleSuccess"
                  :action="ImgUrl"
                  style="display: inline-block;width:200px;"
                >
                  <div style="width: 200px;height:150px;line-height: 150px;">
                    <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Divider orientation="left">就职信息</Divider>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="公司名称" prop="brand">
                <Input v-model="formItem.brand" :disabled="isShow" placeholder="请输入商品品牌"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="合同类型" prop="flag">
                <Select v-model="formItem.flag" :disabled="isShow">
                  <Option value="0">劳务协议</Option>
                  <Option value="1">劳动合同</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span="8">
              <FormItem label="用工类型" prop="flag">
                <Select v-model="formItem.flag" :disabled="isShow">
                  <Option value="0">劳务协议</Option>
                  <Option value="1">劳动合同</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="合同开始日期" prop="brand">
                <DatePicker
                  type="date"
                  :options="optionTime"
                  format="yyyy-MM-dd"
                  @on-change="handleChange"
                  :value="startTime"
                  :editable="true"
                  split-panels
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="合同结束日期" prop="flag">
                <DatePicker
                  type="date"
                  :options="optionTime"
                  format="yyyy-MM-dd"
                  @on-change="handleChange"
                  :value="startTime"
                  :editable="true"
                  split-panels
                  style="width:100%"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="8">
              <FormItem label="入职日期" prop="flag">
                <DatePicker
                  type="date"
                  :options="optionTime"
                  format="yyyy-MM-dd"
                  @on-change="handleChange"
                  :value="startTime"
                  :editable="true"
                  split-panels
                  style="width:100%"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="20">
            <Col span="8">
              <FormItem label="转正日期" prop="brand">
                <DatePicker
                  type="date"
                  :options="optionTime"
                  format="yyyy-MM-dd"
                  @on-change="handleChange"
                  :value="startTime"
                  :editable="true"
                  split-panels
                  style="width:100%"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="健康证到期日" prop="flag">
                <DatePicker
                  type="date"
                  :options="optionTime"
                  format="yyyy-MM-dd"
                  @on-change="handleChange"
                  :value="startTime"
                  :editable="true"
                  split-panels
                  style="width:100%"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="8">
              <FormItem label="公司工龄" prop="flag">
                <Input v-model="formItem.brand" :disabled="isShow" placeholder="请输入商品品牌"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="宿舍入住日期" prop="flag">
                <DatePicker
                  type="date"
                  :options="optionTime"
                  format="yyyy-MM-dd"
                  @on-change="handleChange"
                  :value="startTime"
                  :editable="true"
                  split-panels
                  style="width:100%"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Divider orientation="left">紧急联系人</Divider>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="紧急联系人姓名" prop="distribution">
                <Input v-model="formItem.brand" :disabled="isShow" placeholder="请输入商品品牌"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="与紧急联系人关系" prop="distribution">
                <Input v-model="formItem.brand" :disabled="isShow" placeholder="请输入商品品牌"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="紧急联系人电话" prop="distribution">
                <Input v-model="formItem.brand" :disabled="isShow" placeholder="请输入商品品牌"/>
              </FormItem>
            </Col>
          </Row>
          <Divider orientation="left">证件附件上传</Divider>
          <Row :gutter="20">
            <Col span="8">
              <FormItem label="身份证附件上传">
                <div class="demo-upload-list" v-if="formItem.productPicture">
                  <template>
                    <img :src="formItem.productPicture">
                    <div class="demo-upload-list-cover" v-if="!isShow">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  v-if="!formItem.productPicture"
                  ref="upload"
                  :show-upload-list="false"
                  :headers="headers"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  type="drag"
                  :on-success="handleSuccess"
                  :action="ImgUrl"
                  style="display: inline-block;width:200px;"
                >
                  <div style="width: 200px;height:150px;line-height: 150px;">
                    <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </Upload>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="健康证附件上传">
                <div class="demo-upload-list" v-if="formItem.productPicture">
                  <template>
                    <img :src="formItem.productPicture">
                    <div class="demo-upload-list-cover" v-if="!isShow">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  v-if="!formItem.productPicture"
                  ref="upload"
                  :show-upload-list="false"
                  :headers="headers"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  type="drag"
                  :on-success="handleSuccess"
                  :action="ImgUrl"
                  style="display: inline-block;width:200px;"
                >
                  <div style="width: 200px;height:150px;line-height: 150px;">
                    <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </Upload>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="居住证">
                <div class="demo-upload-list" v-if="formItem.productPicture">
                  <template>
                    <img :src="formItem.productPicture">
                    <div class="demo-upload-list-cover" v-if="!isShow">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  v-if="!formItem.productPicture"
                  ref="upload"
                  :show-upload-list="false"
                  :headers="headers"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  type="drag"
                  :on-success="handleSuccess"
                  :action="ImgUrl"
                  style="display: inline-block;width:200px;"
                >
                  <div style="width: 200px;height:150px;line-height: 150px;">
                    <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </Upload>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="合同">
                <div class="demo-upload-list" v-if="formItem.productPicture">
                  <template>
                    <img :src="formItem.productPicture">
                    <div class="demo-upload-list-cover" v-if="!isShow">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  v-if="!formItem.productPicture"
                  ref="upload"
                  :show-upload-list="false"
                  :headers="headers"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  type="drag"
                  :on-success="handleSuccess"
                  :action="ImgUrl"
                  style="display: inline-block;width:200px;"
                >
                  <div style="width: 200px;height:150px;line-height: 150px;">
                    <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </Upload>
              </FormItem>
            </Col>
          </Row>

          <FormItem prop="stockAlarmId">
            <Input v-model="formItem.stockAlarmId" style="display:none"/>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
          <Button style="margin-left: 8px" @click="handleReset('formItem')">取消</Button>
        </div>
      </Modal>
    </Card>
    <!--  <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除产品？</p>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="delLoading"
          @click="producBatchDeleteByIds"
        >删除</Button>
      </div>
    </Modal>-->
  </div>
</template>
<script>
import tableColumns from "./table/personTable";
export default {
  data() {
    return {
      fastQuery: "",
      tableColumns: tableColumns,
      showAdd: false,
      showTitle: "",
      optionTime: null,
      startTime: "",
      headers: null,
      actionUrl: "",
      tableData: [],
      total: 0,
      pageSize: 10,
      isShow: false,
      modalFlag: "add",
      ImgUrl: "",
      animal: "男",
      formRules: {
        personCode: { required: true, message: "员工编号不能为空" },
        personName: { required: true, message: "员工名称必须填写" }
      },
      formItem: {
        personCode: "",
        personName: ""
      }
    };
  },
  methods: {
    // 搜索
    onSearch() {},
    // 分页相关
    changePage(pageNum) {},
    changePageSize(pageSize) {},
    // 模态框相关
    show(index) {
      this.showAdd = true;
    },
    add(index) {
      this.showAdd = true;
      this.showTitle = "添加人员";
    },
    edit(index) {
      this.showAdd = true;
    },
    del(index) {
      this.$Message.info("删除按钮");
    },
    handleSubmit() {
      this.showAdd = false;
    },
    handleReset() {
      this.showAdd = false;
    },
    closeModal() {},
    handleChange() {},
    productTmplDownload() {},
    handleSuccessUpload() {},
    handleBeforeUpload() {},
    handleErrorUpload() {},
    productExportExcel() {},
    selectTable() {},
    selectTableCancel() {},
    selectTableAll() {},
    selectTableAllCancel() {},
    handleSuccess() {}
  }
};
</script>
<style>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-label-w120 {
  text-align: right;
  line-height: 32px;
  height: 32px;
  width: 100px;
  font-size: 14px;
  padding-right: 10px;
}
.search-span {
  text-align: right;
  line-height: 32px;
  height: 32px;
  display: block;
  font-size: 14px;
  box-sizing: border-box;
  padding-right: 10px;
}
</style>
