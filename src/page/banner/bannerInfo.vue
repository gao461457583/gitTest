<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >

      <el-form-item label="标题">
        <el-input
          placeholder="请输入商品名称"
          clearable
          v-model="ruleForm.title"
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
          <img
            v-if="imageUrl"
            :src="!this.$route.params.id ? imageUrl : $imgUrl + imageUrl"
            class="avatar"
          />
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
import {
  addCate,
  cateList,
  specsList,
  getBannerInfo,
  editBannerInfo,
  addBanner,
} from "../../util/request";

export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
       title:"",
       img:"",
       status:1
      },
    };
  },
  computed: {},
  methods: {
    //点击确定按钮
    add() {
      if (!this.$route.params.id) {
        //添加
        addBanner(this.ruleForm).then((res) => {
          this.$router.back();
          console.log("111");
        });
      } else {
        //修改
        this.ruleForm.id = Number(this.$route.params.id);
        editBannerInfo(this.ruleForm).then((res) => {
          console.log(res);
          this.$router.back();
        });
      }
    },
    cansle() {},
    //图片改变时的监听事件
    changeFile(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.ruleForm.img = file;
    },
   
  },

  watch: {},
  created() {},
  mounted() {
    //点击修改时 自动请求列表
    if (this.$route.params.id) {
      getBannerInfo(this.$route.params.id).then((res) => {
        this.ruleForm = res.data.list;
        this.imageUrl = res.data.list.img;
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
.avatar-uploader-icon[data-v-019e1ff8] {
  border: 1px dashed #d9d9d9;
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
.avatar-uploader-icon[data-v-34948dd6]{
  border: 1px dashed #d9d9d9;
}
</style>