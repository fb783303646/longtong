<template>
  <div class="page-settings">
      <el-form ref="form" :model="form" label-width="160px" :rules="validator">
        <h3>总提成标准:</h3>
        <el-form-item label="提成标准(按净利润)：" prop="commissionRate"  >
          <el-input  v-model.number="form.commissionRate" placeholder="请输入按净利润" ></el-input>
        </el-form-item>
        <h3 class="border-top-line">附加费用</h3>
        <el-form-item label="基础服务费：" prop="serviceRate" >
          <el-input v-model.number="form.serviceRate" placeholder="请输入基础服务费(默认按交易额的10%)" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.serviceRateOffed"></el-switch>
        </el-form-item>
        <el-form-item label="开票费(每单)：" prop="invoiceFee" >
          <el-input v-model.number="form.invoiceFee" placeholder="请输入开票费" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.isInvoice"></el-switch>
        </el-form-item>
        <el-form-item label="资金占用费："  prop="capitalFee" >
          <el-input v-model.number="form.capitalFee" placeholder="请输入资金占用费" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.capitalFeeOffed"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import http from '../../api/http'
import api from '../../api/api'
export default {
  data () {
    return {
      form: {
        commissionRate: '',
        serviceRate:'',
        invoiceFee:'',
        capitalFee:'',
        serviceRateOffed:false,
        invoiceFeeOffed:false,
        capitalFeeOffed:false,
      },
      validator: {
        commissionRate: [{ required: true, message: '提成不能为空'},{ type: 'number', message: '提成必须为数字值'}],
        serviceRate: [{ type: 'number', message: '服务费必须为数字值'}],
        invoiceFee: [{ type: 'number', message: '开票费必须为数字值'}],
        capitalFee: [{ type: 'number', message: '资金占用费必须为数字值'}],
      },
    }
  },
  created (){
    this.getRuleFrom();
  },
  methods: {
    getRuleFrom () {
      http.get(api.get_disribution_rule).then((res)=>{
        const data = res.data.records;
         if(data){
            this.form = {
            commissionRate: data.commissionRate,
            serviceRate:data.serviceRate,
            invoiceFee:data.invoiceFee,
            capitalFee:data.capitalFee,
            serviceRateOffed:data.serviceRateOffed,
            invoiceFeeOffed:data.invoiceFeeOffed,
            capitalFeeOffed:data.capitalFeeOffed,
          };
         }
      });
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const parmas = this.form;
          http.post(api.create_disribution_rule,parmas).then((res)=>{
            if(res.code == 0){
              this.getRuleFrom();
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            }else {
              this.$message.error('修改失败！');
            }
          });
        }
      });
    }
  }
}
</script>
<style scoped lang="scss">
  .page-settings{
    width:600px;
    margin:0 auto;
    .border-top-line{
      margin-top:0;
      padding-top:20px;
      border-top:1px dashed #dcdfe6;
    }
  }
</style>
