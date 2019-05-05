<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.ivu-menu-submenu-title > i{
  font-size:18px;
}
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.table-all-width table {
  width: 100% !important;
}
.ivu-modal-body .ivu-modal-confirm-head-icon{
  display: none
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
    margin-bottom: 10px;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.iview-fontColor{
	color:#f00;
}
.treeMtop>ul>li>span>i{
  display:none;
}
.treeMtop .ivu-tree-title-selected,.treeMtop .ivu-tree-title-selected:hover,.treeMtop .ivu-tree-title:hover{
  background-color: transparent
}
.ivu-picker-panel-shortcut{
	font-size:12px !important;
}
.main .logo-con{
  text-align:center;
}
</style>
