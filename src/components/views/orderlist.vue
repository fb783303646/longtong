<template>
  <div class="page-products">
    <div class="box-tab">
      <el-row class="tab-header">
        <!-- <el-col :span="2" class="tetle-hd">
          <el-dropdown @command="handleCommand">
            <el-button size="mini">批量操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu size="mini" slot="dropdown">
              <el-dropdown-item command="1">上架</el-dropdown-item>
              <el-dropdown-item command="2">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col> -->
        <el-col :span="18">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchName" size="mini" placeholder="商品名称/商品货号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchPhone" size="mini" placeholder="收货人姓名/手机号码"></el-input>
            </el-form-item>
            <el-form-item >
              <el-date-picker v-model="searchDate" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" style="width:260px;" ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchOrderType" size="mini" placeholder="订单类型" style="width:100px;" >
                <el-option label="全部" value="''"></el-option>
                <el-option :label="item.caption" :value="item.value" v-for="item in orderTypeList" :key="this"  ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchStutas" size="mini" placeholder="结算状态" style="width:100px;" >
                <el-option label="全部" value="''"></el-option>
                <el-option  :label="item.caption" :value="item.value" v-for="item in searchStutasList" :key="this"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="searchData" >查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right;">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="createDistribution" >分销订单</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="createServicesOrder" >订单服务</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" border :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="订单编号"  prop="distributionOrderSn" ></el-table-column>
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column label="数量" width="100" >
          <template slot-scope="scope">{{ scope.row.saleNum}}吨</template>
        </el-table-column>
        <el-table-column prop="mobilePhone" label="用户账号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="订单类型" width="120" ></el-table-column>
        <el-table-column prop="channel" label="订单来源" show-overflow-tooltip></el-table-column>
        <el-table-column prop="commission" label="获得佣金" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="100"></el-table-column>
        <el-table-column prop="settlementStatus" label="分销佣金结算状态" show-overflow-tooltip></el-table-column>

        <el-table-column prop="address" label="操作" width="120">
          <template slot-scope="scope">
            <a class="icon-box" title="查看订单"><i class="el-icon-view"></i></a>
            <a class="icon-box" title="更改状态" @click="changeStutas(scope.row)" ><i class="el-icon-setting"></i></a>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="page-box">

        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total=total>
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- Form orderValidator -->
    <el-dialog title="结算金额" :visible.sync="dialogTableVisible" width="400px">
      <el-form ref="checkoutFrom" :inline="true" :model="checkoutFrom"  >
        <el-form-item label="结算金额：" prop="money" label-width="120px" :rules="[
          { required: true, message: '金额不能为空'},
          { type: 'number', message: '金额必须为数字值'}]" >
          <el-input v-model.number="checkoutFrom.money" auto-complete="off"  placeholder="请输入金额"  ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="saveChekout" >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import http from '../../api/http'
import api from '../../api/api'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchName:'',
      searchPhone:'',
      searchDate:'',
      searchOrderType:'',
      searchStutas:'',
      orderTypeList:[],
      searchStutasList:[],
      checkoutFrom:{
        money:''
      },
      globalId:'',
      currentPage: 1,
      pageSize:10,
      total: 40,
      dialogTableVisible: false,
      checked: false,
      loading: false,
      activeName2: 'first'
    }
  },
  created () {
    this.getOrderList();
    this.getOrderType();
    this.getTlementStatues();
  },
  methods: {
    getOrderList (res) {
      this.loading = true;
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }
      let data = res || {};
      let options = Object.assign(data,params);
      http.get(api.get_orderList, options).then((res)=>{
        if(res.code == 0){
          this.tableData = res.data.records;
          this.total = res.data.paging.total;
          this.loading = false;
        }else{
          this.$message.error(res.message);
        }
      });
    },
    searchData () {
      const option = {
        searchName:this.searchName,
        searchPhone:this.searchPhone,
        searchDate:this.searchDate,
        searchOrderType:this.searchOrderType,
        searchStutas:this.searchStutas,
      }
      this.getOrderList(option);
    },
    getOrderType () {
      http.get(api.get_orderTypes).then((res)=>{
        this.orderTypeList = res.data.records;
      });
    },
    getTlementStatues () {
      http.get(api.get_settlementStatues).then((res)=>{
        this.searchStutasList = res.data.records;
      });
    },
    changeStutas (data) {
      this.dialogTableVisible = true;
      this.checkoutFrom = {
        money:data.commission
      };
      this.globalId = data.distributionOrderId;
      
    },
    saveChekout () {
      const option = {
        settlementAmount:this.checkoutFrom.money,
        id:this.globalId
      }
      this.$confirm('确定修改金额吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.checkoutFrom.validate((valid) => {
            if(valid) {
               http.post(api.set_setTlemnet,option).then((res) => {
                 if(res.code ==0) {
                    this.getOrderList();
                    this.dialogTableVisible = false;
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    });
                 }
              });
            }
          });
        }).catch(() => {
          this.dialogTableVisible = false;
          this.$message({
            type: 'info',
            message: '已取消更改'
          });          
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    },
    handleCommand(command) {
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
      let selectarry = [];
      this.multipleSelection.forEach(element => {
        selectarry.push(element.distributionOrderId);
      });
      const option ={idsStr:selectarry.toString()};
      this.$confirm('确定删除所选订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.post(api.remove_order,option).then((res) => {
              if(res.code ==0) {
                this.getOrderList();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    createDistribution () {
      this.$router.push({ path: '/orderlist/distributionorders' });
    },
    createServicesOrder () {
      this.$router.push({ path: '/orderlist/serviceorders' });
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
