<template>
  <div class="page-products">

    <el-tabs v-model="activeName" class="addClass" type="card" @tab-click="handleClick">
     
      <el-tab-pane :label="distributionCount" name="first">
        <el-row class="tab-header">
          <el-col :span="2" class="tetle-hd">
            <el-dropdown @command="handleCommand">
              <el-button size="mini">批量操作 <i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu size="mini" slot="dropdown">
                <el-dropdown-item command="1">上架</el-dropdown-item>
                <el-dropdown-item command="2">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="16">
            <el-form :inline="true" :model="searchDisForm" class="demo-form-inline">
              <el-form-item label="用户账号：">
                <el-input v-model="searchDisForm.userNb" size="mini" placeholder="手机号"></el-input>
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

        <el-table ref="multipleTable" border :data="disData" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="sn" label="用户ID" width="120"></el-table-column>
          <el-table-column prop="contact" label="联系人" width="120"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="company" label="公司名称" show-overflow-tooltip></el-table-column>
          <el-table-column  label="当前佣金" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>￥{{scope.row.commission}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数量" show-overflow-tooltip></el-table-column>
          <el-table-column  label="账户启用状态"  width="140" >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#909399" @change="changeStutas(scope.row,'distribution')" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="160"  show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="icon-box" title="编辑"  @click="editSingleInfo(scope.row)"><i class="el-icon-edit"></i></a>
              <a class="icon-box" title="查看" ><i class="el-icon-view"></i></a>
              <a class="icon-box" title="删除" @click="removeSingle(scope.row,true)" ><i class="el-icon-delete"></i></a>
            </template>
          </el-table-column>
        </el-table>
        
        <el-row class="page-box">
          <el-col :span="24" class="page-nation">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </el-col>
        </el-row>

      </el-tab-pane>

      <el-tab-pane :label="supplyCount" name="second">
        <el-row class="tab-header">
          <el-col :span="2" class="tetle-hd">
            <el-dropdown @command="handleCommand">
              <el-button size="mini">批量操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu size="mini" slot="dropdown">
                <el-dropdown-item command="1">上架</el-dropdown-item>
                <el-dropdown-item command="2">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="16">
            <el-form :inline="true" :model="searchDisForm" class="demo-form-inline">
              <el-form-item label="用户账号：">
                <el-input v-model="searchDisForm.userNb" size="mini" placeholder="手机号"></el-input>
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
                <el-button type="primary" size="mini" @click="disSearch(false)" >查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-button size="small" type="primary" @click="createVendor" >添加用户</el-button>
          </el-col>
        </el-row>

        <el-table ref="multipleTable" border :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="用户ID" prop="sn" width="120"></el-table-column>
          <el-table-column prop="contact" label="联系人" width="120"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="company" label="公司名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="供货商品" show-overflow-tooltip></el-table-column>
          <el-table-column prop="industry" label="所属行业" show-overflow-tooltip ></el-table-column>
          <el-table-column label="供货地区" show-overflow-tooltip >
            <template slot-scope="scope" >
              <span v-for="item in scope.row.supplyrRgions" style="padding:0 5px;" >{{ item }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="commission" label="当前佣金" show-overflow-tooltip >
            <template slot-scope="scope" >
              <span>￥{{scope.row.commission}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数量" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="industry" label="账户启用状态" show-overflow-tooltip >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#909399" @change="changeStutas(scope.row,'supply')" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column  label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="icon-box" title="编辑" @click="editVendorSingle(scope.row)" ><i class="el-icon-edit"></i></a>
              <a class="icon-box" title="查看"  ><i class="el-icon-view"></i></a>
              <a class="icon-box" title="删除" @click="removeSingle(scope.row,false)" ><i class="el-icon-delete"></i></a>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="page-box">
          <el-col :span="24" class="page-nation">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>  
    </el-tabs>

  

    <!-- Form orderValidator -->
    <el-dialog :title="distributionTitle" :visible.sync="dialogTableVisible" width="500px" >
      <el-form ref="userform" :model="userform" :rules="orderValidator"  >
        <el-form-item label="手机号："  prop="mobilePhone" :label-width="formLabelWidth">
          <el-input v-model="userform.mobilePhone" auto-complete="off" class="widthLabel" placeholder="请输入手机号"  ></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact" :label-width="formLabelWidth">
          <el-input v-model="userform.contact" auto-complete="off" class="widthLabel" placeholder="请输入联系人" ></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="identityNo"  :label-width="formLabelWidth">
          <el-input v-model="userform.identityNo" auto-complete="off" class="widthLabel" placeholder="请输入身份证号" ></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" prop="company"  :label-width="formLabelWidth">
          <el-input v-model="userform.company" auto-complete="off" class="widthLabel" placeholder="请输入公司名称" ></el-input>
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
        <el-form-item label="账户启用：" prop="disabled"  :label-width="formLabelWidth" >
           <el-switch v-model="userform.disabled" active-color="#13ce66" inactive-color="#909399"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" v-if="distributionTitle == '编辑分销用户'" @click="saveSingleInfo">保存</el-button>
        <el-button size="mini"  type="primary" v-if="distributionTitle == '新增分销用户'" @click="svaeOrder">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="supplyTitle" :visible.sync="dialogVendorVisible" width="700px" >
      <el-form ref="vendorUserform" :model="vendorUserform" :rules="vendorValidator" >
        <el-row>
          <el-col :span="12">
             <el-form-item label="手机号："  prop="mobilePhone" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.mobilePhone" auto-complete="off" class="widthInput" placeholder="请输入手机号"  ></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.contact" auto-complete="off" class="widthInput" placeholder="请输入联系人" ></el-input>
            </el-form-item>
            <el-form-item label="身份证号："  prop="identityNo" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.identityNo" auto-complete="off" class="widthInput" placeholder="请输入身份证号" ></el-input>
            </el-form-item>
            <el-form-item label="月供应量：" prop="supplyNum" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.supplyNum" auto-complete="off" class="widthInput" placeholder="请输入供应数量（吨）"  ></el-input>
            </el-form-item>
            <el-form-item label="提成方式：" prop="resource"  :label-width="formLabelWidth" >
              <el-radio-group v-model="vendorUserform.resource" @change="changeRadioValue" >
                <el-radio label="1"  >平台提成</el-radio>
                <el-radio label="2"  >个人提成</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称：" prop="company" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.company" auto-complete="off" class="widthInput" placeholder="请输入公司名称" ></el-input>
            </el-form-item>
            <el-form-item label="所属行业："  prop="industryId" :label-width="formLabelWidth">
              <el-select v-model="vendorUserform.industryId" placeholder="请选择"  class="widthInput" >
                <el-option :label="item.name" :value="item.id" v-for="item in industryList" :key="this" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供货商品：" prop="supplyProduct" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.supplyProduct" auto-complete="off" class="widthInput" placeholder="请输入商品关键词"  ></el-input>
            </el-form-item>
            <el-form-item label="账户启用：" prop="disabled"  :label-width="formLabelWidth" >
              <el-switch v-model="vendorUserform.disabled" active-color="#13ce66" inactive-color="#909399"></el-switch>
            </el-form-item>

            <el-form-item label="提成比例：" prop="commissionRate" :label-width="formLabelWidth" v-show="isShow" >
              <el-input v-model="vendorUserform.commissionRate" auto-complete="off" class="widthInput" placeholder="请输入个人提成比例" ></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        
        <el-form-item label="供货地区：" :label-width="formLabelWidth" >
          <el-checkbox-group v-model="vendorUserform.regionIdsStr">
            <el-checkbox :label="item.name" name="type" :value="item.id" v-for="item in regionList" :key="item.name"  ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVendorVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveVendorUserFrom" v-if="supplyTitle == '新增货源供应商'"  >确 定</el-button>
        <el-button type="primary" @click="saveVendorUserFrom" v-if="supplyTitle == '编辑货源供应商'"  >保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import http from '../../api/http'
import apiUrl from '../../api/apiurl'
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
      distributionTitle:'新增分销用户',
      supplyTitle:'新增货源供应商',
      distributionCount:'分销用户(0)',
      supplyCount:'货源供应商(0)',
      disData: [],
      tableData: [],
      multipleSelection: [],
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
        identityNo:'',
        disabled:true
      },
      orderValidator:{
        mobilePhone: [{ required: true, trigger: 'blur', validator: validPhone }],
        contact:[{ required: true, trigger: 'blur', message: '请输入联系人'}],
        company:[{ required: true, trigger: 'blur',message: '请输入公司名称'}], 
        identityNo:[{ required: true, trigger: 'blur', validator: validCrad}],
      },
      vendorUserform:{
        mobilePhone:'',
        contact:'',
        identityNo:'',
        disabled:'',
        company:'',
        industryId:'',
        supplyProduct:'',
        supplyNum:'',
        regionIdsStr:[],
        commissionRate:'',
        resource:'1'
      },
      industryList:[],
      regionList:[],
      vendorValidator: {
        phoneNumber: [
          { required: true, message: '请输入电话', trigger: 'blur' },
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        ID: [
          {message: '请输入密码', trigger: 'blur' },
        ]
      },
      formLabelWidth: '100px',
      currentPage: 1,
      pageSize:10,
      total: 0,
      dialogTableVisible: false,
      dialogVendorVisible:false,
      checked: false,
      loading: false,
      activeName: 'first',
      isShow:false,
      globlID:'',
    }
  },
  created () {
    this.getGroupConutData();
    this.getDistributionDataList();
    this.getSupplyDataList();
    this.getIndustryData();
    this.getReginData();
  },
  methods: {

    getReginData () {
      http.get(apiUrl.regionUrl).then((res)=>{
      if(res.code == 0){
          this.regionList = res.data.records
        }else{
          this.$message.error(res.messaage);
        }
      });
    },

    getIndustryData () {
      http.get(apiUrl.get_industry).then((res)=>{
        console.log(res);
      if(res.code == 0){
          this.industryList = res.data.records;
        }else{
          this.$message.error(res.messaage);
        }
      });
    },

    getGroupConutData () {
      http.get(apiUrl.groupCountUrl).then((res)=>{
        if(res.code == 0){
          this.supplyCount = `货源供应商(${res.data.supplyCount})`;
          this.distributionCount = `分销用户(${res.data.distributionCount})`;
        }else{
          this.$message.error(res.messaage);
        }
      });
    },
    getDistributionDataList (res) {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }
      let data = res || {};
      let options = Object.assign(data,params);

      http.get(apiUrl.distributionUrl, options).then((res)=>{
        if(res.code == 0){
          this.disData = res.data.records;
          this.total = res.data.paging.total;
        }else{
          this.$message.error(res.messaage);
        }
      });
    },
    getSupplyDataList (res) {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }
      let data = res || {};
      let options = Object.assign(data,params);
      http.get(apiUrl.supplyUrl, options).then((res)=>{
        if(res.code == 0){
          this.tableData = res.data.records;
          this.total = res.data.paging.total;
        }else{
          this.$message.error(res.messaage);
        }
      });
    },
    disSearch(type){
      const params = {
        mobilePhone:this.searchDisForm.userNb,
        beginCrateTime:this.searchDisForm.reginDate[0],
        endCrateTime:this.searchDisForm.reginDate[1],
      }
      this.currentPage = 1;
      this.pageSize = 10;
      if(type){
        this.getDistributionDataList(params);
      }else{
        this.getSupplyDataList(params);
      }
    },

    changeStutas (data,type) {
      const params = {
        id:data.id,
        disabled: data.disabled
      }
      if(type=="distribution"){
        this.onChangeStutasData(apiUrl.DisReverseUrl,params);
      }else if(type == "supply") {
        this.onChangeStutasData(apiUrl.supplyReverseUrl,params);
      }
    },

    onChangeStutasData (url,params) {
       http.post(url, params).then((res)=>{
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

    changeRadioValue(val){
      if(this.userform.resource==2 || this.vendorUserform.resource==2 ){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    },
    createOrder () {
      this.distributionTitle = "新增分销用户";
      if(this.$refs.userform!=undefined){
        this.$refs.userform.resetFields();
      };
      this.userform = {
        mobilePhone:'',
        contact:'',
        company:'',
        resource:'1',
        commissionRate:'',
        identityNo:'',
        disabled:false
      };
      this.isShow = false;
      this.dialogTableVisible = true;
    },
    svaeOrder () {
      const params = {
        mobilePhone:this.userform.mobilePhone,
        contact:this.userform.contact,
        company:this.userform.company,
        commissionRate:this.userform.commissionRate,
        identityNo:this.userform.identityNo,
        disabled:this.userform.disabled
      };
      this.$refs.userform.validate((valid) => {
        if(valid) {
          http.post(apiUrl.createDisributionUrl, params).then((res) => {
            if(res.code == 0){
              this.dialogTableVisible = false;
              this.getDistributionDataList();
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
    deleteSingle (id,type) {
      console.log('dd');
      let url = '';
      let params = {id:id}
      if(type) {
        url = apiUrl.remove_disribution
      }else {
        url = apiUrl.remove_supply
      }
      http.post(url, params).then((res) => {
        if(res.code == 0){
          if(type){
             this.getDistributionDataList();
          } else {
            this.getSupplyDataList();
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message.error('删除失败！');
        }
      });
    },
    removeSingle (data, type) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSingle(data.id, type);
        })
    },
    editSingleInfo (data,type) {
      this.distributionTitle = "编辑分销用户";
      this.globlID = data.id
      http.get(apiUrl.get_single_disribution + data.id,).then((res)=>{
        this.dialogTableVisible = true;
        console.log(res);
        const records = res.data.records;
        this.userform = {
          mobilePhone:records.mobilePhone,
          contact:records.contact,
          company:records.company,
          resource: records.commissionRate!=null ? '2' : '1',
          commissionRate:records.commissionRate,
          identityNo:records.identityNo,
          disabled:records.disabled
        };
        if(records.commissionRate !=null) {
          this.isShow = true;
        }
      });
    },
    saveSingleInfo () {
      const params = {
        mobilePhone:this.userform.mobilePhone,
        contact:this.userform.contact,
        company:this.userform.company,
        commissionRate:this.userform.commissionRate,
        identityNo:this.userform.identityNo,
        disabled:this.userform.disabled,
        id:this.globlID
      };
      this.$refs.userform.validate((valid) => {
        if(valid) {
          http.post(apiUrl.get_single_disribution + this.globlID, params).then((res) => {
            if(res.code == 0){
              this.dialogTableVisible = false;
              this.getDistributionDataList();
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
    editVendorSingle (data) {
      console.log(data);
      this.dialogVendorVisible = true;
    },
    createVendor () {
      this.dialogVendorVisible = true;
    },
    saveVendorUserFrom () {

      let params = {
        mobilePhone:this.vendorUserform.mobilePhone,
        contact:this.vendorUserform.contact,
        identityNo:this.vendorUserform.identityNo,
        disabled:this.vendorUserform.disabled,
        company:this.vendorUserform.company,
        industryId:this.vendorUserform.industryId,
        supplyProduct:this.vendorUserform.supplyProduct,
        supplyNum:this.vendorUserform.supplyNum,
        regionIdsStr:this.vendorUserform.regionIdsStr.toString(),
        commissionRate:this.vendorUserform.commissionRate,
      };
      
      // this.dialogVendorVisible = false;
      console.log(this.vendorUserform) 
      console.log(params) 

      this.$refs.vendorUserform.validate((valid) => {
        if(valid) {
          http.post(apiUrl.create_supply, params).then((res) => {
            console.log(res);
            // if(res.code == 0){
            //   this.dialogTableVisible = false;
            //   this.getDistributionDataList();
            //   this.$message({
            //     message: '修改成功！',
            //     type: 'success'
            //   });
            // }else {
            //   this.$message.error('修改失败！');
            // }
          });
        }
      });
     
    },

    handleClick(tab, event) {
      console.log('jj');
      // if(this.activeName=='first'){
      //   console.log(this.activeName);
      // }else{
      //   console.log(this.activeName);
      //   this.getSupplyDataList();
      // }
      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getDistributionDataList();
    },
    handleCurrentChange(val) {
     // console.log(`当前页: ${val}`);
     this.currentPage = val;
     this.getDistributionDataList();
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
      this.$message('click on item');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  

    fddd(){
      console.log(this.userform);
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
  .widthLabel{
    width:330px;
  }
  .widthInput{
    width:200px;
  }
  .el-dialog__body{
    padding: 20px 20px 0 20px;
  }
}
</style>
