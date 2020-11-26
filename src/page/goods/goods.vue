<template>
  <div>
    <router-link to="/goodsInfo">
      <el-button type="primary">添加</el-button>
    </router-link>
    <el-table
      :data="tableList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="rolename" label="图片">
        <template slot-scope="scope">
          <img
            :src="$imgUrl + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品">
        <template slot-scope="scope">
          <el-tag type="" effect="dark" v-if="scope.row.status == 1"
            >是</el-tag
          >
          <el-tag type="info" effect="dark" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖">
        <template slot-scope="scope">
          <el-tag type="" effect="dark" v-if="scope.row.status == 1"
            >是</el-tag
          >
          <el-tag type="info" effect="dark" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="" effect="dark" v-if="scope.row.status == 1"
            >启用</el-tag
          >
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { goodsList,delGoods} from "../../util/request";
export default {
  data() {
    return {
      tableList: [],
      form:{
          size:4,
          page:1,   
      }
    };
  },
  methods: {
    del(id) {
      delGoods(id).then((res) => {
        //获取列表数据
        goodsList(this.form).then((res) => {
          this.tableList = res.data.list;
        });
      });
    },
    //点击编辑
    edit(id) {
      this.$router.push("/goodsInfo/" + id);
    },
  },
  watch: {},
  mounted() {
    //获取列表数据
    goodsList(this.form).then((res) => {
      this.tableList = res.data.list;
    });
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>