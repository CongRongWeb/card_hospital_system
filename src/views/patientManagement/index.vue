<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="150px" size="medium">
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="formData.name"  :style="{width: '100%'}" clearable placeholder="请输入患者姓名"  :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="formData.gender" label="1" :disabled="disabled">男</el-radio>
          <el-radio v-model="formData.gender" label="0" :disabled="disabled">女</el-radio>
        </el-form-item>
        <el-form-item label="住院状态" prop="state">
          <el-radio v-model="formData.state" label="1" >住院</el-radio>
          <el-radio v-model="formData.state" label="0" >门诊</el-radio>
        </el-form-item>
        <el-form-item label="患者身份证号" prop="cardid">
          <el-input v-model="formData.cardid"  :style="{width: '100%'}" clearable placeholder="请输入患者身份证号" ></el-input>
        </el-form-item>
        <el-form-item label="患者手机号" prop="phone">
          <el-input v-model="formData.phone"  :style="{width: '100%'}" clearable placeholder="请输入患者手机号" ></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="formData.address"  :style="{width: '100%'}" clearable placeholder="请输入家庭住址" ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人姓名" prop="contact_name">
          <el-input v-model="formData.contact_name"  :style="{width: '100%'}" clearable placeholder="请输入紧急联系人姓名" ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人手机号" prop="contact_phone">
          <el-input v-model="formData.contact_phone"  :style="{width: '100%'}" clearable placeholder="请输入紧急联系人手机号" ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人关系" prop="contact_relation">
          <el-input v-model="formData.contact_relation"  :style="{width: '100%'}" clearable placeholder="请输入紧急联系人关系" ></el-input>
        </el-form-item>
        <el-form-item label="病史" prop="disease_his">
          <el-input v-model="formData.disease_his"  :style="{width: '100%'}" clearable placeholder="请输入患者病史" ></el-input>
        </el-form-item>
        <el-form-item label="病症" prop="disease">
          <el-input v-model="formData.disease"  :style="{width: '100%'}" clearable placeholder="请输入患者病症" ></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="section_fid">
          <el-select v-model="formData.section_fid"  placeholder="请选择" :style="{width: '100%'}"  >
            <el-option
              v-for="item in sectionList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主治医生" prop="doctor_fid">
          <el-select v-model="formData.doctor_fid"  placeholder="请选择" :style="{width: '100%'}"  >
            <el-option
              v-for="item in doctorList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡内余额" prop="pay_left">
          <el-input v-model="formData.pay_left"  :style="{width: '100%'}" clearable placeholder="请输入卡内余额" ></el-input>
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
    <el-dialog
      :visible.sync="seeDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="150px" size="medium">
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="formData.name"  :style="{width: '100%'}" clearable placeholder="请输入患者姓名"  :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="formData.gender" label="1" :disabled="disabled">男</el-radio>
          <el-radio v-model="formData.gender" label="0" :disabled="disabled">女</el-radio>
        </el-form-item>
        <el-form-item label="患者身份证号" prop="cardid">
          <el-input v-model="formData.cardid"  :style="{width: '100%'}" clearable placeholder="请输入患者身份证号" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="患者手机号" prop="phone">
          <el-input v-model="formData.phone"  :style="{width: '100%'}" clearable placeholder="请输入患者手机号" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="formData.address"  :style="{width: '100%'}" clearable placeholder="请输入家庭住址" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人姓名" prop="contact_name">
          <el-input v-model="formData.contact_name"  :style="{width: '100%'}" clearable placeholder="请输入紧急联系人姓名" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人手机号" prop="contact_phone">
          <el-input v-model="formData.contact_phone"  :style="{width: '100%'}" clearable placeholder="请输入紧急联系人手机号" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人关系" prop="contact_relation">
          <el-input v-model="formData.contact_relation"  :style="{width: '100%'}" clearable placeholder="请输入紧急联系人关系" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="病史" prop="disease_his">
          <el-input v-model="formData.disease_his"  :style="{width: '100%'}" clearable placeholder="请输入患者病史" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="病症" prop="disease">
          <el-input v-model="formData.disease"  :style="{width: '100%'}" clearable placeholder="请输入患者病症" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="section_fid">
          <el-select v-model="formData.section_fid"  placeholder="请选择" :style="{width: '100%'}"  :disabled="disabled">
            <el-option
              v-for="item in sectionList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主治医生" prop="doctor_fid">
          <el-select v-model="formData.doctor_fid"  placeholder="请选择" :style="{width: '100%'}"  :disabled="disabled">
            <el-option
              v-for="item in doctorList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡内余额" prop="pay_left">
          <el-input v-model="formData.pay_left" :disabled="disabled"  :style="{width: '100%'}" clearable placeholder="请输入卡内余额" ></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark">
          <el-input v-model="formData.remark" :disabled="disabled" type="textarea" placeholder="请输入描述"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="seeDialog = false">关 闭</el-button>
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
              <el-button type="primary" size="small" plain @click="addUser" v-if="$store.uutype==0">添加患者</el-button>
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
          label="患者状态"
          align="center"
          width="150">
          <template slot-scope="scope">
            {{scope.row[19]==1?'住院':'门诊'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="2"
          label="编号"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          label="患者姓名"
          align="center"
          prop="1"
          width="150">
        </el-table-column>
        <el-table-column
          label="性别"
          align="center"
          width="150">
          <template slot-scope="scope">
            {{scope.row[3]==1?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column
          label="科室"
          prop="15"
          align="center">
        </el-table-column>
        <el-table-column
          label="主治医生"
          prop="6"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          label="卡内余额"
          align="center"
          prop="16"
          width="150">
          <template slot-scope="scope">
            {{Number(scope.row[16]).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="4"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="18"
          align="center"
          label="编辑时间"
          width="220">
        </el-table-column>
        <el-table-column
          width="300"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"

              @click="handleSee( scope.row)">查看</el-button>
            <el-button
              size="mini"
              v-if="$store.uutype==0"
              @click="handleEdit( scope.row)">编辑</el-button>

            <el-popconfirm
              title="是否删除这条信息？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button
                v-if="$store.uutype==0"
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
import {
  delPatient,
  getDoctor,
  getPatient,
  insertPatientOrUpdate,
  getSectionList
} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      seeDialog:false,
      title:'',
      formData: {
        name:"",
        gender:"",
        state:"0",
        cardid:"",
        phone:"",
        address:"",
        contact_name:"",
        contact_phone:"",
        contact_relation:"",
        disease_his:"",
        disease:"",
        section_fid:"",
        section_name:"",
        pay_left:"",
        remark:"",
        hospitalid:"",
        doctor_fid:"",
        doctor_name:""
      },
      formData2: {
        name: "",
        hospitalid:""
      },
      tableData: [],
      disabled:false,
      doctorList:[],
      sectionList:[],
      tableList:[],
      page:1,
      total:0,
      limit:10,
      teacherList:[]
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
      getDoctor({'name':"",'title':""}).then(res=>{
        this.doctorList=res.data
      })
      getSectionList({name:''}).then(res=>{
        this.sectionList=res.data
      })
    },
    refreshView(){
      const DATA={
        name:this.formData2.name,
        hospitalid:this.formData2.hospitalid
      }
      getPatient(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length
        this.pageList();
      })
    },

    addFn() {
      this.sectionList.forEach(item=>{
        if(this.formData.section_fid==item[0]){
          this.formData.section_name=item[1]
        }
      })
      this.doctorList.forEach(item=>{
        if(this.formData.doctor_fid==item[0]){
          this.formData.doctor_name=item[1]
        }
      })
      insertPatientOrUpdate(this.formData).then(res=>{
        if(res.flag){
          this.$nextTick(()=>{
            this.formData.uuid=null
            this.formData.name=""
            this.formData.gender=""
            this.formData.state="0"
            this.formData.cardid=""
            this.formData.phone=""
            this.formData.address=""
            this.formData.contact_name=""
            this.formData.contact_relation=""
            this.formData.contact_phone=""
            this.formData.disease_his=""
            this.formData.disease=""
            this.formData.section_fid=""
            this.formData.section_name=""
            this.formData.pay_left=""
            this.formData.remark=""
            this.formData.hospitalid=""
            this.formData.doctor_fid=""
            this.formData.doctor_name=""
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
        this.formData.gender=data[3]
        this.formData.cardid=data[7]
        this.formData.hospitalid=data[2]
        this.formData.phone=data[4]
        this.formData.address=data[8]
        this.formData.contact_name=data[9]
        this.formData.contact_relation=data[11]
        this.formData.contact_phone=data[10]
        this.formData.disease_his=data[13]
        this.formData.disease=data[12]
        this.formData.section_fid=Number(data[14])
        this.formData.section_name=data[15]
        this.formData.pay_left=data[16]
        this.formData.remark=data[17]
        this.formData.doctor_fid=Number(data[5])
        this.formData.doctor_name=data[6]
        this.formData.state=data[19]
      })

      this.title='编辑患者'
      this.addDialog=true
      this.disabled=true
    },
    handleSee(data) {
      this.$nextTick(()=>{
        this.formData.uuid=data[0]
        this.formData.name=data[1]
        this.formData.gender=data[3]
        this.formData.cardid=data[7]
        this.formData.hospitalid=data[2]
        this.formData.phone=data[4]
        this.formData.address=data[8]
        this.formData.contact_name=data[9]
        this.formData.contact_relation=data[11]
        this.formData.contact_phone=data[10]
        this.formData.disease_his=data[13]
        this.formData.disease=data[12]
        this.formData.section_fid=Number(data[14])
        this.formData.section_name=data[15]
        this.formData.pay_left=data[16]
        this.formData.remark=data[17]
        this.formData.doctor_fid=Number(data[5])
        this.formData.doctor_name=data[6]
        this.formData.state=data[19]
      })

      this.title='查看患者'
      this.seeDialog=true
      this.disabled=true
    },

    handleDelete(data){
      delPatient({uuid:data[0]}).then(res=>{
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
      this.title='添加患者'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.gender=""
        this.formData.state="0"
        this.formData.cardid=""
        this.formData.phone=""
        this.formData.address=""
        this.formData.contact_name=""
        this.formData.contact_relation=""
        this.formData.contact_phone=""
        this.formData.disease_his=""
        this.formData.disease=""
        this.formData.section_fid=""
        this.formData.section_name=""
        this.formData.pay_left=""
        this.formData.remark=""
        this.formData.hospitalid=""
        this.formData.doctor_fid=""
        this.formData.doctor_name=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
