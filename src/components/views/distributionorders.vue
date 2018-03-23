<template>
  <div class="page-distribution">
    <el-row class="page-bline">
      <el-form ref="orderFrom" :model="orderFrom" label-width="160px" :rules="validator">
        <el-col :span="12" class="page-rline">
          <div class="page-from">
              <h3>商品信息</h3>
              <el-form-item label="选择商品：" prop="productId"  >
                <el-select v-model="orderFrom.productId" placeholder="请选择商品">
                  <el-option :label="item.name" :value="item.id" v-for="item in productIdList" :key="this"  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择用户：" prop="memberId"  >
                <el-select v-model="orderFrom.memberId" filterable remote :remote-method="remoteMethod"  placeholder="请选择用户">
                  <el-option :label="item.contact" :value="item.id" v-for="item in userList" :key="this"  >
                    <span style="float: left">{{ item.contact}}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobilePhone }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="油品数量：" prop="saleNum" >
                <el-input v-model.number="orderFrom.saleNum" class="small-input" placeholder="请输入油品数量（单位吨）" ></el-input>
              </el-form-item>
              <el-form-item label="下游成交价：" prop="downriverPrice" >
                <el-input v-model.number="orderFrom.downriverPrice" class="small-input" placeholder="请输入下游成交价（元）" ></el-input>
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
        </el-col>
        <el-col :span="12">
          <div class="page-from">
              <h3>客户信息:</h3>
              <el-form-item label="收货人：" prop="downriverFullName"  >
                <el-input  v-model.number="orderFrom.downriverFullName" class="small-input" placeholder="请输入委托代理人" ></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="downriverMobilePhone" >
                <el-input v-model.number="orderFrom.downriverMobilePhone" class="small-input" placeholder="请输入联系人电话" ></el-input>
              </el-form-item>
              <el-form-item label="送货日期：" prop="deliveryTime" >
                <el-date-picker v-model="orderFrom.deliveryTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="12" class="info-dis" >
        <el-col :span="8">
          <p>价格明细(元/吨)</p>
          <p>供货价：{{pices}}</p>
          <p>成交价：{{orderFrom.downriverPrice}}</p>
        </el-col>
        <el-col :span="8">
          <p>费用(不含运费)</p>
          <p>总价：{{pices*orderFrom.downriverPrice}}</p>
          <p class="bigred">获得佣金：{{pices*orderFrom.downriverPrice*0.5}}</p>
        </el-col>
      </el-col>
      <el-col :span="12" >
         <el-button class="submit-btn"  type="primary">提交订单</el-button>
      </el-col>
    </el-row>

    <!-- Form orderValidator -->
    <el-dialog title="选择用户" :visible.sync="dialogTableVisible" width="600px"  >
      <el-row>
        <el-col :span="8">
          <el-input placeholder="用户名/手机号" size="small"   v-model="searchValue"><i slot="suffix" @click="searchBtn"  class="el-input__icon el-icon-search"></i></el-input>
        </el-col>
      </el-row>
      <el-table ref="singleTable" height="250" size="small" :data="userList" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
        <el-table-column  width="50">
          <template slot-scope="scope" >
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column property="contact" label="姓名"></el-table-column>
        <el-table-column property="mobilePhone"label="电话号码"></el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" >确 定</el-button>
      </div>
    </el-dialog>

  
  </div>
</template>

<script>
  import http from '../../api/http'
  import api from '../../api/api'
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
          deliveryTime:''
        },
        validator: {
          productId: [{ required: true, message: '商品不能为空! 请选择商品'}],
          memberId: [{ required: true, message: '用户不能为空! 请选择用户'}],
          saleNum: [{ required: true, message: '数量不能为空!'},{ type: 'number', message: '数量必须为数字值'}],
          downriverPrice: [{ required: true, message: '下游成交价不能为空!'},{ type: 'number', message: '下游成交价必须为数字值'}],
          downriverFullName: [{required: true,  message: '收货人不能为空!'}],
          downriverMobilePhone: [{required: true, message: '联系电话不能为空!'}],
          deliveryTime: [{required: true, message: '送货日期不能为空!'}],
        },
        productIdList:[
          {name:'基础油莫某某某号1',id:1},
          {name:'基础油莫某某某号2',id:2},
          {name:'基础油莫某某某号3',id:3},
          {name:'基础油莫某某某号4',id:4},
          {name:'基础油莫某某某号5',id:5},
          {name:'基础油莫某某某号6',id:6}
        ],
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
        pices:8,
        dialogTableVisible:true,
        multipleSelection:null,
        searchValue:''
      }
    },
    created () {
      this.getDataList();
    },
    methods:{
      handleCurrentChange (e) {
        this.userList.forEach(element => {
          element.checked = false;
        });
        e.checked = true;
      },
      remoteMethod(rows) {
       console.log(rows);
      },
     /**
     * 获取用户列表
     */
      getDataList (res) {
        this.loading = true;
        let params = {
          pageNo: 1,
          pageSize:6,
        }
        let data = res || {};
        let options = Object.assign(data,params);
        http.get(api.get_member_list, options).then((res) => {
          console.log(res);
          if(res.code == '0'){
            this.userList = this.filterChange(res.data.records);
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
        console.log('e');
        // if(this.searchValue !='') {
        //   let params = {
        //     mobileOrContact:this.searchValue
        //   }
        //   this.getDataList(params);
        // }
      }

    }
  }
</script>
<style scoped lang="scss">
  .page-from{
    width:600px;
    margin:0 auto;
  }
  .page-rline{
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
  }
  .bigred{
    color:#Fa3e54;
    font-size:18px;
  }
  .small-input{
    width:217px;
  }

</style>
