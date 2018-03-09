<template>
  <div class="page-log">
    <div class="box-tab">
      <el-row class="tab-header">
        <el-col :span="2" class="tetle-hd">
          <el-dropdown @command="handleCommand">
            <el-button size="mini">批量操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu size="mini" slot="dropdown">
              <el-dropdown-item command="2">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
        <el-col :span="15"> 
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item >
              <el-input v-model="searchName" size="mini" placeholder="请输入操作人员"></el-input>
            </el-form-item>
            <el-form-item >
              <el-date-picker
                v-model="region"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" size="mini" style="width:260px;" >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="onSearch" >查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right;">
         <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="清除日志：" >
               <el-date-picker v-model="value2" size="mini" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" border :data="tableData"  v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品编号" prop="sn"  width="120"></el-table-column>
        <el-table-column prop="naproductNumme" label="操作者"width="120"></el-table-column>
        <el-table-column prop="internalPrice" label="操作日期"  width="180"></el-table-column>
        <el-table-column prop="salePrice" label="IP地址"  width="260"></el-table-column>
        <el-table-column prop="name" label="操作记录" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-row class="page-box">
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total=total>
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import http from '../../api/http'
import apiUrl from '../../api/apiurl'
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
      activeName2: 'first',
      value2:'',
      pickerOptions1:{
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created () { 
    this.getDataList();
    this.getReginData();
  },
  methods: {
    getReginData () {
      http.get(apiUrl.regionUrl).then((res)=>{
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
      http.get(apiUrl.productUrl, option).then((res)=>{
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
<style scoped lang="scss">
  .page-log{
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
  }
</style>
