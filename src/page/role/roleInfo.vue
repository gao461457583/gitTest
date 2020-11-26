<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input
          v-model="ruleForm.rolename"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          :data="gmenuList"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          ref="tree"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-button type="info" class="cancle">取消</el-button>
      <el-button type="primary" @click="add" v-if="!$route.params.id">添加</el-button>
      <el-button type="primary" @click="edit" v-else >修改</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { addRole, getRoleInfo,editRoleInfo } from "../../util/request";
export default {
  data() {
    return {
      ruleForm: {
        rolename: "",
        status: 1,
        menus: [],
      },
      rules: {
        rolename: [
          { required: true, message: "角色名称必填", trigger: "blur" },
        ],
      },
      treedata: [],
      //树形结构的配置
      defaultProps: {
        //区分节点的方式
        children: "children",
        //显示的文字
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      gmenuList: "gmenuList",
    }),
  },
  methods: {
    ...mapActions({
      amenuList: "amenuList",
    }),
    add() {
        //获取树形控件中所被选中的id
      this.ruleForm.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.ruleForm);
      addRole(this.ruleForm).then((res) => {
        this.$router.back();
      });
    },
    //点击修改
    edit(){
        this.ruleForm.id=Number(this.$route.params.id)
        editRoleInfo(this.ruleForm).then(res=>{
            console.log(res);
            this.$router.back()
        })
    }
  },

  watch: {},
  created() {},
  mounted() {
    this.amenuList();
    if (this.$route.params.id) {
      getRoleInfo(this.$route.params.id).then((res) => {
        this.ruleForm = res.data.list;
        //设置属性控件
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
      });
    }
  },
};
</script>
<style scoped>
.el-input {
  width: 450px;
}

.cancle{    
    margin-left: 100px;
}
</style>