<template>
  <div class="page-userdetail">
    <el-card class="box-card"  >
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-row>
        <el-col :span="6">
          <p>手机号码：{{infoData.mobilePhone}}</p>
          <p>提成方式：个人提成{{infoData.commissionRate}}%<span class="tips-text">修改</span></p>
          <p>订单数量：{{infoData.orderNum}}</p>
          <p>注册时间：{{infoData.startTime}}</p>
        </el-col>
        <el-col :span="6">
          <p>联系人：{{infoData.contact}}</p>
          <p>用户身份：
            <span v-for="item in infoData.roleNames" class="tips-border">
              <el-tag size="small" :type="item === '分销' ? 'primary' : 'danger'" >{{ item }}</el-tag>
            </span>
          </p>
          <p>赚得佣金：{{infoData.commission}}</p>
          <p>状态：{{infoData.enabled==true?'启用':'禁用'}}</p>
        </el-col>
        <el-col :span="6">
          <p>所属公司：{{infoData.company}}</p>
          <p>待结算佣金：{{infoData.settlement}}</p>
        </el-col>
      </el-row>
    </el-card>
    <div class="box-tab">
      <h3 class="page-title">订单记录</h3>
      <el-tabs type="card" v-model="activeName"  class="addClass" @tab-click="onHandleClick" >
        <el-tab-pane label="分销用户" name="1" >
          <el-table :data="orderUserData" border style="width: 100%">
            <el-table-column prop="distributionOrderSn" label="编号" width="180"></el-table-column>
            <el-table-column prop="productName" label="商品名称" width="180"></el-table-column>
            <el-table-column prop="customMobilePhone" label="联系方式"></el-table-column>
            <el-table-column prop="customAdress" label="地址"></el-table-column>
            <el-table-column prop="commission" label="获得佣金"></el-table-column>
            <el-table-column prop="settlementStatus" label="结算状态"></el-table-column>
            <el-table-column label="操作" width="160"  >
              <template slot-scope="scope">
                <a class="icon-box" title="查看" ><i class="el-icon-view"></i></a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单服务客户" name="2" >
          <el-table :data="orderService" border style="width: 100%">
            <el-table-column prop="distributionOrderSn" label="编号" width="180"></el-table-column>
            <el-table-column prop="productName" label="商品名称" width="180"></el-table-column>
            <el-table-column  label="上/下游联系方式">
              <template slot-scope="scope">
                <p>上：{{scope.row.upriverMobilePhone}}</p>
                <p>下：{{scope.row.downriverMobilePhone}}</p>
              </template>
            </el-table-column>
            <el-table-column  label="上/下游地址">
              <template slot-scope="scope">
                <p>上：{{scope.row.upriverAdress}}</p>
                <p>下：{{scope.row.downriverAdress}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="commission" label="获得佣金"></el-table-column>
            <el-table-column prop="settlementStatus" label="结算状态"></el-table-column>
            <el-table-column label="操作" width="160"  >
              <template slot-scope="scope">
                <a class="icon-box" title="查看" ><i class="el-icon-view"></i></a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-row class="page-box" v-if="total>0">
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total>
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <div class="box-tab">
      <h3 class="page-title">客户统计</h3>
      <el-tabs type="card" class="addClass" v-model="activeIndex" @tab-click="onChangeClick" >
        <el-tab-pane label="分销用户" name="1" >
           <el-table :data="customersUserData" border style="width: 100%">
            <el-table-column prop="fullName" label="姓名" width="180"></el-table-column>
            <el-table-column prop="mobilePhone" label="联系电话" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单服务客户" name="2" >
           <el-table :data="customersServiceData" border style="width: 100%">
            <el-table-column label="联系方式" >
              <template slot-scope="scope">
                <p>上：{{scope.row.upriverFullName}}<span style="padding-left:10px">{{scope.row.upriverMobilePhone}}</span></p>
                <p>下：{{scope.row.downriverFullName}}<span style="padding-left:10px">{{scope.row.downriverMobilePhone}}</span></p>
              </template>
            </el-table-column>
            <el-table-column  label="上/下游地址" >
               <template slot-scope="scope">
                <p>上：{{scope.row.upriverAdress}}</p>
                <p>下：{{scope.row.downriverAdress}}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
       <el-row class="page-box" v-if="allTotal>0" >
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="onChangePageSize" @current-change="onChangePageIndex" :current-page="pageIndex" :page-sizes="[1, 2, 3, 4]" :page-size="pageNmb" background layout="total, sizes, prev, pager, next, jumper" :total=allTotal>
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import http from '../../api/http'
import api from '../../api/api'
import { getdate } from '../../utils/date'
export default {
  name: 'detail',
  data () {
    return {
      glodbelId:'',
      infoData:{
        mobilePhone:'',
        contact:'',
        commissionRate:'',
        orderNum:0,
        startTime:'2017-02-02',
        roleNames:[],
        enabled:true,
        commission:'',
        company:'',
        settlement:0
      },
      activeName:'1',
      activeIndex:'1',
      orderUserData:[],
      orderService:[],
      customersUserData:[],
      customersServiceData:[],
      currentPage: 1,
      pageSize:10,
      total: 0,
      pageIndex: 1,
      pageNmb:10,
      allTotal: 0,
    }
  },
  created () {
    this.glodbelId = this.$route.query.id;
    this.getDataInfo(this.glodbelId);
    this.getOrderUserData();
    // this.getOrderServiceData();
    this.getUserCustomers();
    this.getServiceCustomers();
  },
  methods:{
    /**
     * 获取用户信息
     */
    getDataInfo (id) {
      http.get(api.get_single_role+id).then((res) => {
        if(res.code == 0){
          let newData = res.data.records;
          newData.startTime = getdate(newData.createTime);
          this.infoData = Object.assign(this.infoData,newData);
        }
      });
    },
    /**
     * 获取订单记录用户列表
     */
    getOrderUserData () {
      let parmas = {
        id: this.glodbelId,
        pageNo:this.currentPage,
        pageSize:this.pageSize,
      }
       http.get(api.get_order_disribution, parmas).then((res) => {
         if(res.code == 0){
            this.orderUserData = res.data.records;
            this.total = res.data.paging.total;
         }else{
           this.$message.error(res.message);
         }
      });
    },
    /**
     * 获取订单记录客户订单列表
     */
    getOrderServiceData () {
      let parmas = {
        id: this.glodbelId,
        pageNo:this.currentPage,
        pageSize:this.pageSize,
      }
       http.get(api.get_order_service, parmas).then((res) => {
         if(res.code == 0){
           this.orderService = res.data.records;
           this.total = res.data.paging.total;
         }else{
           this.$message.error(res.message);
         }
      });
    },
    onHandleClick (tab, event) {
      if(this.activeName=='1') {
        this.getOrderUserData();
      }else {
        this.getOrderServiceData();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if(this.activeName=='1') {
        this.getOrderUserData();
      }else {
        this.getOrderServiceData();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if(this.activeName=='1') {
        this.getOrderUserData();
      }else {
        this.getOrderServiceData();
      }
    },
    /**
     * 获取客户统计用户信息
     */
    getUserCustomers(){
      let parmas = {
        id: this.glodbelId,
        pageNo:this.pageIndex,
        pageSize:this.pageNmb,
      }
      http.get(api.get_customers_disribution, parmas).then((res) => {
         if(res.code == 0){
           this.customersUserData = res.data.records;
           this.allTotal = res.data.paging.total;
         }else{
           this.$message.error(res.message);
         }
      });
    },
    /**
     * 获取客户统计订单服务信息
     */
    getServiceCustomers () {
      let parmas = {
        id: this.glodbelId,
        pageNo:this.pageIndex,
        pageSize:this.pageNmb,
      }
      http.get(api.get_customers_service, parmas).then((res) => {
         if(res.code == 0){
            this.customersServiceData = res.data.records;
            this.allTotal = res.data.paging.total;
         }else{
           this.$message.error(res.message);
         }
      });
    },
    onChangeClick () {
      if(this.activeIndex=='1') {
        this.getUserCustomers();
      }else {
        this.getServiceCustomers();
      }
    },
    onChangePageSize(val) {
      this.pageNmb = val;
      if(this.activeIndex=='1') {
        this.getUserCustomers();
      }else {
        this.getServiceCustomers();
      }
    },
    onChangePageIndex (val) {
      this.pageIndex = val;
      if(this.activeIndex=='1') {
        this.getUserCustomers();
      }else {
        this.getServiceCustomers();
      }
    }

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
    .tips-border{
      margin:0 5px;
    }
    .tips-text{
      color:#20a0ff;
      padding-left:10px;
      cursor: pointer;
    }
    .box-tab{
      position:relative;
      margin-top:40px;
    }
    .page-title{
      position:absolute;
      right:20px;
      top:-15px;
      z-index:10;
    }
    .icon-box {
      font-size: 20px;
      padding: 0 5px;
      cursor: pointer;
    }
  }
 
</style>
