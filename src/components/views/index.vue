<template>
  <div class="admin-main">
    <el-row :gutter="20" class="header-info">
      <el-col :span="6">
        <div class="border-purple bg-color1">
          <el-row >
            <el-col :span="8" class="big-icon icon-color1"><i class="el-icon-tickets"></i></el-col>
            <el-col  :span="16">
              <p>今日订单总数</p>
              <p>2000</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="border-purple bg-color2">
          <el-row  >
            <el-col :span="8" class="big-icon icon-color2"><i class="el-icon-sold-out"></i></el-col>
            <el-col  :span="16">
              <p>今日销售总额</p>
              <p>2000</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="border-purple bg-color3">
          <el-row  >
            <el-col :span="8" class="big-icon icon-color3"><i class="el-icon-phone"></i></el-col>
            <el-col  :span="16">
              <p>今日销售总额</p>
              <p>2000</p>  
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="border-purple bg-color4">
          <el-row >
            <el-col :span="8" class="big-icon icon-color4"><i class="fontFamily londa-xinxinicon"></i></el-col>
            <el-col  :span="16">
              <p>今日销售总额</p>
              <p>2000</p>  
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
              <p>2000</p>
              <p>已下架</p>
            </el-col>
            <el-col  :span="6">
               <p>2000</p>
              <p>已上架</p>
            </el-col>
            <el-col  :span="6">
               <p>2000</p>
              <p>货源不足</p>
            </el-col>
            <el-col  :span="6">
               <p>2000</p>
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
               <p>2000</p>
              <p>今日销售总额(2000)</p>
            </el-col>
            <el-col  :span="6">
               <p>2000</p>
              <p>今日销售总额(2000)</p>
            </el-col>
            <el-col  :span="6">
               <p>2000</p>
              <p>今日销售总额(2000)</p>
            </el-col>
            <el-col  :span="6">
               <p>2000</p>
              <p>今日销售总额(2000)</p>
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
          <div class="operate-info">
            <i class="el-icon-circle-plus-outline"></i>
            <p>添加商品</p>
          </div>
        </el-col>
        <el-col  :span="3">
         <div class="operate-info">
            <i class="el-icon-tickets"></i>
            <p>订单列表</p>
          </div>
        </el-col>
        <el-col  :span="3">
          <div class="operate-info">
            <i class="el-icon-plus"></i>
            <p>添加用户</p>
          </div>
        </el-col>
       
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { requestLogin } from '../../api/api';
export default {
  name: 'list',
  data () {
    return {
      msg: 'index',
      data:'数据'
    }
  },
  methods:{
    add(){
      let loginParams = ''
      requestLogin(loginParams).then(data => {
        console.log(data);
        this.data = data;
      });
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
        line-height:90px;
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
  }
  .operate-init{
    .operate-info{
      text-align:center;
      cursor: pointer;
      i{
        font-size:60px;
      }
    }
  }

</style>
