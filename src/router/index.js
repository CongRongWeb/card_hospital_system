// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */

import userManagement from "../views/userManagement/index"
import sectionManagement from "../views/sectionManagement/index"
import doctorManagement from "../views/doctorManagement/index.vue";
import nurseManagement from "../views/nurseManagement/index.vue";
import medicineManagement from "../views/medicineManagement/index.vue";
import patientManagement from "../views/patientManagement/index.vue";
import register from "../views/register/index.vue";
import chargeRecord from "../views/chargeRecord/index.vue";
import payRecord from "../views/payRecord/index.vue";
import patientMedicine from "../views/patientMedicine/index.vue"
import chufangManagement from "../views/chufangManagement/index.vue";
import patientVisit from "../views/patientVisit/index.vue";
// 启用路由
Vue.use(Router);

// 导出路由
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/userManagement',
            name: '用户管理',
            component: userManagement,
            meta: {
                requireAuth: true
            }
        },{
            path: '/sectionManagement',
            name: '科室管理',
            component: sectionManagement,
            meta: {
                requireAuth: true
            }
        },{
          path: '/doctorManagement',
          name: '医生管理',
          component: doctorManagement,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/nurseManagement',
          name: '护士管理',
          component: nurseManagement,
          meta: {
            requireAuth: true
          }
        }, {
            path: '/medicineManagement',
            name: '药品管理',
            component:medicineManagement,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/patientManagement',
            name: '患者管理',
            component: patientManagement,
            meta: {
                requireAuth: true
            }
        }, {
          path: '/chufangManagement',
          name: '处方管理',
          component: chufangManagement,
          meta: {
            requireAuth: true
          }
        }, {
            path: '/register',
            name: '挂号',
            component: register,
            meta: {
                requireAuth: true
            }
        },
          {
            path: '/chargeRecord',
            name: '卡内充值',
            component: chargeRecord,
            meta: {
              requireAuth: true
            }
          }, {
            path: '/payRecord',
            name: '收费中心',
            component: payRecord,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/patientMedicine',
            name: '患者用药',
            component: patientMedicine,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/patientvisit',
            name: '患者就诊记录',
            component: patientVisit,
            meta: {
              requireAuth: true
            }
          }

        ]
    }]
})
