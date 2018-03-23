<template>
  <div class="page-distribution">
    <el-row class="page-bline">
      <el-form ref="form" :model="form" label-width="160px" :rules="validator">
        <el-col :span="24" class="page-bline" >
          <div class="page-from">
            <h3>商品信息:</h3>
            <el-col :span="8">
              <el-form-item label="商品选择：" prop="commissionRate"  >
                <el-select v-model="form.commissionRate" placeholder="请选择商品">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="包装方式：">
                <el-select v-model="form.serviceRate"   placeholder="请选择规格">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="上游成交价：" prop="serviceRate" >
                <el-input v-model.number="form.serviceRate" class="small-input"  placeholder="请输入上游成交价" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户选择：" prop="commissionRate"  >
                <el-select v-model="form.commissionRate" placeholder="请选择用户">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="运输方式：">
                <el-select v-model="form.isInvoice" placeholder="请选择运输方式">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下游成交价：" prop="serviceRate" >
                <el-input v-model.number="form.serviceRate"  class="small-input" placeholder="请输入下游成交价" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数量：" prop="serviceRate" >
                <el-input v-model.number="form.serviceRate"  class="small-input" placeholder="请输入数量" ></el-input>
              </el-form-item>
            </el-col>

          </div>
        </el-col>
        <el-col :span="12" class="page-rline">
          <div class="page-from">
              <h3>供货商信息:</h3>
              <el-form-item label="联系人：" prop="serviceRate" >
                <el-input v-model.number="form.serviceRate" placeholder="请输入联系人" ></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="invoiceFee" >
                <el-input v-model.number="form.invoiceFee" placeholder="请输入电话号码" ></el-input>
              </el-form-item>
              <el-form-item label="备注："  prop="capitalFee" >
                <el-input type="textarea" style="height:126px" v-model="form.serviceRate" placeholder="请输入备注信息，例如您的额外需求。"  ></el-input>
              </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="page-from">
            
              <h3>买方客户信息:</h3>
              <el-form-item label="收货人：" prop="commissionRate"  >
                <el-input  v-model.number="form.commissionRate" placeholder="请输入委托代理人" ></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="serviceRate" >
                <el-input v-model.number="form.serviceRate" placeholder="请输入联系人电话" ></el-input>
              </el-form-item>
              <el-form-item label="送货日期：" prop="capitalFee" >
                <el-date-picker v-model="form.capitalFee" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="备注："  prop="capitalFee" >
                <el-input type="textarea" v-model="form.serviceRate" placeholder="请输入备注信息，例如您的额外需求。"  ></el-input>
              </el-form-item>
          
          </div>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="16" class="info-dis" >
        <el-col :span="6">
          <p>商品信息</p>
          <p>某欧某某220油</p>
          <p>数量：10吨</p>
        </el-col>
        <el-col :span="6">
          <p>上游费用</p>
          <p>单价：1000/吨</p>
          <p>总价：￥5000.00</p>
        </el-col>
        <el-col :span="6">
          <p>下游费用</p>
          <p>单价：2000/吨</p>
          <p>总价：￥10000.00</p>
        </el-col>
        <el-col :span="6">
          <p>佣金</p>
          <p class="bigred">获取佣金：￥5000.00</p>
        </el-col>
      </el-col>
      <el-col :span="8" >
         <el-button class="submit-btn"  type="primary">提交订单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          commissionRate: '',
          serviceRate:'',
          invoiceFee:'',
          capitalFee:'',
          serviceRateOffed:'',
          invoiceFeeOffed:false,
          capitalFeeOffed:false,
        },
        validator: {
          commissionRate: [{ required: true, message: '提成不能为空'},{ type: 'number', message: '提成必须为数字值'}],
          serviceRate: [{ type: 'number', message: '服务费必须为数字值'}],
          invoiceFee: [{ type: 'number', message: '开票费必须为数字值'}]
        },
      }
    }
  }
</script>
<style scoped lang="scss">
  .page-from{
    min-width:380px;
    margin:0 100px;
  }
  .page-rline{
    min-width:570px;
    border-right:1px dashed #dcdfe6;
  }
  .page-bline{
    border-bottom:1px dashed #dcdfe6;
  }
  .info-dis{
    color: #606266;
  }
  .submit-btn{
    width:200px;
    margin-top:80px;
    margin-left:80px;
  }
  .bigred{
    color:#Fa3e54;
    font-size:18px;
  }
  .small-input{
    width:217px;
  }
</style>
