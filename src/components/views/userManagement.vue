<template>
  <div class="page-products">

    <el-tabs v-model="activeName2" class="addClass" type="card" @tab-click="handleClick">
     
      <el-tab-pane label="分销用户(1000)" name="first">

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
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户账号：">
              <el-input v-model="formInline.user" size="mini" placeholder="手机号"></el-input>
            </el-form-item>

            <el-form-item label="注册时间：" >
              <el-date-picker
                v-model="formInline.value6"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" size="mini" style="width:260px;" >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型:">
              <el-select v-model="formInline.region" size="mini" placeholder="用户类型" style="width:100px;" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="fddd" >查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right;">
          <el-button size="small" type="primary" @click="createOrder" >添加用户</el-button>
        </el-col>
      </el-row>

      <el-table ref="multipleTable" border :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="用户ID" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="联系人" width="120">
        </el-table-column>
        <el-table-column prop="inventory" label="手机号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.inventory }}吨</template>
        </el-table-column>
        <el-table-column prop="sales" label="公司名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="当前佣金" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isApproved">已审核</span>
            <span v-if="!scope.row.isApproved">未审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="账户启用状态" show-overflow-tooltip >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isApproved" active-color="#13ce66" inactive-color="#909399"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <a class="icon-box" title="编辑">
              <i class="el-icon-edit"></i>
            </a>
            <a class="icon-box" title="审核详情" v-if="!scope.row.isApproved">
              <i class="el-icon-view"></i>
            </a>
            <a class="icon-box" title="审核" v-if="scope.row.isApproved">
              <i class="el-icon-edit-outline"></i>
            </a>
            <a class="icon-box" title="删除">
              <i class="el-icon-delete"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
      
      </el-tab-pane>
      <el-tab-pane label="货源供应商(1000)" name="second">

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
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户账号：">
              <el-input v-model="formInline.user" size="mini" placeholder="手机号"></el-input>
            </el-form-item>

            <el-form-item label="注册时间：" >
              <el-date-picker
                v-model="formInline.value6"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" size="mini" style="width:260px;" >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型:">
              <el-select v-model="formInline.region" size="mini" placeholder="用户类型" style="width:100px;" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="fddd" >查询</el-button>
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
        <el-table-column label="用户ID" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="联系人" width="120">
        </el-table-column>
        <el-table-column prop="inventory" label="手机号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.inventory }}吨</template>
        </el-table-column>
        <el-table-column prop="sales" label="公司名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="供货商品" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isApproved">已审核</span>
            <span v-if="!scope.row.isApproved">未审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="所属行业" show-overflow-tooltip >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isApproved" active-color="#13ce66" inactive-color="#909399"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="供货地区" show-overflow-tooltip>
          <template slot-scope="scope">
            <a class="icon-box" title="编辑">
              <i class="el-icon-edit"></i>
            </a>
            <a class="icon-box" title="审核详情" v-if="!scope.row.isApproved">
              <i class="el-icon-view"></i>
            </a>
            <a class="icon-box" title="审核" v-if="scope.row.isApproved">
              <i class="el-icon-edit-outline"></i>
            </a>
            <a class="icon-box" title="删除">
              <i class="el-icon-delete"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
      
      </el-tab-pane>  
    </el-tabs>

    <div class="box-tab">
      <el-row class="page-box">
        <el-col :span="24" class="page-nation">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total>
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- Form -->
    <el-dialog title="新增分销用户" :visible.sync="dialogTableVisible" width="500px" >
      <el-form :model="userform">
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="userform.name" auto-complete="off" class="widthLabel" placeholder="请输入手机号"  ></el-input>
        </el-form-item>
         <el-form-item label="联系人：" :label-width="formLabelWidth">
          <el-input v-model="userform.name" auto-complete="off" class="widthLabel" placeholder="请输入联系人" ></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="formLabelWidth">
          <el-input v-model="userform.name" auto-complete="off" class="widthLabel" placeholder="请输入身份证号" ></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" :label-width="formLabelWidth">
          <el-input v-model="userform.name" auto-complete="off" class="widthLabel" placeholder="请输入公司名称" ></el-input>
        </el-form-item>
        <el-form-item label="提成方式：" :label-width="formLabelWidth" >
          <el-radio-group v-model="userform.resource" @change="changeRadioValue" >
            <el-radio label="1"  >平台提成</el-radio>
            <el-radio label="2"  >个人提成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提成比例：" :label-width="formLabelWidth" v-show="isShow" >
           <el-input v-model="userform.name" auto-complete="off" class="widthLabel" placeholder="请输入提成比例" ></el-input>
        </el-form-item>
        <el-form-item label="账户启用：" :label-width="formLabelWidth" >
           <el-switch v-model="userform.isOpen" active-color="#13ce66" inactive-color="#909399"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fddd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增货源供应商" :visible.sync="dialogVendorVisible" width="700px" >
      <el-form ref="vendorUserform" :model="vendorUserform" :rules="vendorValidator" >
        <el-row>
          <el-col :span="12">
             <el-form-item label="手机号："  prop="phoneNumber" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.phoneNumber" auto-complete="off" class="widthInput" placeholder="请输入手机号"  ></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.contact" auto-complete="off" class="widthInput" placeholder="请输入联系人" ></el-input>
            </el-form-item>
            <el-form-item label="身份证号："  prop="ID" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.ID" auto-complete="off" class="widthInput" placeholder="请输入身份证号" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称：" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.companyName" auto-complete="off" class="widthInput" placeholder="请输入公司名称" ></el-input>
            </el-form-item>
            <el-form-item label="所属行业：" :label-width="formLabelWidth">
              <el-select v-model="vendorUserform.industry" placeholder="请选择"  class="widthInput" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供货商品：" :label-width="formLabelWidth">
              <el-input v-model="vendorUserform.supplyGoods" auto-complete="off" class="widthInput" placeholder="请输入商品关键词"  ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="月供应量：" :label-width="formLabelWidth">
          <el-input v-model="vendorUserform.monthly" auto-complete="off" class="widthInput" placeholder="请输入供应数量（吨）"  ></el-input>
        </el-form-item>
        <el-form-item label="供货地区：" :label-width="formLabelWidth" >
          <el-checkbox-group v-model="vendorUserform.areaType">
            <el-checkbox label="华北1" name="type" value="1" ></el-checkbox>
            <el-checkbox label="西北2" name="type" value="2" ></el-checkbox>
            <el-checkbox label="华东3" name="type" value="3" ></el-checkbox>
            <el-checkbox label="华南4" name="type" value="4" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVendorVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveVendorUserFrom"  >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 111,
        inventory: 20,
        areas: ['华东', '华南'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 33,
        inventory: 202,
        areas: ['华东', '华南'],
        sales: 1400,
        isApproved: true
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 450,
        inventory: 2,
        areas: ['华东'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 655,
        inventory: 20,
        areas: [],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 789,
        inventory: 204,
        areas: ['华东', '华南'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 345,
        inventory: 220,
        areas: ['华东', '华南'],
        sales: 1000,
        isApproved: false
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        pice: 1111,
        inventory: 20,
        areas: ['华东', '华南'],
        sales: 1300,
        isApproved: false
      }],
      multipleSelection: [],
      formInline: {
        user: '',
        value6:'',
        region: ''
      },
      userform:{
        name:'',
        region:'',
        type:[],
        resource:'1',
        isOpen:false
      },
      vendorUserform:{
        phoneNumber:'',
        contact:'',
        companyName:'',
        ID:'',
        industry:'',
        supplyGoods:'',
        monthly:'',
        areaType:[]
      },
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
      total: 40,
      dialogTableVisible: false,
      dialogVendorVisible:false,
      checked: false,
      loading: false,
      activeName2: 'first',
      isShow:false
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
      this.$message('click on item ');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    createOrder () {
      this.dialogTableVisible = true;
    },
    createVendor () {
      this.dialogVendorVisible = true;
    },
    saveVendorUserFrom () {
      this.dialogVendorVisible = false;
      console.log(this.vendorUserform) 
      // this.$refs.vendorUserform.resetFields(); 

      // this.$refs.vendorUserform.validate((valid) => {
      //    _this.$refs.vendorUserform.resetFields();
      // });
     
    },
    changeRadioValue(val){
      console.log(val);
      console.log('dd');
      if(this.userform.resource==2){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
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
