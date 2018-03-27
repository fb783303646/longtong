<template>
  <div class="page-distribution">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单服务</span>
        <el-button style="float: right; " size="small" type="primary" @click="sumbmitBack" >返回</el-button>
        <el-button style="float: right; margin-right:20px" size="small" type="primary" @click="sumbmitBtn" >提交订单</el-button>
      </div>
      <el-row :gutter="20">
          <el-form ref="servicesForm" :model="servicesForm" label-width="110px" :rules="validators">
            <el-col :span="24">
              <el-card class="box-card" style="margin-bottom:20px;">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <p>商品信息</p>
                    <p>商品名称：{{servicesForm.productName}}</p>
                    <p>数量(吨)：{{servicesForm.saleNum !=0 ? servicesForm.saleNum: '0'}}</p>
                  </el-col>
                  <el-col :span="6">
                    <p>上游费用</p>
                    <p>单价(元/吨)：{{servicesForm.upriverPrice !=0 ? servicesForm.upriverPrice : '0'}}</p>
                    <p>总价(元)：{{servicesForm.saleNum*servicesForm.upriverPrice}}</p>
                  </el-col>
                  <el-col :span="6">
                    <p>下游费用</p>
                    <p>单价(元/吨)：{{servicesForm.downriverPrice !=0 ? servicesForm.downriverPrice : '0'}}</p>                    
                    <p>总价(元)：{{servicesForm.saleNum*servicesForm.downriverPrice}}</p>
                  </el-col>
                  <el-col :span="6">
                    <p>佣金</p>
                    <p class="bigred">获得佣金：{{servicesForm.saleNum}}</p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="24">
              <el-card class="box-card" style="margin-bottom:20px;" >
                <div slot="header" class="clearfix"><span>商品信息</span></div>
                 <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="选择商品：" prop="productName" >
                      <el-input v-model="servicesForm.productName" class="small-input" @focus="selectProductDialog"    placeholder="选择商品" ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="商品选择：" prop="productName"  >
                      <el-select v-model="servicesForm.productName" placeholder="请选择商品">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item> -->
                    <el-form-item label="包装方式：">
                      <el-select v-model="servicesForm.packingMode"   placeholder="请选择规格">
                        <el-option :label="item.name" :value="item.type" v-for="item in packingModeList" :key="this"  ></el-option>
                      </el-select>
                    </el-form-item>
                   
                  </el-col>
             
                  <el-col :span="6">
                    <el-form-item label="选择用户：" prop="contact" >
                      <el-input v-model="servicesForm.contact" class="small-input" @focus="showSelectDialog"    placeholder="请选择用户" ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="用户选择：" prop="contact"  >
                      <el-select v-model="servicesForm.contact" placeholder="请选择用户">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item> -->
                      <el-form-item label="提货方式：">
                      <el-select v-model="servicesForm.deliveryMode" placeholder="请选择提货方式">
                        <el-option :label="item.name" :value="item.type" v-for="item in deliveryModeList" :key="this"  ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="上游成交价：" prop="upriverPrice" >
                      <el-input v-model.number="servicesForm.upriverPrice" class="small-input"  placeholder="请输入上游成交价" ></el-input>
                    </el-form-item>
                    <el-form-item label="下游成交价：" prop="downriverPrice" >
                      <el-input v-model.number="servicesForm.downriverPrice"  class="small-input" placeholder="请输入下游成交价" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="数量：" prop="saleNum" >
                      <el-input v-model.number="servicesForm.saleNum"  class="small-input" placeholder="请输入数量" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix"><span>供货商信息</span></div>
                <div>
                  <el-form-item label="联系人：" prop="upriverFullName" >
                    <el-input v-model.number="servicesForm.upriverFullName" placeholder="请输入联系人" ></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话：" prop="upriverMobilePhone" >
                    <el-input v-model.number="servicesForm.upriverMobilePhone" placeholder="请输入电话号码" ></el-input>
                  </el-form-item>
                  <el-form-item label="备注："  prop="remark" >
                    <el-input type="textarea"  v-model="servicesForm.remark" placeholder="请输入备注信息，例如您的额外需求。"  ></el-input>
                  </el-form-item>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix"><span>买方客户信息</span></div>
                <div >
                  <el-form-item label="收货人：" prop="downriverFullName"  >
                    <el-input  v-model.number="servicesForm.downriverFullName" placeholder="请输入委托代理人" ></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话：" prop="downriverMobilePhone" >
                    <el-input v-model.number="servicesForm.downriverMobilePhone" placeholder="请输入联系人电话" ></el-input>
                  </el-form-item>
                  <el-form-item label="送货日期：" prop="deliveryTime" >
                    <el-date-picker v-model="servicesForm.deliveryTime" value-format="timestamp" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <!-- <el-form-item label="备注："  prop="remark" >
                    <el-input type="textarea" v-model="servicesForm.remark" placeholder="请输入备注信息，例如您的额外需求。"  ></el-input>
                  </el-form-item> -->
                </div>
              </el-card>
            </el-col>
          </el-form>
      </el-row>
    </el-card>

    <!-- Form orderValidator -->
    <el-dialog title="选择用户" :visible.sync="dialogTableVisible" width="600px"  >
      <el-row>
        <el-col :span="8">
          <el-input placeholder="用户名/手机号" size="small"   v-model="searchValue"><i slot="suffix" @click="searchBtn"  class="el-input__icon el-icon-search"></i></el-input>
        </el-col>
      </el-row>
      <el-table ref="singleTable" :loading="loading" height="250" size="small" :data="userList" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
        <el-table-column  width="50">
          <template slot-scope="scope" >
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column property="contact" label="姓名"></el-table-column>
        <el-table-column property="mobilePhone"label="电话号码"></el-table-column>
      </el-table>
      <div class="page-nation">
        <el-pagination v-if="total>0"
          small
          @current-change="currentChange"
          :page-size = "pageSize"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="selectValue" >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 商品选择 -->
    <el-dialog title="商品选择" :visible.sync="dialogProductVisible" width="600px"  >
      <el-row>
        <el-col :span="8">
          <el-input placeholder="商品名称" size="small"   v-model="searchProductstr"><i slot="suffix" @click="searchProduct"  class="el-input__icon el-icon-search"></i></el-input>
        </el-col>
      </el-row>
      <el-table ref="singleTable" :loading="loading" height="250" size="small" :data="productIdList" highlight-current-row @current-change="onIndexChange" style="width: 100%">
        <el-table-column  width="50">
          <template slot-scope="scope" >
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column property="name" label="商品编号"></el-table-column>
        <el-table-column property="sn"label="商品名称"></el-table-column>
      </el-table>
      <div class="page-nation">
        <el-pagination v-if="allTotal>0"
          small
          @current-change="onPageIndex"
          :page-size = "pageSize"
          layout="prev, pager, next"
          :total="allTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogProductVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="selectProductValue" >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import http from '../../api/http'
  import api from '../../api/api'
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
  export default {
    data () {
      return {
        servicesForm: {
          productId:'',
          memberId:'',
          saleNum:'',
          upriverPrice:'',
          downriverPrice:'',
          packingMode:'',
          deliveryMode:'',
          upriverFullName:'',
          upriverMobilePhone:'',
          remark:'',
          downriverFullName:'',
          downriverMobilePhone:'',
          deliveryTime:'',
          contact:'',
          productName:''
        },
        validators: {
          productName: [{ required: true, message: '商品不能为空! 请选择商品'}],
          contact: [{ required: true, message: '用户不能为空! 请选择用户'}],
          saleNum: [{ required: true, message: '数量不能为空!'},{ type: 'number', message: '数量必须为数字值'}],
          downriverPrice: [{ required: true, message: '下游成交价不能为空!'},{ type: 'number', message: '下游成交价必须为数字值'}],
          upriverPrice: [{ required: true, message: '上游成交价不能为空!'},{ type: 'number', message: '上游成交价必须为数字值'}],
          downriverFullName: [{required: true,  message: '收货人不能为空!'}],
          upriverFullName: [{required: true,  message: '收货人不能为空!'}],
          downriverMobilePhone: [{ required: true, trigger: 'blur', validator: validPhone }],
          upriverMobilePhone: [{ required: true, trigger: 'blur', validator: validPhone }],
          deliveryTime: [{required: true, message: '送货日期不能为空!'}],
        },
        packingModeList:[
           {name:'吨桶',type:1},
           {name:'铁桶',type:2},
           {name:'液袋',type:3},
           {name:'散装',type:4}
        ],
        deliveryModeList:[
          {name:'送货',type:1},
          {name:'自提',type:2}
        ],
        dialogProductVisible:false,
        dialogTableVisible:false,
        searchProductstr:'',
        loading:false,
        productIdList:[],
        allTotal:0,
        pageSize:10,
        pageIndex:1,
        total:0,
        selectProductValueStr:'',
        searchValue:'',
        userList:[],
        selectValueStr:'',
      }
    },
    created () {
      this.getProductList();
      this.getDataList();
    },
    methods:{
      filterChange (res) {
        res.forEach(el=>{
          el.checked = false;
        });
        return res;
      },
      selectProductDialog () {
        this.dialogProductVisible =true;
        this.servicesForm.productName = '';
        this.servicesForm.productId = '';
      },
      searchProduct () {
        const params = {
          name:this.searchProductstr
        }
        if(this.searchProductstr !== '') {
          this.getProductList(params);
        };
      },
      getProductList (res) {
        let params = {
          pageNo: this.pageIndex,
          pageSize: this.pageSize
        }
        let data = res || {};
        let option = Object.assign(data,params);
        http.get(api.productUrl, option).then((res)=>{
          if(res.code == 0){
            this.allTotal = res.data.paging.total;
            this.productIdList =this.filterChange(res.data.records);
          }else{
            this.$message.error(res.message);
          }
        });
      },
      onIndexChange (e) {
        this.productIdList.forEach(element => {
          element.checked = false;
        });
        e.checked = true;
        this.selectProductValueStr = e.name;
        this.servicesForm.productId = e.id;
        this.pices = e.salePrice;
      },
      onPageIndex (val) {
        this.pageIndex = val;
        this.getProductList();
      },
      selectProductValue () {
        this.servicesForm.productName = this.selectProductValueStr;
        this.dialogProductVisible = false;
      },
      showSelectDialog () {
        this.dialogTableVisible = true;
        this.servicesForm.contact = '';
        this.servicesForm.memberId = '';
      },
      searchBtn() {
        if(this.searchValue !='') {
          let params = {
            mobileOrContact:this.searchValue
          }
          this.getDataList(params);
        }
      },
      currentChange (val) {
        this.pageIndex = val;
        this.getDataList();
      },
     /**
     * 获取用户列表
     */
      getDataList (res) {
        this.loading = true;
        let params = {
          pageNo: this.pageIndex,
          pageSize:this.pageSize,
        }
        let data = res || {};
        let options = Object.assign(data,params);
        http.get(api.get_member_list, options).then((res) => {
          if(res.code == '0'){
            this.userList = this.filterChange(res.data.records);
            this.total = res.data.paging.total;
          }else{
            this.$message.error(res.message);
          }
        });
      },
      handleCurrentChange (e) {
        this.userList.forEach(element => {
          element.checked = false;
        });
        e.checked = true;
        this.selectValueStr = e.contact;
        this.servicesForm.memberId = e.id;
      },
      selectValue () {
         this.servicesForm.contact = this.selectValueStr;
         this.dialogTableVisible = false;
      },
      sumbmitBtn () {
       
        this.$refs.servicesForm.validate((valid) => {
          let params = {
            type:2,
            productId:this.servicesForm.productId,
            memberId:this.servicesForm.memberId,
            saleNum:this.servicesForm.saleNum,
            upriverPrice:this.servicesForm.upriverPrice,
            downriverPrice:this.servicesForm.downriverPrice,
            packingMode:this.servicesForm.packingMode,
            deliveryMode:this.servicesForm.deliveryMode,
            upriverFullName:this.servicesForm.upriverFullName,
            upriverMobilePhone:this.servicesForm.upriverMobilePhone,
            remark:this.servicesForm.remark,
            downriverFullName:this.servicesForm.downriverFullName,
            downriverMobilePhone:this.servicesForm.downriverMobilePhone,
            deliveryTime:this.servicesForm.deliveryTime,
          };
          if(valid) {
            console.log(params);
            http.post(api.create_order, params).then((res) => {
              if (res.code == 0) {
                this.$router.push({ path: '/orderlist' });
              } else {
                 this.$message({
                  type: 'info',
                  message: '添加失败'
                });   
              }
            });
          }
        })
      },
      sumbmitBack () {
        this.$router.push({ path: '/orderlist' });
      }
    }
  }
</script>
<style lang="scss">
  .page-nation{
    padding-top:10px;
    text-align: center;
  }
  .el-dialog__body{
    padding: 0 20px;
  }
  .bigred{
    color:#Fa3e54;
    font-size:18px;
  }
  .small-input{
    width:217px;
  }
</style>
