<template>
  <div class="page-userdetail">
    <el-card class="box-card"  >
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-row>
        <el-col :span="6">
          <p>用户名：13265694584</p>
          <p>联系人：张三</p>联系人：张三
          <p>身份证号：355676598575758697</p>
          <p>联盟ID：34343434</p>
          <p>注册时间：2017-10-01</p>
        </el-col>
        <el-col :span="6">
          <p>用户名：13265694584</p>
          <p>联系人：张三</p>联系人：张三
          <p>身份证号：355676598575758697</p>
          <p>联盟ID：34343434</p>
          <p>注册时间：2017-10-01</p>
        </el-col>
        <el-col :span="6">
          <p>用户名：13265694584</p>
          <p>联系人：张三</p>联系人：张三
          <p>身份证号：355676598575758697</p>
          <p>联盟ID：34343434</p>
          <p>注册时间：2017-10-01</p>
        </el-col>
      </el-row>
    </el-card>
    <div class="box-tab">
      <el-row>
        <el-col :span="24" >
          <h3>订单记录</h3>
        </el-col>
      </el-row>
      <el-tabs type="card" class="addClass" >
        <el-tab-pane label="分销用户">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单服务客户">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-row class="page-box">
          <el-col :span="24" class="page-nation">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total>
            </el-pagination>
          </el-col>
        </el-row>
    </div>

    <div class="box-tab">
      <el-row>
        <el-col :span="24" >
          <h3>客户统计</h3>
        </el-col>
      </el-row>
      <el-tabs type="card" class="addClass" >
        <el-tab-pane label="分销用户">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单服务客户">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
       <el-row class="page-box">
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total>
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      msg: 'detail',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1,
      pageSize:1,
      total: 40
    }
  },
   methods:{
      handleSizeChange(val) {
        console.log('dd');
      },
      handleCurrentChange(val) {
        console.log(val);
      },
    }
}
</script>

<style  lang="scss" >
  .page-userdetail{
    .addClass {
      .el-tabs__header {
        border-bottom: none !important;
      }
    }
    .el-tabs__header {
      margin: 0;
    }
    .page-box {
      padding-top: 10px;
    }
    .page-nation {
      text-align: right;
    }
  }
 
</style>
