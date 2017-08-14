<template>
  <div id="app">
    <div id="header">
      <el-menu theme="dark" :default-active="activeIndex" class="header-slider" mode="horizontal" @select="handleSelect" style="position: fixed;width: 100%">
        <el-menu-item index="1"><span>商院一点通后台管理系统</span></el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-submenu>
        <!--<el-menu-item index="3"><a href="javascript：" target="_blank">订单管理</a></el-menu-item>-->
        <!--<el-menu-item style="float: right"><i class="el-icon-circle-cross" style="font-size: 2em"></i></el-menu-item>-->
        <el-menu-item style="float: right" index="3"><el-tooltip class="item" content="注销" placement="bottom" effect="light"><el-button type="text">Admin</el-button>  </el-tooltip>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </div>

    <el-row class="tac">
      <el-col :span="3" style="display: inline-block">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style=";position: fixed;top:80px;bottom:0;width:240px;margin-left: 0px;padding-left: 0px" theme="dark">
          <router-link to="/test1" style="text-decoration: none;color: #bfcbcf"><el-menu-item index="1"><i class="el-icon-menu"></i>导航一</el-menu-item></router-link>
          <router-link to="/test2"><el-menu-item index="2"><i class="el-icon-setting"></i>导航二</el-menu-item></router-link>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>

      </el-col>
      <router-view></router-view>

    </el-row>
  </div>
</template>


<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {
      ElRow,
      ElCol},
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        ruleForm: {
          name: '',
          content:'',
        },
      }
    },

    methods: {
      startHacking () {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 3000
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },

  }
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
    margin-bottom: 0;
    margin-right: 0;
  }
  .cell{
    text-align: center;
  }
  body{margin-left: 0px;margin-top: 0px}
  .el-menu--horizontal .el-menu-item{height: 80px;line-height: 80px}
  .el-menu--horizontal .el-submenu .el-submenu__title{height: 80px;line-height: 80px}
</style>
