<template>
  <div class="page-products">
    <el-row class="tab-header">
      <el-col :span="18">
        <el-form :inline="true" :model="searchDisForm" class="demo-form-inline">
          <el-form-item label="手机号码：">
            <el-input v-model="searchDisForm.userNb" size="mini" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="注册时间：" >
            <el-date-picker
              v-model="searchDisForm.reginDate"
              type="daterange"
              value-format="timestamp"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" size="mini" style="width:260px;" >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="disSearch(true)" >查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" style="text-align:right;">
        <el-button size="small" type="primary" @click="createOrder" >添加用户</el-button>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" border :data="disData"  tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="mobilePhone" label="手机号码"></el-table-column>
        <el-table-column prop="contact" label="联系人" ></el-table-column>
        <el-table-column prop="company" label="所属公司" show-overflow-tooltip></el-table-column>
        <el-table-column  label="用户身份">
          <template slot-scope="scope">
              <span class="tips-border" v-for="item in scope.row.roleNames">
                <el-tag size="small" :type="item === '分销' ? 'primary' : 'danger'" >{{ item }}</el-tag>
              </span>
            </template>
        </el-table-column>
        <el-table-column prop="startTime" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column  label="账户启用状态"  width="140" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" active-color="#13ce66" inactive-color="#909399" @change="onChangeStutas(scope.row)" ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="160"  show-overflow-tooltip>
          <template slot-scope="scope">
            <a class="icon-box" title="编辑"  @click="editSingleInfo(scope.row)"><i class="el-icon-edit"></i></a>
            <a class="icon-box" title="查看" @click="seeView(scope.row)" ><i class="el-icon-view"></i></a>
            <a class="icon-box" title="删除" @click="removeSingle(scope.row,true)" ><i class="el-icon-delete"></i></a>
          </template>
        </el-table-column>
      </el-table>

      <el-row class="page-box"  >
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </el-col>
      </el-row>

  

    <!-- Form orderValidator -->
    <el-dialog :title="distributionTitle" :visible.sync="dialogTableVisible" width="500px" >
      <el-form ref="userform" :model="userform" :rules="orderValidator"  >
        <el-form-item label="手机号："  prop="mobilePhone" :label-width="formLabelWidth">
          <el-input v-model="userform.mobilePhone" auto-complete="off" class="widthLabel" placeholder="请输入手机号"  ></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact" :label-width="formLabelWidth">
          <el-input v-model="userform.contact" auto-complete="off" class="widthLabel" placeholder="请输入联系人" ></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" prop="company"  :label-width="formLabelWidth">
          <el-input v-model="userform.company" auto-complete="off" class="widthLabel" placeholder="请输入公司名称" ></el-input>
        </el-form-item>
        <el-form-item label="用户身份：" :label-width="formLabelWidth" >
          <el-checkbox-group v-model="userform.memberRoleIdsStr">
            <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.memberRoleId" >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="提成方式：" prop="resource"  :label-width="formLabelWidth" >
          <el-radio-group v-model="userform.resource" @change="changeRadioValue" >
            <el-radio label="1"  >平台提成</el-radio>
            <el-radio label="2"  >个人提成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提成比例：" prop="commissionRate" :label-width="formLabelWidth" v-show="isShow" >
           <el-input v-model="userform.commissionRate" auto-complete="off" class="widthLabel" placeholder="请输入个人提成比例" ></el-input>
        </el-form-item>
        <el-form-item label="账户启用：" prop="enabled"  :label-width="formLabelWidth" >
           <el-switch v-model="userform.enabled" active-color="#13ce66" inactive-color="#909399" ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" v-if="distributionTitle == '编辑用户'" @click="saveSingleInfo">保存</el-button>
        <el-button size="mini"  type="primary" v-if="distributionTitle == '新增用户'" @click="svaeOrder">确 定</el-button>
      </div>
    </el-dialog>

    

  </div>
</template>

<script>

import http from '../../api/http'
import api from '../../api/api'
import { getdate} from '../../utils/date'
import { isvalidPhone, isPassword, isCard } from '../../utils/variabel'

//定义一个全局的变量
var validPhone = (rule, value,callback) => {
    if (!value){
        callback(new Error('请输入电话号码'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
      callback()
    }
};
//定义一个全局的变量
var validPassword = (rule, value,callback) => {
    if (!value){
        callback(new Error('请输入密码'))
    }else  if (!isPassword(value)){
      callback(new Error('密码必须由6-16个英文字母和数字的字符串组成！'))
    }else {
      callback()
    }
};
//定义一个全局的变量
var validCrad = (rule, value,callback) => {
    if (!value){
        callback(new Error('请输入身份证号'))
    }else  if (!isCard(value)){
      callback(new Error('请输入合法身份证号码！'))
    }else {
      callback()
    }
}

export default {
  data() {
    return {
      distributionTitle:'新增用户',
      disData: [],
      searchDisForm:{
        userNb:'',
        reginDate:''
      },
      userform: {
        mobilePhone:'',
        contact:'',
        company:'',
        resource:'1',
        commissionRate:'',
        enabled:true,
        memberRoleIdsStr: [],
      },
      orderValidator:{
        mobilePhone: [{ required: true, trigger: 'blur', validator: validPhone }],
        contact:[{ required: true, trigger: 'blur', message: '请输入联系人'}],
        company:[{ required: true, trigger: 'blur',message: '请输入公司名称'}], 
      },
      roleList:[],
      industryList:[],
      regionList:[],
      formLabelWidth: '100px',
      currentPage: 1,
      pageSize:10,
      total: 0,
      dialogTableVisible: false,
      checked: false,
      loading: false,
      isShow:false,
      globlID:'',
    }
  },
  created () {
    this.getRoleList();
     this.getDataList();
    // this.getIndustryData();
    // this.getReginData();
  },
  methods: {
    /***
     * 获取角色列表
     */
    getRoleList () {
        http.get(api.get_role_list).then( (res) => {
        if(res.code == 0){
            this.roleList = res.data.records;
          }else{
            this.$message.error(res.message);
          }
        });
    },
    /**
     * 获取地区列表
     */
    getReginData () {
      http.get(api.regionUrl).then((res)=>{
      if(res.code == 0){
          this.regionList = res.data.records
        }else{
          this.$message.error(res.message);
        }
      });
    },
    /**
     * 获取所属行业列表
     */
    getIndustryData () {
      http.get(api.get_industry).then((res)=>{
        console.log(res);
      if(res.code == 0){
          this.industryList = res.data.records;
        }else{
          this.$message.error(res.message);
        }
      });
    },
    /**
     * 获取用户列表
     */
    getDataList (res) {
      this.loading = true;
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }
      let data = res || {};
      let options = Object.assign(data,params);
      http.get(api.get_member_list, options).then((res) => {
        if(res.code == '0'){
           const data = res.data.records;
          this.disData = this.filtersDate(res.data.records);
          this.total = res.data.paging.total;
           this.loading = false;
        }else{
          this.$message.error(res.message);
        }
      });
    },
    /**
     * 过滤时间格式
     */
    filtersDate (data) {
      data.forEach(el=>{
        el.startTime = getdate(el.createTime);
      });
      return data;
    },
    /**
     * 查询
     */
    disSearch(type){
      const params = {
        mobilePhone:this.searchDisForm.userNb,
        beginCrateTime:this.searchDisForm.reginDate[0],
        endCrateTime:this.searchDisForm.reginDate[1],
      }
      this.currentPage = 1;
      this.pageSize = 10;
      this.getDataList(params);
    },

    onChangeStutas (data) {
      const params = {
        id:data.id,
        enabled: data.enabled
      }
      http.post(api.change_reveres_stutas, params).then((res)=>{
        if(res.code == 0){
          this.$message({
            message: '修改状态成功！',
            type: 'success'
          });
        }else{
          this.$message.error('修改状态失败！');
        }
      });
    },
    /**
     * 切换提成方式
     */
    changeRadioValue(val){
      if(this.userform.resource==2){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    },
    /**
     * 创建用户
     */
    createOrder () {
      this.distributionTitle = "新增用户";
      if(this.$refs.userform!=undefined){
        this.$refs.userform.resetFields();
      };
      this.userform =  {
        mobilePhone:'',
        contact:'',
        company:'',
        resource:'1',
        commissionRate:'',
        enabled:false,
        memberRoleIdsStr: [],
      };
      this.isShow = false;
      this.dialogTableVisible = true;
    },
    /**
     * 保存提交用户
     */
    svaeOrder () {
      const params = {
        mobilePhone:this.userform.mobilePhone,
        contact:this.userform.contact,
        company:this.userform.company,
        commissionRate:this.userform.commissionRate,
        memberRoleIdsStr:this.userform.memberRoleIdsStr.join(),
        enabled:this.userform.enabled
      };
      this.$refs.userform.validate((valid) => {
        if(valid) {
          http.post(api.create_role, params).then((res) => {
            if(res.code == 0){
              this.dialogTableVisible = false;
              this.getDataList();
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
            }else if(res.code == -6) {
              this.$message.error({
                message: '手机号已经被注册！',
                type: 'warning'
              });
            }else{
              this.$message.error('添加失败！');
            }
          });
        }
      });
    },
    /**
     * 删除单个用户
     */
    deleteSingle (id) {
      let params = {id:id}
      http.post(api.remove_role, params).then((res) => {
        if(res.code == 0){
          this.getDataList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message.error('删除失败！');
        }
      });
    },
    removeSingle (data) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSingle(data.id);
        })
    },
    /**
     * 编辑用户
     */
    editSingleInfo (data,type) {
      this.distributionTitle = "编辑用户";
      this.globlID = data.id;
      this.isShow = false;
      http.get(api.get_single_role + data.id).then((res)=>{
        this.dialogTableVisible = true;
        const records = res.data.records;
        this.userform = {
          mobilePhone:records.mobilePhone,
          contact:records.contact,
          company:records.company,
          resource: records.commissionRate!=null ? '2' : '1',
          commissionRate:records.commissionRate,
          memberRoleIdsStr:records.roleIds,
          enabled:records.enabled
        };
        if(records.commissionRate !=null) {
          this.isShow = true;
        }
      });
    },
    /**
     * 保存编辑用户
     */
    saveSingleInfo () {
      const params = {
        mobilePhone:this.userform.mobilePhone,
        contact:this.userform.contact,
        company:this.userform.company,
        commissionRate:this.userform.commissionRate,
        memberRoleIdsStr:this.userform.memberRoleIdsStr.join(),
        enabled:this.userform.enabled,
        id:this.globlID
      };
      this.$refs.userform.validate((valid) => {
        if(valid) {
          http.post(api.get_single_role + this.globlID, params).then((res) => {
            if(res.code == 0){
              this.dialogTableVisible = false;
              this.getDataList();
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
    },

    chageReginIdToId(){
      let regionArry =  this.vendorUserform.regionIdsStr;
      let len =  this.vendorUserform.regionIdsStr.length;
      let newReginArry = [];

      this.regionList.forEach(element => {
        regionArry.forEach(el => {
          if(element.name == el){
            newReginArry.push(element.regionId);
          }
        })
      });
      return newReginArry;
    },
    changeReginIdToStr(data){
      let regionArry =  data;
      let len =  data.length;
      let newReginArry = [];

      this.regionList.forEach(element => {
        regionArry.forEach(el => {
          if(element.regionId == el){
            newReginArry.push(element.name);
          }
        })
      });
      return newReginArry;
    },

    seeView (res) {
      console.log(res);
      console.log(this.$router);
      this.$router.push({ path: '/userDetail', query: res});
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
     console.log(`当前页: ${val}`);
     this.currentPage = val;
     this.getDataList();
    },

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
  .widthLabel{
    width:330px;
  }
  .widthInput{
    width:200px;
  }
  .el-dialog__body{
    padding: 20px 20px 0 20px;
  }
  .tips-border{
    margin:0 5px;
  }
}
</style>
