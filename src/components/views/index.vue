<template>
  <div class="admin-main">
    <el-row :gutter="20" class="header-info">
      <el-col :span="6">
        <div class="border-purple bg-color1">
          <el-row >
            <el-col :span="8" class="big-icon icon-color1"><i class="el-icon-tickets"></i></el-col>
            <el-col  :span="16">
              <p>今日订单总数</p>
              <p class="font20">{{orderData.todayCount}}</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="border-purple bg-color2">
          <el-row  >
            <el-col :span="8" class="big-icon icon-color2"><i class="fontFamily londa-qian1"></i></el-col>
            <el-col  :span="16">
              <p>今日销售总额</p>
              <p class="font20">¥{{orderData.todaySaleAoumt}}</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="border-purple bg-color3">
          <el-row  >
            <el-col :span="8" class="big-icon icon-color3"><i class="fontFamily londa-qushi"></i></el-col>
            <el-col  :span="16">
              <p>今日销售总额</p>
              <p class="font20">¥{{orderData.last7DaySaleAoumt}}</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="border-purple bg-color4">
          <el-row >
            <el-col :span="8" class="big-icon icon-color4"><i class="fontFamily londa-qian"></i></el-col>
            <el-col  :span="16">
              <p>今日销售总额</p>
              <p class="font20">¥{{orderData.total}}</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待处理事务</span>
      </div>
      <el-row >
        <el-col  :span="6">
          <p>今日销售总额(2000)</p>
        </el-col>
        <el-col  :span="6">
         <p>今日销售总额(2000)</p>
        </el-col>
        <el-col  :span="6">
          <p>今日销售总额(2000)</p>
        </el-col>
        <el-col  :span="6">
          <p>今日销售总额(2000)</p>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="20" >
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品总览</span>
          </div>
          <el-row >
            <el-col  :span="6">
              <p class="redbig">{{productData.pullCount}}</p>
              <p>已下架</p>
            </el-col>
            <el-col  :span="6">
              <p class="redbig">{{productData.salingCount}}</p>
              <p>已上架</p>
            </el-col>
            <el-col  :span="6">
              <p class="redbig">{{productData.stockCount}}</p>
              <p>货源不足</p>
            </el-col>
            <el-col  :span="6">
              <p class="redbig">{{productData.total}}</p>
              <p>全部商品</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
       <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户总览</span>
          </div>
          <el-row >
            <el-col  :span="6">
              <p class="redbig">{{memberData.todayCount}}</p>
              <p>今日新增</p>
            </el-col>
            <el-col  :span="6">
              <p class="redbig">{{memberData.yesterdayCount}}</p>
              <p>昨日新增</p>
            </el-col>
            <el-col  :span="6">
              <p class="redbig">{{memberData.monthCount}}</p>
              <p>本月新增</p>
            </el-col>
            <el-col  :span="6">
              <p class="redbig">{{memberData.total}}</p>
              <p>会员总数</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>运营快捷入口</span>
      </div>
      <el-row class="operate-init">
        <el-col  :span="3">
            <div class="operate-info" >
               <router-link to="/addProducts">
                <i class="el-icon-circle-plus-outline"></i>
                <p>添加商品</p>
               </router-link>
            </div>
        </el-col>
        <el-col  :span="3">
         <div class="operate-info" >
            <router-link to="/orderlist">
              <i class="el-icon-tickets"></i>
              <p>订单列表</p>
            </router-link>
          </div>
        </el-col>
        <el-col  :span="3">
          <div class="operate-info"  >
            <router-link to="/userManagement">
              <i class="el-icon-plus"></i>
              <p>添加用户</p>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import http from '../../api/http'
import api from '../../api/api'

export default {
  data () {
    return {
      orderData:{
        todayCount:0,
        todaySaleAoumt:0,
        last7DaySaleAoumt:0,
        total:0
      },
      memberData:{
        todayCount:0,
        yesterdayCount:0,
        monthCount:0,
        total:0
      },
      productData:{
        pullCount:0,
        salingCount:0,
        stockCount:0,
        total:0
      }
    }
  },
  created () {
    this.getOrderData();
    this.getMemberData();
    this.getProductData();
  },
  methods:{
    getOrderData () {
      http.get(api.get_order_statistics).then((res) => {
        if(res.code=='0') { 
          this.orderData = res.data;
        }else {
          this.$message.error(res.message);
        }
      })
    },
    getMemberData () {
      http.get(api.get_member_statistics).then((res) => {
         if(res.code=='0') { 
          this.memberData = res.data;
        }else {
          this.$message.error(res.message);
        }
      })
    },
    getProductData () {
      http.get(api.get_product_statistics).then((res) => {
         if(res.code=='0') { 
          this.productData = res.data;
        }else {
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../../assets/icon/iconfont.css';
  .header-info{
    .border-purple{
      border:1px solid #e6e6e6;
      text-align: center;
      color:#fff;
      .big-icon{
        font-size:60px;
        line-height:98px;
      }
    }
    .bg-color1{
      background:#30a0ff;
    }
    .bg-color2{
      background:#ffc040;
    }
    .bg-color3{
      background:#67c23a;
    }
    .bg-color4{
      background:#f56c6c;
    }
    .icon-color1{
      background:rgb(17, 118, 225);
    }
    .icon-color2{
      background:#E6A23C;
    }
    .icon-color3{
      background:#00B945;
    }
    .icon-color4{
      background:#Fa3e54;
    }
  }

  .box-card{
    margin-top:20px;
    p{
      text-align:center;
    }
    .redbig{
      color:#Fa3e54;
      font-size:26px;
    }
  }
  .operate-init{
    .operate-info{
      text-align:center;
      cursor: pointer;
      a{
        color:#333;
        text-decoration: none;
      }
      i{
        font-size:60px;
      }
    }
  }
  .font20{
    font-size:20px;
    margin-bottom:0;
    margin-top:0px;
  }

</style>
