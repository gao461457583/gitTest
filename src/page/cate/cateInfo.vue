<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input
          placeholder="请输入分类名称"
          clearable
          v-model="ruleForm.catename"
        >
        </el-input>
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="changeFile"
          :disabled="ruleForm.pid == 0"
        >
          <img v-if="imageUrl" :src=" !this.$route.params.id?imageUrl:($imgUrl+imageUrl)" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { addCate, cateList, getCateInfo,editCateInfo } from "../../util/request";
export default {
  data() {
    return {
      imageUrl: "",
      list: [],

      ruleForm: {
        pid: 0,
        catename: "",
        img: "",
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
        addCate(this.ruleForm).then((res) => {
          this.$router.back();
          console.log("111");
        });
      }else{
        //修改
        this.ruleForm.id=Number(this.$route.params.id)
        editCateInfo(this.ruleForm).then(res=>{
          this.$router.back()
        })
      }
    },
    cansle() {},
    //图片改变时的监听事件
    changeFile(e) {
      let file = e.raw;
      // console.log(file);
      this.imageUrl = URL.createObjectURL(file);
      this.ruleForm.img = file;
    },
  },

  watch: {},
  created() {},
  mounted() {
    //获取列表数据
    cateList(this.ruleForm.pid).then((res) => {
      this.list = res.data.list;
    });
    //修改
    if (this.$route.params.id) {
      getCateInfo(this.$route.params.id).then((res) => {
        this.ruleForm = res.data.list;
        this.imageUrl=res.data.list.img
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

.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon[data-v-a2ee2e14] {
  border: 1px dashed #d9d9d9;
}
</style>