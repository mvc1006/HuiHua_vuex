import { Spin } from 'iview'
import Vue from "vue";
export function showLoading(opts) {
  let text = opts && opts.text ? opts.text : '正在加载，请稍等...';
  let type = opts && opts.type ? opts.type : ios - loading;
  let size = opts && opts.size ? opts.size : 18;
  Spin.show();
}
export function hideLoading() {
  Spin.hide();
}
