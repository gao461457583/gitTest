<template>
  <div>
    <router-link to="/cateInfo">
      <el-button type="primary">添加</el-button>
    </router-link>
    <el-table
      :data="tableList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column prop="rolename" label="图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.pid != 0"
            :src="$imgUrl + scope.row.img"
            alt=""
          />
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
import { cateList, delCate } from "../../util/request";
export default {
  data() {
    return {
      tableList: [],
      istree: true,
      pid: 0,
    };
  },
  methods: {
    del(id) {
      delCate(id).then((res) => {
        //获取列表数据
        cateList(this.pid, this.istree).then((res) => {
          this.tableList = res.data.list;
        });
      });
    },
    edit(id) {
      this.$router.push("/cateInfo/" + id);
    },
  },
  watch: {},
  mounted() {
    //获取列表数据
    cateList(this.pid, this.istree).then((res) => {
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