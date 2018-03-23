<template>
  <div class="page-products">
    <div class="box-tab">
      <el-row class="tab-header">
        <el-col :span="10" class="tetle-hd">
         <el-dropdown >
            <el-button size="mini">更多菜单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu size="mini" slot="dropdown" >
              <el-dropdown-item  >上架</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="14" style="text-align:right;" >
          <el-button  size="small" type="primary">商品导入</el-button>
          <el-button  size="small" type="primary">保存</el-button>
          <el-button  size="small" type="primary">添加</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="商品编号" width="120"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
        <el-table-column label="商品定价" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.inventory" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="areas" label="供货价格" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.inventory" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="采购价" width="120" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.inventory" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sales" label="商品数量" width="100" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.inventory" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="供货地区" show-overflow-tooltip >
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.areasType">
              <el-checkbox label="东北" name="type"></el-checkbox>
              <el-checkbox label="华南" name="type"></el-checkbox>
              <el-checkbox label="西北" name="type"></el-checkbox>
              <el-checkbox label="华东" name="type"></el-checkbox>
            </el-checkbox-group> 
          </template>
        </el-table-column>
        <el-table-column prop="address" label="库存状态" width="160"  show-overflow-tooltip  >
          <template slot-scope="scope">
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="排序" show-overflow-tooltip width="100" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.inventory" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip width="60" >
          <template slot-scope="scope">
            <a class="icon-box" title="删除"><i class="el-icon-delete"></i></a>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="page-box">
        <el-col :span="24" class="page-nation" >
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" background layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="tableData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:111,
          inventory:20,
          areas:['华东','华南'],
          areasType:[],
          sales:1000,
          isApproved:false
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:33,
          inventory:202,
          areas:['华东','华南'],
          areasType:[false,true],
          sales:1400,
          isApproved:true
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:450,
          inventory:2,
          areas:['华东'],
          areasType:[],
          sales:1000,
          isApproved:false
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:655,
          inventory:20,
          areas:[],
          areasType:[],
          sales:1000,
          isApproved:false
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:789,
          inventory:204,
          areas:['华东','华南'],
          areasType:[],
          sales:1000,
          isApproved:false
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:345,
          inventory:220,
          areas:['华东','华南'],
          areasType:[],
          sales:1000,
          isApproved:false
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          pice:1111,
          inventory:20,
          areas:['华东','华南'],
          areasType:[],
          sales:1300,
          isApproved:false
        }],
        multipleSelection: [],
        formInline: {
          user: '',
          region: ''
        },
        currentPage: 1,
        total:40,
        dialogTableVisible: false,
        checked:false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value: ''
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCommand(command){
      // this.dialogTableVisible = true;
      // this.$message('click on item ' + command);
      switch (command) {
        case 'deleteType':
          this.handleDelete();
          break;
        default:
          break;
      }
    },
    handleDelete(){
      this.$message('click on item ');
    }
  }
}
</script>
<style scoped lang="scss">
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
   
  }
 
</style>
