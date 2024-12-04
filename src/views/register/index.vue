<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData" label-width="100px" size="medium">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入患者姓名" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="formData.gender" label="1" :disabled="disabled">男</el-radio>
          <el-radio v-model="formData.gender" label="0" :disabled="disabled">女</el-radio>
        </el-form-item>
        <el-form-item label="科室" prop="section_id">
          <el-select v-model="formData.section_id" placeholder="请选择科室" style="width: 100%">
            <el-option
              v-for="item in sectionList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主治医生" prop="doctor_id">
          <el-select v-model="formData.doctor_id" placeholder="请选择主治医生" style="width: 100%">
            <el-option
              v-for="item in doctorList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
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
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">挂号</el-button>
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
          width="280">
        </el-table-column>
        <el-table-column
          prop="1"
          label="患者姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="5"
          label="科室"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="7"
          label="主治医生"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="8"
          align="center"
          width="220"
          label="编辑时间">
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
import { getRegister, getSectionList, insertRegisterOrUpdate,getDoctor} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        doctor_id:'',
        section_id:'',
        section_name:'',
        doctor_name:'',
        gender:''
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
      sectionList:[],
      doctorList:[]
    }
  },
  mounted() {
    this.refreshView()
    this.getOther()
  },
  methods: {
    getOther(){
      getSectionList({name:''}).then(res=>{
        this.sectionList=res.data
      })
      getDoctor({name:'',title:''}).then(res=>{
        this.doctorList=res.data
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
        name:this.formData2.name
      }
      getRegister(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {

      this.sectionList.forEach(item=>{
        if(item[0]==this.formData.section_id){
          this.formData.section_name=item[1]
        }
      })
      this.doctorList.forEach(item=>{
        if(item[0]==this.formData.doctor_id){
          this.formData.doctor_name=item[1]
        }
      })


      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        insertRegisterOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.doctor_id=""
              this.formData.name=""
              this.formData.section_id=""
              this.formData.gender=""
              this.formData.section_name=""
              this.formData.doctor_name=""
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
      this.refreshView()

    },
    search() {
      this.refreshView()
    },

    //点击添加按钮
    addUser(){
      const that = this
      this.title='挂号'
      this.$nextTick(()=>{
        this.formData.doctor_id=""
        this.formData.name=""
        this.formData.section_id=""
        this.formData.gender=""
        this.formData.section_name=""
        this.formData.doctor_name=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
