<template>
  <div class="page-distribution">
    
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分销订单</span>
        <el-button style="float: right; " size="small" type="primary" @click="sumbmitBack" >返回</el-button>
        <el-button style="float: right; margin-right:20px" size="small" type="primary" @click="sumbmitBtn" >提交订单</el-button>
      </div>
      <el-row :gutter="20">
        <el-form ref="orderFrom" :model="orderFrom" label-width="120px" :rules="validators">
          <el-col :span="24">
            <el-card class="box-card" style="margin-bottom:20px;">
              <el-row :gutter="20">
                <el-col :span="6">
                  <p>商品信息</p>
                  <p>商品名称：{{orderFrom.productName}}</p>
                  <p>数量(吨)：{{orderFrom.saleNum}}</p>
                </el-col>
                <el-col :span="6">
                  <p>价格明细(元/吨)</p>
                  <p>供货价：{{pices}}</p>
                  <p>成交价：{{orderFrom.downriverPrice !=0 ?  orderFrom.downriverPrice : '0' }}</p>
                </el-col>
                <el-col :span="6">
                  <p>费用(不含运费)</p>
                  <p>总价：{{orderFrom.saleNum*orderFrom.downriverPrice}}</p>
                </el-col>
                <el-col :span="6">
                  <p>佣金</p>
                  <p class="bigred">获得佣金：{{pices*orderFrom.downriverPrice*0.5}}</p>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix"><span>商品信息</span></div>
                <div class="page-from">

                  <el-form-item label="选择商品：" prop="productName" >
                    <el-input v-model="orderFrom.productName"  @focus="selectProductDialog"    placeholder="选择商品" ></el-input>
                  </el-form-item>

                  <!-- <el-form-item label="选择商品：" prop="productId"  >
                    <el-select v-model="orderFrom.productId"  placeholder="请选择商品">
                      <div class="search-box">
                        <el-input placeholder="请输入搜索商品名称" clearable  size="small" @keyup.enter.native="searchProduct"  v-model="searchProductstr">
                          <i slot="suffix" class="el-input__icon el-icon-search icon-none"></i>
                        </el-input>
                      </div>
                      <el-option :label="item.name" :value="item.id" v-for="item in productIdList" :key="this"  ></el-option>
                    </el-select>
                  </el-form-item> -->

                  <el-form-item label="选择用户：" prop="contact" >
                    <el-input v-model="orderFrom.contact"  @focus="showSelectDialog"    placeholder="请选择用户" ></el-input>
                  </el-form-item>

                  <!-- <el-form-item label="选择用户：" prop="memberId"  >
                    <el-select v-model="orderFrom.memberId" filterable remote :remote-method="remoteMethod" @focus="clearValue"  placeholder="请选择用户(可搜索)">
                      <el-option :label="item.contact" :value="item.id" v-for="item in userList" :key="this"  >
                        <span style="float: left">{{ item.contact}}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobilePhone }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="油品数量：" prop="saleNum" >
                    <el-input v-model.number="orderFrom.saleNum"  placeholder="请输入油品数量（单位吨）" ></el-input>
                  </el-form-item>
                  <el-form-item label="下游成交价：" prop="downriverPrice" >
                    <el-input v-model.number="orderFrom.downriverPrice"  placeholder="请输入下游成交价（元）" ></el-input>
                  </el-form-item>
                  <el-form-item label="包装方式：">
                    <el-select v-model="orderFrom.packingMode"  placeholder="请选择包装方式">
                      <el-option :label="item.name" :value="item.type" v-for="item in packingModeList" :key="this"  ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="提货方式：">
                    <el-select v-model="orderFrom.deliveryMode" placeholder="请选择运输方式">
                      <el-option :label="item.name" :value="item.type" v-for="item in deliveryModeList" :key="this"  ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注："  prop="remark" >
                    <el-input type="textarea" v-model="orderFrom.remark" placeholder="可填写备注信息，包括包装方式、要货时间、运输方式等"  ></el-input>
                  </el-form-item>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix"><span>客户信息</span></div>
              <div class="page-from">
                  <el-form-item label="收货人：" prop="downriverFullName"  >
                    <el-input  v-model.number="orderFrom.downriverFullName"  placeholder="请输入委托代理人" ></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话：" prop="downriverMobilePhone" >
                    <el-input v-model.number="orderFrom.downriverMobilePhone"  placeholder="请输入联系人电话" ></el-input>
                  </el-form-item>
                  <el-form-item label="送货日期：" prop="deliveryTime" >
                    <el-date-picker v-model="orderFrom.deliveryTime"  value-format="timestamp"  type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
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
        orderFrom: {
          productId:'',
          memberId:'',
          saleNum:'',
          downriverPrice:'',
          packingMode:'',
          deliveryMode:'',
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
          downriverFullName: [{required: true,  message: '收货人不能为空!'}],
          downriverMobilePhone: [{ required: true, trigger: 'blur', validator: validPhone }],
          deliveryTime: [{required: true, message: '送货日期不能为空!'}],
        },
        productIdList:[],
        userList:[],
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
        pices:0,
        dialogTableVisible:false,
        dialogProductVisible:false,
        searchValue:'',
        loading:false,
        pageIndex:1,
        pageSize:6,
        total:0,
        allTotal:0,
        selectValueStr:'',
        searchProductstr:'',
        selectProductValueStr:''

      }
    },
    created () {
      this.getDataList();
      this.getProductList();
    },
    methods:{
      showSelectDialog () {
        this.dialogTableVisible = true;
        this.orderFrom.contact = '';
        this.orderFrom.memberId = '';
      },
      handleCurrentChange (e) {
        this.userList.forEach(element => {
          element.checked = false;
        });
        e.checked = true;
        this.selectValueStr = e.contact;
        this.orderFrom.memberId = e.id;
      },
      selectValue () {
         this.orderFrom.contact = this.selectValueStr;
         this.dialogTableVisible = false;
      },
      remoteMethod(query) {
        const params = {
          mobileOrContact:query
        }
       if(query !== ''){
         setTimeout(() => {
            this.getDataList(params);
          }, 200);
       };
      },
      clearValue () {
        this.orderFrom.contact = '';
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
          console.log(res);
          if(res.code == '0'){
            this.userList = this.filterChange(res.data.records);
            this.total = res.data.paging.total;
          }else{
            this.$message.error(res.message);
          }
        });
      },

      filterChange (res) {
        res.forEach(el=>{
          el.checked = false;
        });
        return res;
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
      onPageIndex (val) {
        this.pageIndex = val;
        this.getProductList();
      },
      selectProductDialog () {
        this.dialogProductVisible =true;
        this.orderFrom.productName = '';
        this.orderFrom.productId = '';

      },
      onIndexChange (e) {
        this.productIdList.forEach(element => {
          element.checked = false;
        });
        e.checked = true;
        this.selectProductValueStr = e.name;
        this.orderFrom.productId = e.id;
        this.pices = e.salePrice;
      },
      selectProductValue () {
        this.orderFrom.productName = this.selectProductValueStr;
        this.dialogProductVisible = false;
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

      searchProduct () {
        const params = {
          name:this.searchProductstr
        }
        if(this.searchProductstr !== '') {
          this.getProductList(params);
        };
      },
      
      sumbmitBtn () {
        this.$refs.orderFrom.validate((valid) => {
          let params = {
            type:1,
            productId:this.orderFrom.productId,
            memberId:this.orderFrom.memberId,
            saleNum:this.orderFrom.saleNum,
            downriverPrice:this.orderFrom.downriverPrice,
            packingMode:this.orderFrom.packingMode,
            deliveryMode:this.orderFrom.deliveryMode,
            remark:this.orderFrom.remark,
            downriverFullName:this.orderFrom.downriverFullName,
            downriverMobilePhone:this.orderFrom.downriverMobilePhone,
            deliveryTime:this.orderFrom.deliveryTime,
          };
          if(valid) {
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
  .search-box{
    padding:10px;
  }
  .el-input__validateIcon{
    display:none;
  }
</style>
