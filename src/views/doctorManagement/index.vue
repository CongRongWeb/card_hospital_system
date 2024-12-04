<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData" label-width="100px" size="medium">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入姓名"
                    />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="formData.gender" label="1">男</el-radio>
          <el-radio v-model="formData.gender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-input v-model="formData.title"  :style="{width: '100%'}" clearable placeholder="请输入职称"
                    ></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="degree">
          <el-input v-model="formData.degree"  :style="{width: '100%'}" clearable placeholder="请输入学历"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone"  :style="{width: '100%'}" clearable placeholder="请输入手机号"
                    ></el-input>
        </el-form-item>
        <el-form-item label="病区" prop="section_fid">
          <el-select v-model="formData.section_fid" placeholder="请选择病区" style="width: 100%">
            <el-option
              v-for="item in sectionList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
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
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入姓名">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="职称" prop="title">
                  <el-input v-model="formData2.title" :style="{width: '100%'}" clearable placeholder="请输入职称">
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
              <el-button type="primary" size="small" plain @click="addUser">添加医生</el-button>
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
          label="姓名"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="5"
          label="职称"
          align="center"
          show-overflow-tooltip
          width="220">
        </el-table-column>
        <el-table-column
          prop="3"
          label="手机号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          label="性别">
          <template slot-scope="scope">
            {{scope.row[4]==1?'男':'女'}}
          </template>
        </el-table-column>
          <el-table-column
            prop="6"
            align="center"
            label="学历">
        </el-table-column>
          <el-table-column
            prop="7"
            align="center"
            show-overflow-tooltip
            label="科室">
            <template slot-scope="scope">
              {{switchSection(scope.row[8])}}
            </template>
          </el-table-column>
          <el-table-column
            prop="9"
            align="center"
            show-overflow-tooltip
            label="描述">
          </el-table-column>
        <el-table-column
          prop="10"
          align="center"
          label="编辑时间">
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
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
import {delDoctor, getDoctor, insertDoctorOrUpdate,getSectionList} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        remark:'',
        title:'',
        phone:'',
        gender:'',
        section_fid:'',
        section_name:'',
        degree:''
      },
      formData2: {
        name: "",
        title:''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      tableData: [],
      tableList:[],
      sectionList:[],
      disabled:false,
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
    switchSection(val){
      for(let i=0;i<this.sectionList.length;i++){
        if(val==this.sectionList[i][0]){
          return this.sectionList[i][1]
        }
      }

    },
    getOther(){
      getSectionList({name:''}).then(res=>{
        this.sectionList=res.data

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
        title:this.formData2.title
      }
      getDoctor(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length
        this.pageList();
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        insertDoctorOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.name=""
              this.formData.title=""
              this.formData.phone=""
              this.formData.remark=""
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
    handleEdit(data) {
      this.$nextTick(()=>{
        this.formData.uuid=data[0]
        this.formData.name=data[1]
        this.formData.title=data[5]
        this.formData.phone=data[3]
        this.formData.remark=data[9]
        this.formData.degree=data[6]
        this.formData.gender=data[4]
        this.formData.section_fid=Number(data[8])
        this.formData.section_name=data[7]
      })

      this.title='编辑医生'
      this.addDialog=true
      this.disabled=true
    },
    handleDelete(data){
      delDoctor({uuid:data[0]}).then(res=>{
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
      this.title='添加医生'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.title=""
        this.formData.phone=""
        this.formData.remark=""
        this.formData.gender=""
        this.formData.degree=""
        this.formData.section_name=""
        this.formData.section_fid=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
