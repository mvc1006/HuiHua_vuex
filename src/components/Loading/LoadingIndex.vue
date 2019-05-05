<template>
  <div class="example-case" v-if="isLoad">
    <div class="loading-mark"></div>
    <div class="loading">
      <div class="ivu-spin ivu-spin-default">
        <div class="ivu-spin-main">
          <span class="ivu-spin-dot"></span>
          <div class="ivu-spin-text">{{text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoadingIndex",
  data() {
    return {
      isLoad: true
    };
  },
  props: {
    text: {
      type: String,
      default: "正在加载，请稍等..."
    }
  },
  methods: {
    close() {
      this.isLoad = false;
    }
  }
};
</script>
<style>
.loading-mark {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  left: 0px;
  top: 0;
  z-index: 999;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
}
.loading .ivu-spin-text {
  display: block;
}
.loading .ivu-spin-main {
  text-align: center;
  margin: 0;
}
.loading .ivu-spin-dot {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
</style>
