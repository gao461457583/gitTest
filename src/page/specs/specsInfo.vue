<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input
          placeholder="请输入规格名称"
          clearable
          v-model="ruleForm.specsname"
        >
        </el-input>
      </el-form-item>

      <el-form-item
        label="规格属性"
        v-for="(item, index) in ruleForm.attrs"
        :key="index"
      >
        <div class="inpTop">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" @click="addAttr" v-if="index == 0"
            >新增规格属性</el-button
          >
          <el-button type="danger" @click="delAttr(index)" v-else
            >删除</el-button
          >
        </div>
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
import { addSpecs,getSpecsInfo,editSpecsInfo } from "../../util/request";
export default {
  data() {
    return {
      ruleForm: {
        specsname: "",
        attrs: [{ value: "" }, { value: "" }],
        status: 1,
      },
    };
  },
  computed: {},
  methods: {
    //点击确定按钮
    add() {
      if (!this.$route.params.id) {
        //添加
        this.ruleForm.attrs = JSON.stringify(
          this.ruleForm.attrs.map((item) => item.value)
        );
        addSpecs(this.ruleForm).then((res) => {
          this.$router.back();
        });
      } else {
        //修改
        this.ruleForm.id = Number(this.$route.params.id);
        // ==================疑问=========================
       this.ruleForm.attrs = JSON.stringify(this.ruleForm.attrs.map(item=>item.value))
        editSpecsInfo(this.ruleForm).then((res) => {
          this.$router.back();
        });
      }
    },
    cansle() {},
  
    //点击添加规格属性这个按钮
    addAttr() {
      this.ruleForm.attrs.push({ value: "" });
      console.log(this.ruleForm.attrs);
    },
    //点击删除按钮
    delAttr(index) {
      this.ruleForm.attrs.splice(index, 1);
    },
  },

  watch: {},
  created() {},
  mounted() {
      //获取本条信息
      getSpecsInfo(this.$route.params.id).then(res=>{
          this.ruleForm=res.data.list[0]
          // ==========================重点=========================================
          this.ruleForm.attrs=JSON.parse(this.ruleForm.attrs).map(item=>({value:item}))
      })
      
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