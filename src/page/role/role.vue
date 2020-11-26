<template>
  <div>
    <router-link to="/roleInfo">
      <el-button type="primary" >添加</el-button>
    </router-link>
    <el-table border style="width: 100%" row-key="id" :data="tableData">
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="" effect="dark" v-if="scope.row.status===1">启用</el-tag>
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
import { roleList, delRole,getRoleInfo  } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alter";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getlist() {
      roleList().then((res) => {
        this.tableData = res.data.list;
      });
    },
    edit(id) {
      this.$router.push("/roleInfo/"+id);
      getRoleInfo(id).then(res=>{
        console.log(res);
      })
    },
    del(id) {
      delRole(id).then((res) => {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.getlist();
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
    this.getlist();
  },
};
</script>
<style>
</style>