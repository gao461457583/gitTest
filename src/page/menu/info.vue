<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="上级目录" prop="pid">
        <el-select v-model="ruleForm.pid" @change="change">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in gmenuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 下拉框中的value和lable比较 特殊 -->
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1" disabled>目录</el-radio>
          <el-radio :label="2" disabled>菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon" v-if="ruleForm.type == 1">
        <el-select v-model="ruleForm.icon">
          <el-option :value="item" v-for="item in icons" :key="item"
            ><i :class="item"></i
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 地址 -->
      <el-form-item label="地址" prop="url" placeholder="请选择" v-else>
        <el-select v-model="ruleForm.url">
          <el-option
            v-for="(item, index) in indexRouters"
            :key="index"
            :value="'/' + item.path"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cansle">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { indexRouters } from "../../router/index";
import { successAlert, warningAlert } from "../../util/alter";
import { menuAdd, getInfo,editInfo} from "../../util/request";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      indexRouters: indexRouters,
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      ruleForm: {
        title: "",
        pid: 0,
        type: 1,
        status: 1,
        icon: "",
        url: "",
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
    //下拉框改变事件
    change() {
      if (this.ruleForm.pid === 0) {
        this.ruleForm.type = 1;
      } else {
        this.ruleForm.type = 2;
      }
    },

    //点击取消按钮 (1.清空表单)
    cansle() {
      this.rest();
      this.$router.push("/menu");
    },

    //重置form表单
    rest() {
      this.ruleForm = {
        title: "",
        pid: 0,
        type: 1,
        status: 1,
        icon: "",
        url: "",
      };
    },

    //点击确定按钮 (1.关闭组件 2.发请求 3重置表单)
    add() {
      if (!this.$route.params.id){
        menuAdd(this.ruleForm).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.rest();
            this.$router.push("/menu");
          } else {
            warningAlert(res.data.msg);
          }
        });
      }else{
        this.ruleForm.id=Number(this.$route.params.id)
        editInfo(this.ruleForm).then(res=>{
          if(res.data.code==200){
            this.$router.push("/menu")
            this.amenuList()
          }
        })
      }
        
    },
  },

  watch: {},
  created() {},
  mounted() {
    //获取下拉列表
    this.amenuList();
    if (this.$route.params.id) {
      getInfo(this.$route.params.id).then((res) => {
        this.ruleForm = res.data.list;
      });
    }
  },
};
</script>
<style>
</style>