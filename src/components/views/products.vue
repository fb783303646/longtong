<template>
  <div class="page-products">

    <el-tabs v-model="activeName2" class="addClass" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部商品(10000)" name="first"></el-tab-pane>
      <el-tab-pane label="已上架(1000)" name="second"></el-tab-pane>
      <el-tab-pane label="未上架(1000)" name="third"></el-tab-pane>
      <el-tab-pane label="待审核(1000)" name="fourth"></el-tab-pane>
      <el-tab-pane label="未通过(1000)" name="fourthd"></el-tab-pane>
    </el-tabs>

    <div class="box-tab">
      <el-row class="tab-header">
        <el-col :span="3" class="tetle-hd">
          <el-dropdown @command="handleCommand">
            <el-button size="mini">批量操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu size="mini" slot="dropdown">
              <el-dropdown-item command="1">上架</el-dropdown-item>
              <el-dropdown-item command="2">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
        <el-col :span="15"> 
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchName" size="mini" placeholder="商品名称/品牌"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="region" size="mini" placeholder="请选择供货地区">
                <el-option v-for="item in regionList" :key="item.name" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="onSearch" >查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right;">
          <el-button size="small" type="primary">添加商品</el-button>
          <el-button size="small" type="primary">批量导入</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" border :data="tableData"  v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品编号" prop="sn"  width="120"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
        <el-table-column label="价格" show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="no-magtop">采购价:￥{{ scope.row.purchasingPrice}}</p>
            <p class="no-magtop">内部定价:￥{{ scope.row.internalPrice}}</p>
            <p class="no-magtop">分销价:￥{{ scope.row.salePrice}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="saleRegions" label="供货地区" show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="no-magtop" v-for="item in scope.row.saleRegions">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.inventory }}吨</template>
        </el-table-column>
        <el-table-column prop="productNum" label="销量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="审核状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isApproved">已审核</span>
            <span v-if="!scope.row.isApproved">未审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="是否上架" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isApproved" active-color="#13ce66" inactive-color="#909399"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <a class="icon-box" title="编辑">
              <i class="el-icon-edit"></i>
            </a>
            <a class="icon-box" title="审核详情" v-if="!scope.row.isApproved">
              <i class="el-icon-view"></i>
            </a>
            <a class="icon-box" title="审核" v-if="scope.row.isApproved">
              <i class="el-icon-edit-outline"></i>
            </a>
            <a class="icon-box" title="删除">
              <i class="el-icon-delete"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="page-box">
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total=total>
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="tableData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import http from '../../api/http'
import apiurl from '../../api/apiurl'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchName:'',
      region:'',
      regionList:[],
      currentPage: 1,
      pageSize:1,
      total: 40,
      dialogTableVisible: false,
      checked: false,
      loading: false,
      activeName2: 'first'
    }
  },
  created () { 
    this.getDataList();
    this.getReginData();
  },
  methods: {
    getReginData () {
      http.get(apiurl.regionUrl).then((res)=>{
      if(res.code == 0){
          this.regionList = res.data.records
        }else{
          this.$message.error(res.messaage);
        }
      });
    },
    getDataList (res) {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }
      let data = res || {};
      let option = Object.assign(data,params);
      http.get(apiurl.productUrl, option).then((res)=>{
        this.loading = true;
        if(res.code == 0){
          this.loading = false;
          this.total = res.data.paging.total;
          this.tableData = res.data.records
        }else{
          this.$message.error(res.messaage);
        }
      });
    },
    onSearch () {
      let params = {
        pageNo: 1,
        name:this.searchName,
        regionId:this.region
      }
      this.getDataList(params);
    },
    handleSizeChange(val) {
      console.log('dd');
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCommand(command) {
      // this.dialogTableVisible = true;
      // this.$message('click on item ' + command);
      let len = this.multipleSelection.length;
      if (len <= 0) {
        this.$message({
          type: 'warning',
          message: '请勾选商品!'
        });
        return false;
      }
      switch (command) {
        case '2':
          this.handleDelete();
          break;
        default:
          break;
      }
    },
    handleDelete() {
      this.$message('click on item ');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
<style  lang="scss">
.page-products {
  .header-row {
    .el-form-item {
      margin-top: 20px;
    }
  }
  .no-magtop {
    margin-top: 0;
    margin-bottom: 0;
  }
  .addClass {
    .el-tabs__header {
      border-bottom: none !important;
    }
  }
  .el-tabs__header {
    margin: 0;
  }
  .tab-header {
    padding: 10px;
    border: 1px solid #ebeef5;
    border-bottom: none;
    .tetle-hd {
      line-height: 32px;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .page-box {
    padding-top: 10px;
  }
  .page-nation {
    text-align: right;
  }
  .icon-box {
    font-size: 20px;
    padding: 0 5px;
    cursor: pointer;
  }
}
</style>
