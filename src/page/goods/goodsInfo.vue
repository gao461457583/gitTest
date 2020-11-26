<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类">
        <el-select v-model="ruleForm.first_cateid" @change="changFirst">
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="item in fiList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select v-model="ruleForm.second_cateid">
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="item in seList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input
          placeholder="请输入商品名称"
          clearable
          v-model="ruleForm.goodsname"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input placeholder="请输入价格" clearable v-model="ruleForm.price">
        </el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="market_price">
        <el-input
          placeholder="请输入市场价格"
          clearable
          v-model="ruleForm.market_price"
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

      <el-form-item label="商品规格">
        <el-select v-model="ruleForm.specsid" @change="changeSpecs">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option
            v-for="item in specs"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性">
        <el-select v-model="ruleForm.specsattr" multiple="">
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="item in specsAttr"
            :key="item.id"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品">
        <template>
          <el-radio v-model="ruleForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="ruleForm.isnew" :label="2">否</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="是否热卖">
        <template>
          <el-radio v-model="ruleForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="ruleForm.ishot" :label="2">否</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="商品描述">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="ruleForm.description"
        ></textarea>
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
  getGoodsInfo,
  editGoodsInfo,
  addGoods,
} from "../../util/request";
export default {
  data() {
    return {
      imageUrl: "",
      fiList: [],
      seList: [],
      specs: [],
      specsAttr: [],
      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        specsattr: "",
        description: "",
        isnew: 1,
        ishot: 1,
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
        this.ruleForm.specsattr = JSON.stringify(this.ruleForm.specsattr);
        addGoods(this.ruleForm).then((res) => {
          this.$router.back();
          console.log("111");
        });
      } else {
        //修改
        this.ruleForm.id = Number(this.$route.params.id);
        this.ruleForm.specsattr = JSON.stringify(this.ruleForm.specsattr);
        editGoodsInfo(this.ruleForm).then((res) => {
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
    //监听一级分类的改变
    changFirst() {
      cateList({ pid: this.ruleForm.first_cateid }).then((res) => {
        this.ruleForm.second_cateid = "";
        this.seList = res.data.list;
      });
    },
    //监听商品规格的改变
    changeSpecs() {
      specsList().then((res) => {
        this.ruleForm.specsattr = "";
        // =====================重要==============================
        let obj = res.data.list.find(
          (item) => item.id == this.ruleForm.specsid
        );
        this.specsAttr = JSON.parse(obj.attrs);
      });
    },
  },

  watch: {},
  created() {},
  mounted() {
    //获取商品分类列表数据
    cateList({ pid: 0 }).then((res) => {
      this.fiList = res.data.list;
    });
    //获得商品规格列表数据
    specsList().then((res) => {
      this.specs = res.data.list;
    });
    //修改
    if (this.$route.params.id) {
      getGoodsInfo(this.$route.params.id).then((res) => {
        this.ruleForm = res.data.list;
        this.ruleForm.specsattr = JSON.parse(this.ruleForm.specsattr);
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
.avatar-uploader-icon[data-v-a2ee2e14] {
  border: 1px dashed #d9d9d9;
}
</style>