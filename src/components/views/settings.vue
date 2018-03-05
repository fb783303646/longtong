<template>
  <div class="page-settings">
    
     
      <el-form ref="form" :model="form" label-width="160px">
        <h3>总提成标准:</h3>
        <el-form-item label="提成标准(按净利润)：" prop="netprofit" :rules="[
          { required: true, message: '提成不能为空'},
          { type: 'number', message: '提成必须为数字值'}
        ]" >
          <el-input type="netprofit" v-model.number="form.netprofit" placeholder="请输入按净利润" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.isNetprofit"></el-switch>
        </el-form-item>
        <h3 class="border-top-line">附加费用</h3>
        <el-form-item label="基础服务费：" prop="service" :rules="[
          { type: 'number', message: '服务费必须为数字值'}
        ]" >
          <el-input v-model.number="form.service" placeholder="请输入基础服务费(默认按交易额的10%)" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.isService"></el-switch>
        </el-form-item>
        <el-form-item label="开票费(每单)：" prop="invoice" :rules="[
          { type: 'number', message: '开票费必须为数字值'}
        ]">
          <el-input v-model.number="form.invoice" placeholder="请输入开票费" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.isInvoice"></el-switch>
        </el-form-item>
        <el-form-item label="资金占用费："  prop="fund" :rules="[
          { type: 'number', message: '资金占用费必须为数字值'}
        ]">
          <el-input v-model.number="form.fund" placeholder="请输入资金占用费" ></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="form.isFund"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        netprofit: '',
        service:'',
        invoice:'',
        fund:'',
        isNetprofit: false,
        isService:false,
        isInvoice:false,
        isFund:false,
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs);
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(valid);
          console.log(this.form);
        } else {
          console.log('error submit!!');
          return false;
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
