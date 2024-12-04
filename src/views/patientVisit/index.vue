<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">

      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">
        <el-form-item label="处方名称" prop="name">
          <el-input v-model="formData.name" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入处方名称" ></el-input>
        </el-form-item>
        <el-form-item label="患者" prop="patientId">
          <el-select v-model="formData.patientId" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in patientList"
              :key="item[0]"
              :label="item[1]"
              :value="item[2]">
            </el-option>
          </el-select>
        </el-form-item>

        <template v-for="(item,index) in chufangList">
          <el-form-item label="药品" >
            <el-select v-model="item.id" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in medicineList"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]">
              </el-option>
            </el-select>
            <el-button type="primary" @click="addMedicine" v-if="index ==0">增加药品</el-button>
          </el-form-item>
          <el-form-item label="药品数量" >
            <el-input v-model="item.number"  :style="{width: '80%'}" clearable placeholder="请输入药品数量" ></el-input>
            <el-button type="danger" @click="delMedicine(index)" v-if="index !=0">删除</el-button>
          </el-form-item>
        </template>
        <el-form-item label="天数" prop="days">
          <el-input v-model="formData.days"  :style="{width: '100%'}" clearable placeholder="请输入处方天数" ></el-input>
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
            <el-form-item size="large">
              <el-button type="primary" size="small" @click="search">搜索</el-button>
              <el-button @click="resetForm" size="small" >重置</el-button>
            </el-form-item>
          </el-col>
<!--          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">添加</el-button>
            </el-form-item>
          </el-col>-->
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
          label="患者编号"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="2"
          label="患者姓名"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="5"
          label="科室"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="6"
          label="病症"
          align="center">
        </el-table-column>
        <el-table-column
          label="药品"
          align="center"
          width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="getChufangDetailFn(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="7"
          label="编辑时间"
          width="220"
          align="center">
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


    <el-dialog
      title="查看详情"
      :visible.sync="detailDialog"
      width="40%"
    >
      <el-table
        stripe
        border
        :data="detailTableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="药品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="number"
          label="药品数量"
          align="center"
          width="220">
        </el-table-column>

      </el-table>


      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="detailDialog = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import {getMedicine, getPatient,getPatientVisit,insertChufangOrUpdate,getPatientVisitDetail,quyaoApi} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      detailDialog:false,
      detailTableData:[],
      title:'',
      formData: {
        name: "",
        patientId:'',
        patientName:'',
        medicineIds:'',
        medicineNumber:'',
        days:''
      },
      formData2: {
        name: ""
      },
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10,
      patientList:[],
      medicineList:[],
      chufangList:[{id:'',number:''}]
    }
  },
  mounted() {
    this.refreshView()
    this.getOther()
  },
  methods: {
    quyaoFn(data){
      let  medicineArr = data[4].split(',')
      let  numArr = data[5].split(',')
      medicineArr.splice(medicineArr.length -1 ,1)
      numArr.splice(numArr.length-1,1)
      medicineArr.forEach((item,indexAll)=>{
        this.medicineList.forEach((i,index)=>{
          this.medicineList[index][2] = Number(this.medicineList[index][2])
          if(i[0]==item[0]){
            this.medicineList[index][2] = Number(this.medicineList[index][2]) - Number(numArr[indexAll])
          }
        })
      })
      let arr = this.medicineList.filter(item=>{return item[2]>=0})
      if(arr.length==this.medicineList.length){
        medicineArr.forEach((item,index)=>{
          let total = 0,price='',medicine_name='',hospitalid='',name='',gender='';
          this.medicineList.forEach(i=>{
            if(i[0]==item){
              total = i[2]
            }
          })
          this.medicineList.forEach(m=>{
            if(m[0]==item){
              price = m[9]
              medicine_name = m[1]
            }
          })
          hospitalid=data[2]
          this.patientList.forEach(p=>{
            if(hospitalid==p[2]){
              name=p[1]
              gender = p[3]
            }
          })

          quyaoApi({
            numbers:total - Number(numArr[index]),
            medicineId:item,
            chufangid:data[0],
            price:price,
            medicine_name:medicine_name,
            hospitalid:hospitalid,
            name:name,
            gender:gender,




          })
        })
        this.$message.success('取药成功')




      }else{
        this.$message.error('药品不足')
      }
      const that = this
      setTimeout(function(){
        that.refreshView()
      },200)


    },
    getChufangDetailFn(data){
      this.detailTableData=[]
      this.detailDialog=true
      getPatientVisitDetail({fid:data[0]}).then(res=>{
        let  arr = res.data[0][3].split(',')
        let  numArr =res.data[0][4].split(',')
        arr.splice(arr.length -1 ,1)
        numArr.splice(numArr.length-1,1)
        arr.forEach((item,index)=>{
          this.detailTableData.push({name:this.getDetailMedicine(item),number:numArr[index],tt:res.data[0][1]})
        })
      })
    },

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
    getDetailMedicine(fid){
      let name =''
      this.medicineList.forEach(item=>{
        if(item[0]==fid){
          name =item[1]
        }
      })
      return name
    },
    refreshView(){
      const DATA={
        patientName:this.formData2.name
      }
      getPatientVisit(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {
      this.patientList.forEach(item=>{
        if(this.formData.hospitalid=item[2]){
          this.formData.patientId=item[2]
          this.formData.patientName=item[1]
        }
      })
      this.medicineList.forEach(item=>{
        if (this.formData.medicine_id==item[0]){
          this.formData.price=Number(this.formData.medicine_number) * Number(item[9])
          this.formData.medicine_name=item[1]
          this.formData.left_number=item[2]
        }
      })
      this.chufangList.forEach(item=>{

        this.formData.medicineIds += item.id +','
        this.formData.medicineNumber +=item.number +','
      })
      this.$refs['elForm'].validate(valid => {
        if (!valid) return

        this.patientList.forEach(p=>{
          if(p[2]==this.formData.patientId){
            this.formData.section_name=p[15]
            this.formData.disease=p[12]
          }
        })
        insertChufangOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              delete this.formData.section_name
              delete this.formData.disease
              this.formData.uuid=null
              this.formData.patientId=""
              this.formData.patientName=""
              this.formData.medicineIds=""
              this.formData.medicineNumber=""
              this.formData.days=""
              this.formData.name=""
              this.chufangList=[{id:'',number:''}]
            })
            this.$message.success(res.message)
            this.addDialog=false
            this.refreshView()
          }
        })
      })

    },
    addMedicine(){
      this.chufangList.push({id:'',number:''})
    },
    delMedicine(index){
      this.chufangList.splice(index,1)

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
        this.formData.patientId=""
        this.formData.patientName=""
        this.formData.medicineIds=""
        this.formData.medicineNumber=""
        this.formData.days=""
        this.formData.name=""
        this.chufangList=[{id:'',number:''}]
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
