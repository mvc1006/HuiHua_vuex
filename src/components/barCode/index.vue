<template>
  <div>
    <svg v-show="show" ref="barcode"></svg>
  </div>
</template>

<script>
import jsbarcode from "jsbarcode";
export default {
  name: "barCode",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    init() {
      this.madeJsBarcode(this.value);
    },
    madeJsBarcode(param) {
      if (!param) {
        this.show = false;
        return false;
      }
      this.$nextTick(() => {
        try {
          jsbarcode(this.$refs.barcode, param, {
            displayValue: true,
            format: "CODE128",
            height: 30,
            lineColor: "#000",
            background: "rgba(255,255,255,0)"
          });
        } catch (error) {
          this.show = false;
        }
      });
    }
  },
  watch: {
    value: function(val, oldVal) {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
</style>
