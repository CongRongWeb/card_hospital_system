<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">
        <el-form-item label="患者" prop="hospitalid">
          <el-select v-model="formData.hospitalid" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in patientList"
              :key="item[0]"
              :label="item[1]"
              :value="item[2]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品" prop="medicine_id">
          <el-select v-model="formData.medicine_id" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in medicineList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品数量" prop="medicine_number">
          <el-input v-model="formData.medicine_number" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入药品数量" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入描述"
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
              <el-button type="primary" size="small" plain @click="addUser">添加</el-button>
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
          width="220">
        </el-table-column>
        <el-table-column
          label="患者性别"
          align="center"
          width="220">
          <template slot-scope="scope">
            {{scope.row[2]==1?'男':"女"}}
          </template>
        </el-table-column>

        <el-table-column
          prop="6"
          label="药品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="7"
          label="药品数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="4"
          label="售价"
          align="center">
          <template slot-scope="scope">
            {{Number(scope.row[4]).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="8"
          label="备注"
          align="center"
          show-overflow-tooltip
        >
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
import {getMedicine, getPatient,getPatientMedicine,insertPatientMedicineOrUpdate} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        remark:'',
        medicine_id:'',
        medicine_name:'',
        price:'',
        hospitalid:'',
        medicine_number:'',
        gender:'',
        left_number:0
      },
      formData2: {
        name: "",
        hospitalid: ''
      },
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10,
      patientList:[],
      medicineList:[]
    }
  },
  mounted() {
    this.refreshView()
    this.getOther()
  },
  methods: {
    getOther(){
      getPatient({name:'',hospitalid:''}).then(res=>{
        this.patientList=res.data
      })
      getMedicine({'name':'','type':''}).then(res=>{
        this.medicineList=res.data
      })
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
      getPatientMedicine(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {
      this.patientList.forEach(item=>{
        if(this.formData.hospitalid=item[2]){
          this.formData.gender=item[3]
          this.formData.name=item[1]
        }
      })
      this.medicineList.forEach(item=>{
        if (this.formData.medicine_id==item[0]){
          this.formData.price=Number(this.formData.medicine_number) * Number(item[9])
          this.formData.medicine_name=item[1]
          this.formData.left_number=item[2]
        }
      })
      if(this.formData.medicine_number>this.formData.left_number){
        this.$message.error('药品数量不足，请通知药房补给药品')
        return
      }else{
        this.formData.left_number=this.formData.left_number - this.formData.medicine_number
      }

      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        insertPatientMedicineOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.name=""
              this.formData.remark=""
              this.formData.medicine_id=''
              this.formData.medicine_name=''
              this.formData.price=''
              this.formData.hospitalid=''
              this.formData.medicine_number=''
              this.formData.gender=''
              this.formData.left_number=0
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
      this.formData2.name=''
      this.formData2.hospitalid=''
      this.refreshView()

    },
    search() {
      this.refreshView()
    },
    //点击添加按钮
    addUser(){
      const that = this

      that.disabled=false
      this.title='添加'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.remark=""
        this.formData.medicine_id=''
        this.formData.medicine_name=''
        this.formData.price=''
        this.formData.hospitalid=''
        this.formData.medicine_number=''
        this.formData.gender=''
        this.formData.left_number=0
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
