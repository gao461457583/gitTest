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
        
        <div  v-for="item in userInfo.menus" :key="item.id">
          <!-- 目录 -->
          <!-- 需要给:index="item.id" 转换成字符串，拼接上''就行（隐式转换） -->
          <el-submenu :index="item.id+''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <!-- 这里index指的是跳转路径 -->
              <el-menu-item  v-for="i in item.children" :key="i.id" :index="i.url">
                <span>{{i.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 菜单 -->
          <el-menu-item :index="item.url" v-else>
            <span>{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      reqUserInfoAction: "reqUserInfoAction",
    }),
  },
  watch: {},
  mounted() {},
};
</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
  width: 100%;
}
.el-submenu .el-menu-item {
  text-align: center;
}
.el-menu-item-group {
  margin-top: -20px;
}
.box {
  overflow-x: hidden;
}
</style>