<template>
  <div class="page-products">
    <div class="box-tab">
      <el-row class="tab-header">
        <!-- <el-col :span="10" class="tetle-hd">
         <el-dropdown >
            <el-button size="mini">更多菜单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu size="mini" slot="dropdown" >
              <el-dropdown-item  >上架</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col> -->
        <el-col :span="24" style="text-align:right;" >
          <el-button  size="small" type="primary">商品导入</el-button>
          <el-button  size="small" type="primary">保存</el-button>
          <el-button  size="small" type="primary" @click="addProductList">添加</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="productSn" label="商品编号" width="120"></el-table-column>
        <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
        <el-table-column label="内部定价" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.internalPrice" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="供货价格" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.purchasingPrice" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="分销价格" width="120" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.salePrice" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="商品数量" width="100" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.productNum" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="供货地区" show-overflow-tooltip >
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.areasType">
              <el-checkbox label="东北" name="type"></el-checkbox>
              <el-checkbox label="华南" name="type"></el-checkbox>
              <el-checkbox label="西北" name="type"></el-checkbox>
              <el-checkbox label="华东" name="type"></el-checkbox>
            </el-checkbox-group> 
          </template>
        </el-table-column>
        <el-table-column  label="库存状态" width="160"  show-overflow-tooltip  >
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.status" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.caption" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  label="排序" show-overflow-tooltip width="100" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sort" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="操作" show-overflow-tooltip width="60" >
          <template slot-scope="scope">
            <a class="icon-box" title="删除"><i class="el-icon-delete"></i></a>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row class="page-box">
        <el-col :span="24" class="page-nation" >
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </el-col>
      </el-row> -->
    </div>

   <!-- 选择订单列表 -->
    <el-dialog title="添加商品" :visible.sync="dialogAddVisible" width="600px">

      <el-table ref="multipleTable" :data="kindomProductList" @selection-change="handleSelectionChange" v-loading="loading" size="small" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="productName" label="商品名称"></el-table-column>
        <el-table-column property="productSn" label="商品编号"></el-table-column>
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
        <el-button size="mini" @click="dialogAddVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary"  >确 定</el-button>
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
      tableData: [{
          productId: '2016-05-03',
          productName: '王小虎',
          productNum: 20,
          productSn:111,
          purchasingPrice:20,
          internalPrice:20,
          salePrice:10,
          areas:['华东','华南'],
          areasType:[],
          status:'',
          sort:0
        }, {
          productId: '2016-05-03',
          productName: '王小虎',
          productNum: 10,
          productSn:111,
          purchasingPrice:20,
          internalPrice:20,
          salePrice:10,
          areas:['华东','华南'],
          areasType:[],
          status:'',
          sort: 0
        }, {
          productId: '2016-05-03',
          productName: '王小虎',
          productNum: 30,
          productSn:111,
          purchasingPrice:20,
          internalPrice:20,
          salePrice:10,
          areas:['华东'],
          areasType:[],
          status:'',
          sort: 0
        }],
        multipleSelection: [],
        selectIndexArry:[],
        dialogAddVisible: true,
        options: [],
        value: '',
        loading:false,
        kindomProductList:[],
        allTotal:0,
        pageIndex:1,
        pageSize:10,
    }
  },
  created () {
    this.getStockStatus();
    this.getKindomProductList();
  },
  methods: {
    getStockStatus () {
       http.get(api.get_stockStatus).then((res) => {
          if(res.code == '0') {
            this.options = res.data.records;
          }else{
            this.$message.error(res.message);
          }
        });
    },
    getKindomProductList (res) {
      this.loading = true;
        let params = {
          pageNo: this.pageIndex,
          pageSize:this.pageSize,
        }
        let data = res || {};
        let options = Object.assign(data,params);
        http.get(api.get_list_kindom, options).then((res) => {
          if(res.code == '0') {
            this.loading = false;
            this.kindomProductList = res.data.records;
            this.allTotal = res.data.paging.total;
          }else{
            this.$message.error(res.message);
          }
        });
    },
    onPageIndex (val) {
      this.pageIndex = val;
      this.getKindomProductList();
      // if(this.multipleSelection.length>0) {
      //    this.multipleSelection.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //   });
      // }
    },
    addProductList () {
      this.dialogAddVisible = true;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.selectIndexArry = this.selectIndexArry.concat(val);
      console.log(this.multipleSelection);
      console.log(this.selectIndexArry);
      console.log('为啥你都会');
    }
  }
}
</script>
<style lang="scss">
  .page-products{
    .header-row{
      .el-form-item{
        margin-top:20px;
        margin-bottom:20px;
      }
    }
    .no-magtop{
      margin-top:0;
      margin-bottom:0;
    }
    .tab-header{
      padding:10px 16px;
      border:1px solid #ebeef5;
      border-bottom:none;
      .tetle-hd{
        line-height:32px;
      }
    }
    .page-box{
      padding-top:10px;
    }
    .page-nation{
      text-align:right;
    }
    .icon-box{
      font-size:20px;
      padding:0 5px;
      cursor: pointer;
    }
    .page-nation{
      text-align:center;
      padding:5px 0;
    }
    .el-dialog__body{
      padding:0 10px;
    }
   
  }
 
</style>
