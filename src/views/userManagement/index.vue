<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px" size="medium">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入用户名"
                    prefix-icon='el-icon-user'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" :style="{width: '100%'}" clearable placeholder="请输入密码"
                    prefix-icon='el-icon-lock' show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" :style="{width: '100%'}" clearable placeholder="请输入手机号"
                    prefix-icon='el-icon-mobile-phone'></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="formData.role" size="medium">
            <el-radio v-for="(item, index) in roleOptions" :key="index" :disabled="item.disabled"
                      :label="item.value">{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" prop="uuid" v-show="false">
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
                <el-form-item label="角色" prop="role">
                  <el-select v-model="formData2.role" :style="{width: '100%'}" placeholder="请选择角色">
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
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formData2.username" :style="{width: '100%'}" clearable placeholder="请输入用户名">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="formData2.phone" :style="{width: '100%'}" clearable placeholder="请输入手机号">
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
          <el-col :span="6">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">添加用户</el-button>
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
          label="用户名"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="4"
          label="手机号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="角色">
          <template slot-scope="scope">
            {{switchRole(scope.row[3])}}
          </template>
        </el-table-column>
        <el-table-column
          prop="5"
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
    </div>
  </div>
</template>

<script>
import {delUser, getUserList, insertUserOrUpdate,getClassList} from "../../api/index"
export default {
  name: "index",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        const b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
        if(!b.test(this.formData.username)){
          callback(new Error('用户名必须由8-12位数字加字母组成'));
        }
        callback();
      }
    }
    var validatePassword= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        const b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/

        if(!b.test(this.formData.password)){
          callback(new Error('密码必须由8-12位数字加字母组成'));
        }
        if(this.formData.password==this.formData.username){
          callback(new Error('用户名和密码不可相同'));
        }
        callback();
      }
    }
    return {
      addDialog: false,
      title:'',
      formData: {
        username: "",
        password: "",
        phone: "",
        role: '0',
        uuid:null,
      },
      formData2: {
        username: "",
        phone: "",
        role: ""
      },
      options: [{
          value: '',
          label: '全部'
        }, {
        value: '3',
        label: '药房'
      }, {
          value: '2',
          label: '护士'
        }, {
          value: '1',
          label: '医生'
        },{
        value: '0',
        label: '超级管理员'
      }],
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur',
          required: true,
        }],
        password: [{
          required: true,
          validator: validatePassword,
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: '角色不能为空',
          trigger: 'change'
        }],
      },
      roleOptions: [{
        "label": "药房",
        "value": '3'
      },{
        "label": "护士",
        "value": '2'
      }, {
        "label": "医生",
        "value": '1'
      }, {
        "label": "超级管理员",
        "value": '0'
      }],
      tableData: [],
      disabled:false,
    }
  },
  mounted() {
    this.refreshView()
  },
  methods: {

    switchRole(type){
      switch (type){
        case '0':
          return '超级管理员'
        case '1':
          return '医生'
        case '2':
          return '护士'
        case '3':
          return '药房'
      }
    },

    refreshView(){
      const DATA={
        username:this.formData2.username,
        phone:this.formData2.phone,
        role:this.formData2.role
      }
      getUserList(DATA).then(res=>{
        this.tableData=res.data
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return

        insertUserOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.username=""
              this.formData.password=""
              this.formData.role=0
              this.formData.phone=""
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
        this.formData.username=data[1]
        this.formData.password=data[2]
        this.formData.role=data[3]
        this.formData.phone=data[4]

      })

      this.title='编辑用户'
      this.addDialog=true
      this.disabled=true
    },
    handleDelete(data){
      delUser({uuid:data[0]}).then(res=>{
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
      this.title='添加用户'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.username=""
        this.formData.password=""
        this.formData.role=0
        this.formData.phone=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
