<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData" label-width="100px" size="medium">
        <el-form-item label="患者编号" prop="hospitalid">
          <el-input v-model="formData.hospitalid"  :style="{width: '100%'}" clearable placeholder="请输入患者编号" @input="handleInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="患者姓名" v-if="formData.name!=''" >
          {{formData.name}}
        </el-form-item>
        <el-form-item label="患者性别" v-if="formData.name!=''">
          {{formData.gender==1?'男':'女'}}
        </el-form-item>
        <el-form-item label="充值金额" prop="charge">
          <el-input v-model="formData.charge" :style="{width: '100%'}" clearable placeholder="请输入充值金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="charge_type">
          <el-select v-model="formData.charge_type" placeholder="请选择" :style="{width: '100%'}" >
            <el-option
              v-for="item in chargeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addFn">充 值</el-button>
  </span>
    </el-dialog>

    <div>
      <el-row :gutter="0">
        <el-form ref="elForm2" :model="formData2"  label-width="85px" size="small">
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="患者姓名" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入患者姓名">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="患者编号" prop="hospitalid">
                  <el-input v-model="formData2.hospitalid" :style="{width: '100%'}" clearable placeholder="请输入患者编号">
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
              <el-button type="primary" size="small" plain @click="addUser">充值</el-button>
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
          prop="3"
          label="患者编号"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="1"
          label="患者姓名"
          align="center"
          width="220"
          >
        </el-table-column>
        <el-table-column
          prop="3"
          label="患者性别"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row[2]==1?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column
          label="充值方式"
          align="center"
        >
          <template slot-scope="scope">
            {{switchChangeType(scope.row[4])}}
          </template>
        </el-table-column>
        <el-table-column
          prop="5"
          label="充值金额"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="6"
          align="center"
          label="充值时间"
          width="220">
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import { insertChargeOrUpdate, getPatient, getCharge} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        hospitalid:'',
        charge:"",
        gender:'',
        charge_type:'',
        old_pay_left:0
      },
      formData2: {
        name: "",
        hospitalid: ""
      },
      chargeOptions:[{value:"0",label:"微信"},{value:"1",label:"支付宝"},{value:"2",label:"现金"}],
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10,
      patientList:[]
    }
  },
  mounted() {
    getPatient({name:'',hospitalid:''}).then(res=>{
      this.patientList=res.data
    })

    this.refreshView()
  },
  methods: {

    switchChangeType(val){
      switch (val) {
        case '0':
          return '微信'
        case '1':
          return '支付宝'
        case '2':
          return '现金'
      }
    },
    handleInput(val){

      if(val.length==8){
        console.log(val,'vallll')
        this.patientList.forEach(item=>{
          if(item[2]==val){
            console.log(item,'itemmm')
            this.formData.name=item[1]
            this.formData.gender=item[3]
            this.formData.old_pay_left=item[16]
          }
        })
      }
    },


    //处理切换页码
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
    refreshView(){
      const DATA={
        name:this.formData2.name,
        hospitalid:this.formData2.hospitalid
      }
      getCharge(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length
        this.pageList()
      })
    },

    addFn() {


      this.formData.old_pay_left += Number(this.formData.charge)
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        insertChargeOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.name=""
              this.formData.charge=""
              this.formData.gender=""
              this.formData.charge_type=""
              this.formData.hospitalid=""
              this.formData.old_pay_left=0
            })
            this.$message.success(res.message)
            this.addDialog=false
            this.refreshView()
          }
        })
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
    //点击添加按钮
    addUser(){
      const that = this
      that.disabled=false
      this.title='充值'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.charge=""
        this.formData.gender=""
        this.formData.charge_type=""
        this.formData.hospitalid=""
        this.formData.old_pay_left=0
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
