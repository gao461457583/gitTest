<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" clearable v-model="ruleForm.phone">
        </el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          placeholder="请输入昵称"
          clearable
          show-password
          v-model="ruleForm.nickname"
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
  getMemberInfo,
  editMemberInfo,
} from "../../util/request";
export default {
  data() {
    return {
      ruleForm: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {},
  methods: {
    //点击确定按钮 (1.关闭组件 2.发请求 3重置表单)
    add() {
      this.ruleForm.uid = this.$route.params.uid;
      editMemberInfo(this.ruleForm).then((res) => {
        this.$router.back();
        console.log(res);
      });
    },
    cansle() {},
  },

  watch: {},
  created() {},
  mounted() {
    if (this.$route.params.uid) {
      console.log(this.$route.params.uid);
      getMemberInfo(this.$route.params.uid).then((res) => {
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