<template>
  <div>
    <router-link to="/info">
      <el-button type="primary">添加</el-button>
    </router-link>
    <el-table
      :data="gmenuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="" effect="dark" v-if="scope.row.status === 1"
            >启用</el-tag
          >
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { delMenu } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alter";
export default {
  data() {
    return {};
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

  //编辑
  edit(id){
    this.$router.push('/info/'+id)
  },
    //删除
    del(id) {
      delMenu(id).then((res) => {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.amenuList();
            } else {
              warningAlert(res.data.msg);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
  },
  watch: {},
  mounted() {
    this.amenuList();
  },
};
</script>
<style scoped>
</style>