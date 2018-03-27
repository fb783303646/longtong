<template>
  <div class="page-orderdetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button style="float: right; " size="small" type="primary" @click="backBtn" >返回</el-button>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="detail-li">
            <span class="title-hd">订单号</span>
            <span>2562511251251521</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">商品名称</span>
            <span>dddd</span>
          </div>
         
          <div class="detail-li">
            <span class="title-hd">商品价格(元)</span>
            <span>￥26521251.00</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">运输费用</span>
            <span>￥2002.00</span>
          </div>
          
         
          <div class="detail-li">
            <span class="title-hd">订单状态</span>
            <span>待确认</span>
          </div>
          
          <div class="detail-li">
            <span class="title-hd">合同确认状态</span>
            <span>dddd</span>
          </div>
         
          <div class="detail-li">
            <span class="title-hd">出库状态</span>
            <span>dddd</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">收货状态</span>
            <span>dddd</span>
          </div>
         
          <div class="detail-li">
            <span class="title-hd">完成状态</span>
            <span>dddd</span>
          </div>
          
        </el-col>
        <el-col :span="12">
          <div class="detail-li">
            <span class="title-hd">下单时间</span>
            <span>2562511251251521</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">采购数量(吨)</span>
            <span>1000</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">订单金额</span>
            <span>￥262321.00</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">派车状态</span>
            <span>2562511251251521</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">交易模式</span>
            <span>自有仓库订单</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">包装方式</span>
            <span>罐装</span>
          </div>
           <div class="detail-li">
            <span class="title-hd">支付状态</span>
            <span>未支付</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">是否已开发票</span>
            <span>已开发票</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">是否订单样品</span>
            <span>是</span>
          </div>
        </el-col>
      </el-row>
      <div style="border-top:1px dashed #ebeef5;margin:18px 0;"></div>
      <el-row >
        <el-col :span="12">
          <div class="detail-li">
            <span class="title-hd">业务员</span>
            <span>张模某</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">收货人</span>
            <span>张默默</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">收货人电话</span>
            <span>1568565265</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="detail-li">
            <span class="title-hd">客户名称</span>
            <span>用油网有限公司</span>
          </div>
          <div class="detail-li">
            <span class="title-hd">送货地址</span>
            <span>广东深圳市宝安区南山村8巷十号</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'detail'
    }
  },
  methods:{
    backBtn () {
      this.$router.push({ path: '/orderlist' });
    },
  }
}
</script>

<style  lang="scss" >
  .page-orderdetail{
    .detail-li{
      padding:10px 0;
      color:#606266;
      font-size:14px;
      span{
        display:inline-block;
      }
      .title-hd{
        width:200px;
        color:#666;
        font-weight:bold;
      }
    }
  }
  
</style>
