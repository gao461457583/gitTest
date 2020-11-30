<template >
  <div id="body">
    <div class="wrap">
      <!-- model 表单的数据
      rules 校验规则
      ref 获取这个DOM节点，方便操作 -->
      <h3>小U商城后台管理系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="00px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <!-- <el-input
          placeholder="请输入密码"
          v-model="input"
          show-password
          prefix-icon="el-icon-lock"
        ></el-input> -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {reqLogin} from "../../util/request"
import {successAlert,warningAlert} from "../../util/alter"
export default {
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
      reqUserInfoAction:"reqUserInfoAction"
    }),
    //登录
    login(){
    reqLogin(this.ruleForm).then(res=>{
      if(res.data.code==200){
        successAlert(res.data.msg)
        // 1.将res.data.list存入到状态层
        this.reqUserInfoAction(res.data.list)
        // 2.进入主页
        this.$router.push("/")
      }else{
        warningAlert(res.data.msg)
      }
    })
    }
  },
  data() {
    return {
      ruleForm: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 10, message: "长度在6-10个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
};
</script>

<style scoped >
#body {
  background-color: lightblue;
  background-image: -moz-linear-gradient(red to yellow);
  width: 100%;
  height: 608px;
  overflow: hidden;
}
.wrap {
  width: 400px;
  height: 260px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 174px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);
}
.demo-ruleForm {
  width: 320px;
  height: 34px;
  margin: 0 auto;
}
h3 {
  text-align: center;
  color: rgb(251, 109, 73);
  line-height: 60px;
}
.el-button--primary {
  width: 320px;
  height: 40px;
  line-height: 10px;
  background-color: rgb(251, 109, 73);
  border: 0;
}
</style>