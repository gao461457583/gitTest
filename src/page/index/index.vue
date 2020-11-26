<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <v-aside class="aside"></v-aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <p>
            <i>admin</i>
            <i class="el-icon-setting"></i>
          </p>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import vAside from "./vaside";
export default {
  components: {
    vAside,
  },
  data() {
    return {};
  },
  methods: {},
  watch: {},
  mounted() {},
};
</script>
<style scoped>
.aside {
  height: 100vh;
}
.header {
  background-color: #b3c0d1;
  line-height: 50px;
  text-align: end;
}
.el-icon-arrow-right{
  margin-bottom: 20px;
}
</style>