<template>
  <section class="login-container">
    <div class="login-box">
      <h2>分销系统管理后台</h2>
      <el-form ref="form"  :model="formLabelLogin"  :rules="rulesValidator" >
        <el-form-item prop="account">
          <el-input v-model="formLabelLogin.account"  placeholder="账号" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formLabelLogin.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;" >
          <el-button type="primary" style="width:100%;"  @click.native.prevent="onSendLogin" :loading="logining" >立即登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import http from '../api/http'
import apiurl from '../api/apiurl'
export default {

  data () {
    return {
      logining:false,
      formLabelLogin: {
        account:'',
        password:''
      },
      rulesValidator: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: false
    }
  },
  methods:{
    onSendLogin (ev) {
      this.$refs.form.validate((valid) => {
        if(valid){
           this.logining = true;
           let params = { username: this.formLabelLogin.account, password: this.formLabelLogin.password};
           sessionStorage.setItem('user', JSON.stringify(params));
           this.$router.push({ path: '/index' });
          //  http.get('/user', params).then((res)=>{
          //    if(res.data.success) {
          //       this.logining = false;
          //       this.$router.push({ path: '/index' });
          //    }else{
          //     this.$message.error(res.data.msg);
          //    }
          //  })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>
<style scoped lang="scss" >
  .login-container{
    width:100%;
    height:100%;
    overflow:hidden;
    background:url('~@/assets/big.jpg') no-repeat center center;
    background-size:100% 100%;
  }
  .login-box{
    width:400px;
    margin: 200px auto 0 auto;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    padding:20px 40px 40px 40px;
    border-radius:5px;
    .remember{
      padding-bottom:10px;
    }
  }
</style>
