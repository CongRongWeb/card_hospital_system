<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      title="查看详情"
      :close-on-click-modal="false"
      width="40%">
      <el-table
        stripe
        border
        :data="detailList"
        style="width: 100%">
        <el-table-column
          prop="6"
          label="内容"
          align="center">
        </el-table-column>
        <el-table-column
          prop="4"
          label="价格"
          align="center"
        >
          <template slot-scope="scope">
            {{Number(scope.row[4]).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table>


      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">关 闭</el-button>
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
          prop="3"
          label="收费内容"
          align="center"
        >
          <template slot-scope="scope">
           <div @click="getPatientDetail(scope.row[3])" style="color:blue;cursor:pointer;"> 查看详情</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="4"
          label="合计"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row[4].toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="收费状态"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row[5]==1?'已缴费':'未缴费'}}
          </template>

        </el-table-column>
        <el-table-column
          label="收费时间"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            {{scope.row[5]==1?scope.row[6]:''}}
          </template>

        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="是否确定缴费？"
              @confirm="handlePay(scope.row)"
            >
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row[5]==0"
                slot="reference"
              >患者缴费</el-button>

            </el-popconfirm>

          </template>
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
import { insertChargeOrUpdate, getPatient, getPay,getPayDetail,chargePay} from "../../api/index"
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
        charge_type:''
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
      detailList:[]
    }
  },
  mounted() {
    getPatient({name:'',hospitalid:''}).then(res=>{
      this.patientList=res.data
    })

    this.refreshView()
  },
  methods: {
    getPatientDetail(hospitalid){
      this.detailList=[]
      getPayDetail({hospitalid:hospitalid}).then(res=>{
        this.detailList=res.data
        this.addDialog=true
      })
    },
    handlePay(row){
      let left = 0
      for(let i =0;i<this.patientList.length;i++){
        if(row[3]==this.patientList[i][2]){
          left=this.patientList[i][16]
        }
      }
      if(row[4]<=left){
        chargePay({pay_left:left - row[4],hospitalid:row[3]}).then(res=>{
          if(res.flag){
            this.$message.success(res.message)
            this.refreshView()
          }
        })
      }else{
        this.$message.error('缴费失败，请先充值！')
      }
    },

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
      getPay(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length
        this.pageList()
      })
    },

    addFn() {
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
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
