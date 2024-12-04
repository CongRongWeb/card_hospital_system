<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">
        <el-form-item label="药品种类" prop="type">
          <el-select v-model="formData.type" placeholder="请选择" :style="{width: '100%'}"  :disabled="disabled">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="formData.name"  :style="{width: '100%'}" clearable placeholder="请输入药品名称" ></el-input>
        </el-form-item>
        <el-form-item label="库存（件/克）" prop="numbers">
          <el-input v-model="formData.numbers"  :style="{width: '100%'}" clearable placeholder="请输入药品库存（件/克）" ></el-input>
        </el-form-item>
        <el-form-item label="有效期至" prop="intTime">
          <el-date-picker
            v-model="formData.intTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="厂家" prop="factor">
          <el-input v-model="formData.factor"  :style="{width: '100%'}" clearable placeholder="请输入厂家" ></el-input>
        </el-form-item>

        <el-form-item label="生产日期" prop="makeTime">
          <el-date-picker
            v-model="formData.makeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="规格" prop="norms">
          <el-input v-model="formData.norms"  :style="{width: '100%'}" clearable placeholder="请输入规格" ></el-input>
        </el-form-item>
        <el-form-item label="剂型" prop="drugForm">
          <el-input v-model="formData.drugForm"  :style="{width: '100%'}" clearable placeholder="请输入剂型" ></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input v-model="formData.price"  :style="{width: '100%'}" clearable placeholder="请输入售价" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input v-model="formData.remarks" type="textarea" placeholder="请输入描述"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addFn">保 存</el-button>
  </span>
    </el-dialog>

    <div>
      <el-row :gutter="0">
        <el-form ref="elForm2" :model="formData2"  label-width="85px" size="small">
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="药品类别" prop="type">
                  <el-select v-model="formData2.type" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="药品名称" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入药品名称">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item size="large">
              <el-button type="primary" size="small" @click="search">搜索</el-button>
              <el-button @click="resetForm" size="small" >重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">添加药品</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

    </div>

    <div class="container">
      <el-table
        stripe
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="1"
          label="药品名称"
          fixed="left"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="2"
          label="库存（件/克）"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="5"
          label="种类"
          align="center">
          <template slot-scope="scope">
            {{scope.row[5]==1?'中药':'西药'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="7"
          align="center"
          label="规格"
          width="150">
        </el-table-column>
        <el-table-column
          prop="8"
          align="center"
          label="剂型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="3"
          align="center"
          label="有效期至"
          width="180">
        </el-table-column>
        <el-table-column
          prop="6"
          align="center"
          label="生产日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="4"
          align="center"
          label="厂家"
          width="220">
        </el-table-column>
        <el-table-column
          prop="9"
          align="center"
          label="售价"
          width="150">
        </el-table-column>
        <el-table-column
          prop="10"
          align="center"
          label="描述"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="11"
          align="center"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="12"
          align="center"
          label="编辑时间"
          width="220">
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          fixed="right"
          label="操作">
          <template slot-scope="scope">

            <el-button
              size="mini"
              @click="handleEdit( scope.row)">编辑</el-button>
            <el-popconfirm
              title="是否删除这条信息？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button
                size="mini"
                type="danger"
                slot="reference"
              >删除</el-button>

            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;flex-direction: row-reverse;padding: 40px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,20,30]"
        background
        :page-size="limit"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>

    </div>
  </div>
</template>

<script>
import {delMedicine, getMedicine, insertMedicineOrUpdate} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        remarks:'',
        numbers:'',
        intTime:'',
        factor:'',
        type:'',
        makeTime:'',
        norms:'',
        drugForm:'',
        price:'',
        modifyName:'',
      },
      formData2: {
        name: "",
        type:""
      },
      options:[{label:'全部',value:""},{label:'中药',value:"1"},{label: '西药',value:"2"}],
      options2:[{label:'中药',value:"1"},{label: '西药',value:"2"}],
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10
    }
  },
  mounted() {
    this.getOther()
    this.refreshView()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.pageList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.pageList();
    },

    // 具体分页操作
    pageList() {
      this.tableData = this.tableList.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      );
      this.total = this.tableList.length;
    },
    getOther(){
      // getDepartmentList({name:''}).then(res=>{
      //   this.options=[['','全部'],...res.data]
      //   this.options2=res.data
      // })
    },
    refreshView(){
      const DATA={
        type:this.formData2.type,
        name:this.formData2.name
      }
      getMedicine(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {

      insertMedicineOrUpdate(this.formData).then(res=>{
        if(res.flag){
          this.$nextTick(()=>{
            this.formData.uuid=null
            this.formData.name=""
            this.formData.remarks=""
            this.formData.intTime=""
            this.formData.numbers=""
            this.formData.factor=""
            this.formData.type=""
            this.formData.makeTime=""
            this.formData.norms=""
            this.formData.drugForm=""
            this.formData.price=""
          })
          this.$message.success(res.message)
          this.addDialog=false
          this.refreshView()
        }
      })
    },

    resetForm() {
      this.$refs['elForm2'].resetFields()
      this.formData2.role=''
      this.refreshView()

    },
    search() {
      this.refreshView()
    },
    handleEdit(data) {
      this.$nextTick(()=>{
        this.formData.uuid=data[0]
        this.formData.name=data[1]
        this.formData.remarks=data[10]
        this.formData.intTime=data[3]
        this.formData.numbers=data[2]
        this.formData.factor=data[4]
        this.formData.type=data[5]
        this.formData.makeTime=data[6]
        this.formData.norms=data[7]
        this.formData.drugForm=data[8]
        this.formData.price=data[9]
      })

      this.title='编辑药品'
      this.addDialog=true
      this.disabled=true
    },
    handleDelete(data){
      delMedicine({uuid:data[0]}).then(res=>{
        if(res.flag){
          this.$message.success(res.message)
          this.refreshView()
        }
      })
    },
    //点击添加按钮
    addUser(){
      const that = this

      that.disabled=false
      this.title='添加药品'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.remarks=""
        this.formData.intTime=""
        this.formData.numbers=""
        this.formData.factor=""
        this.formData.type=""
        this.formData.makeTime=""
        this.formData.norms=""
        this.formData.drugForm=""
        this.formData.price=""

      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
