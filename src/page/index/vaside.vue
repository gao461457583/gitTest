<template>
  <div class="box">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
         <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 系统设置 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统设置</span>
          </template> 
          <el-menu-item-group>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 商城管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商城管理</span>
          </template> 
          <el-menu-item-group>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
        
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  mounted() {},
};
</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
  width: 100%;
}
.el-submenu .el-menu-item{
    text-align: center;
}
.el-menu-item-group{
  margin-top: -20px;
}
.box{
  overflow-x: hidden;
}
</style>