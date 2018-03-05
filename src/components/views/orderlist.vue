<template>
  <div class="page-products">

    <el-tabs v-model="activeName2" class="addClass" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部订单(1000)" name="first"></el-tab-pane>
      <el-tab-pane label="待确定订单(1000)" name="second"></el-tab-pane>
      <el-tab-pane label="款项未清(1000)" name="third"></el-tab-pane>
      <el-tab-pane label="已发货(1000)" name="fourth"></el-tab-pane>
      <el-tab-pane label="已完成(1000)" name="fourthd"></el-tab-pane>
      <el-tab-pane label="已关闭(1000)" name="fourthd"></el-tab-pane>
      
    </el-tabs>

    <div class="box-tab">
      <el-row class="tab-header">
        <el-col :span="2" class="tetle-hd">
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
        <el-col :span="16">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.user" size="mini" placeholder="商品名称/商品货号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formInline.user" size="mini" placeholder="收货人姓名/手机号码"></el-input>
            </el-form-item>
            <el-form-item >
              <el-date-picker
                v-model="formInline.value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" size="mini" style="width:260px;" >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.region" size="mini" placeholder="订单类型" style="width:100px;" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.region" size="mini" placeholder="结算状态" style="width:100px;" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right;">
          <el-button size="small" type="primary">添加订单</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" border :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="订单编号" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120">
        </el-table-column>
        <!-- <el-table-column label="价格" show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="no-magtop">采购价:￥{{ scope.row.pice}}</p>
            <p class="no-magtop">内部定价:￥{{ scope.row.pice}}</p>
            <p class="no-magtop">分销价:￥{{ scope.row.pice}}</p>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="areas" label="供货地区" show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="no-magtop" v-for="item in scope.row.areas">{{ item }}</p>
          </template>
        </el-table-column> -->
        <el-table-column prop="inventory" label="数量" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.inventory }}吨</template>
        </el-table-column>
        <el-table-column prop="sales" label="销量" show-overflow-tooltip>
        </el-table-column>
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
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total>
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
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 111,
        inventory: 20,
        areas: ['华东', '华南'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 33,
        inventory: 202,
        areas: ['华东', '华南'],
        sales: 1400,
        isApproved: true
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 450,
        inventory: 2,
        areas: ['华东'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 655,
        inventory: 20,
        areas: [],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 789,
        inventory: 204,
        areas: ['华东', '华南'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 345,
        inventory: 220,
        areas: ['华东', '华南'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 1111,
        inventory: 20,
        areas: ['华东', '华南'],
        sales: 1300,
        isApproved: false
      }],
      multipleSelection: [],
      formInline: {
        user: '',
        value6:'',
        region: ''
      },
      currentPage: 1,
      total: 40,
      dialogTableVisible: false,
      checked: false,
      loading: false,
      activeName2: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
