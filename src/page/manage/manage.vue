<template>
  <div>
    <router-link to="/manageInfo">
      <el-button type="primary">添加</el-button>
    </router-link>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>

      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
            @click="edit(scope.row.uid)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.uid)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="total"
      :page-size="size"
    >
    </el-pagination>
  </div>
</template>
<script>
import { manageList, delManage, total } from "../../util/request";
export default {
  data() {
    return {
      tableData: [],
      size: 3,
      page: 1,
      total: 0,
    };
  },
  methods: {
    //封装请求列表
    // reqManageList() {
    //   manageList(this.size, this.page).then((res) => {
    //     if (!res.data.list) {
    //       this.tableData = [];
    //     } else {
    //       this.tableData = res.data.list;
    //     }
    //   });
    // },
    del(uid) {
      delManage(uid).then((res) => {
        manageList(this.size, this.page).then((res) => {
          this.tableData = res.data.list ? res.data.list : [];
          if (this.page > 1 && this.tableData.length == 0) {
            this.page = this.page - 1;

            //调用请求列表
            manageList(this.size, this.page).then((res) => {
              this.tableData = res.data.list ? res.data.list : [];
            });
          }
          //重新获取列表总数据条数
          total().then((res) => {
            this.total = res.data.list[0].total;
          });
        });
      });
    },
    edit(uid) {
      this.$router.push("/manageInfo/" + uid);
    },
    handleCurrentChange(val) {
      this.page = val;
      manageList(this.size, this.page).then((res) => {
        this.tableData = res.data.list;
      });
    },
  },
  watch: {},
  mounted() {
    //调用请求列表
    manageList(this.size, this.page).then((res) => {
      if (!res.data.list) {
        this.tableData = [];
      } else {
        this.tableData = res.data.list;
      }
    });
    //计算总条目数
    total().then((res) => {
      this.total = res.data.list[0].total;
    });
  },
};
</script>
<style>
</style>