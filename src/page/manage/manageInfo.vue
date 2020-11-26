<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="ruleForm.roleid">
          <el-option label="请选择" :value="0"></el-option>
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input
          placeholder="请输入用户名"
          clearable
          v-model="ruleForm.username"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          clearable
          show-password
          v-model="ruleForm.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="info" @click="cansle">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </div>
</template>
<script>
import {
  roleList,
  addManage,
  getManageInfo,
  editManageInfo,
} from "../../util/request";
export default {
  data() {
    return {
      roleList: [],
      ruleForm: {
        username: "",
        roleid: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {},
  methods: {
    //点击确定按钮 (1.关闭组件 2.发请求 3重置表单)
    add() {
      if (this.$route.params.uid) {
        editManageInfo(this.ruleForm).then((res) => {
          this.$router.back();
          console.log(res);
        });
      } else {
        addManage(this.ruleForm).then((res) => {
          this.$router.back();
        });
      }
    },
    cansle() {},
  },

  watch: {},
  created() {},
  mounted() {
    roleList().then((res) => {
      this.roleList = res.data.list;
    });
    if (this.$route.params.uid) {
      getManageInfo(this.$route.params.uid).then((res) => {
        this.ruleForm = res.data.list;
      });
    }
  },
};
</script>
<style scoped>
.el-button--info {
  margin-left: 100px;
}
.el-input {
  width: 450px;
}
</style>