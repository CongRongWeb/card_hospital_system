/**
* 左边菜单
*/
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuname">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 管理员菜单
    let res = {
      success: true,
      data: [
        {
          menuname: '院内人员管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuname: '院内人员管理',
              hasThird: 'N',
              url: 'userManagement',
              menus: null
            }
          ]
        },
        {
          menuname: '医院系统',
          hasThird: null,
          url: null,
          menus: [
            {
              menuname: '挂号中心',
              hasThird: 'N',
              url: 'register',
              menus: null
            },
            {
              menuname: '科室管理',
              hasThird: 'N',
              url: 'sectionManagement',
              menus: null
            },
            {
              menuname: '医生管理',
              hasThird: 'N',
              url: 'doctorManagement',
              menus: null
            },
            {
              menuname: '护士管理',
              hasThird: 'N',
              url: 'nurseManagement',
              menus: null
            },
            {
              menuname: '药品管理',
              hasThird: 'N',
              url: 'medicineManagement',
              menus: null
            },
            {
              menuname: '患者管理',
              hasThird: 'N',
              url: 'patientManagement',
              menus: null
            },{
              menuname: '患者就诊记录',
              hasThird: 'N',
              url: 'patientvisit',
              menus: null
            },
            {
              menuname: '处方管理',
              hasThird: 'N',
              url: 'chufangManagement',
              menus: null
            },
            // {
            //   menuname: '患者用药',
            //   hasThird: 'N',
            //   url: 'patientMedicine',
            //   menus: null
            // },
            {
              menuname: '缴费记录',
              hasThird: 'N',
              url: 'chargeRecord',
              menus: null
            },
            {
              menuname: '收费中心',
              hasThird: 'N',
              url: 'payRecord',
              menus: null
            }
          ]
        }
      ],
      msg: 'success'
    }


    // 医生菜单
    let resSecond = {
      success: true,
      data: [{
          menuname: '医院系统',
          hasThird: null,
          url: null,
          menus: [
            {
              menuname: '患者信息',
              hasThird: 'N',
              url: 'patientManagement',
              menus: null
            },
            {
              menuname: '处方管理',
              hasThird: 'N',
              url: 'chufangManagement',
              menus: null
            },
            // {
            //   menuname: '患者用药',
            //   hasThird: 'N',
            //   url: 'patientMedicine',
            //   menus: null
            // }
          ]
        }
      ],
      msg: 'success'
    }

    // 药房菜单
    let resThird = {
      success: true,
      data: [
        {
          menuname: '医院系统',
          hasThird: null,
          url: null,
          menus: [
            {
              menuname: '药品管理',
              hasThird: 'N',
              url: 'medicineManagement',
              menus: null
            },
            {
              menuname: '处方管理',
              hasThird: 'N',
              url: 'chufangManagement',
              menus: null
            },
          ]
        }
      ],
      msg: 'success'
    }
    if(this.$store.uutype=='0'){
      this.allmenu = res.data
    }
    //护士
/*    else if (this.$store.uutype=='2'){
      this.allmenu = resSecond.data
    }*/
    //医生
    else if (this.$store.uutype=='1'){
      this.allmenu = resSecond.data
      //药房
    }else if (this.$store.uutype=='3'){
      this.allmenu = resThird.data
    }else{
      this.$router.push({ path: '/' })
      //this.$message.error('请重新登录！')
    }
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>
