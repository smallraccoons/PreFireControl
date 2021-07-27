import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/fireControlSet',
    component: Layout,
    redirect: '/fireControlSet/submitNew',
    name: '智慧消防设置管理',
    meta: { title: '智慧消防设置管理', icon: 'example' },
    children: [
      // {
      //   path: 'add',
      //   name: '区域状况',
      //   component: () => import('@/views/fireControlSet/add'),
      //   meta: { title: '区域状况', icon: 'table' }
      // },
      {
        path: 'addUser',
        name: '添加用户',
        //设置跳转路径
        component: () => import('@/views/fireControlSet/addUser'),
        meta: { title: '添加用户', icon: 'tree' }
      },
      {
        path: 'addHome',
        name: '添加家庭',
        //设置跳转路径
        component: () => import('@/views/fireControlSet/addHome'),
        meta: { title: '添加家庭', icon: 'tree' }
      },
      {
        path: 'submitNew',
        name: '区域检测信息',
        //设置跳转路径
        component: () => import('@/views/fireControlSet/submitNew'),
        meta: { title: '区域检测信息', icon: 'tree' }
      }
    ]
  },

  {
    path: '/user/userInfo',
    component: Layout,
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: '/user/userInfo/list',
        name: '用户信息列表',
        component: () => import('@/views/user/userInfo/list'),
        meta: { title: '用户信息列表', icon: 'form' }
      },
      {
        path: '/user/userInfo/:id',
        name: '修改用户信息',
        component: () => import('@/views/fireControlSet/addUser'),
        meta: { title: '用户具体信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/warning',
    component: Layout,
    name: '预警与处理',
    meta: { title: '预警信息处理', icon: 'example' },
    children: [
      {
        path: '/waring',
        name: '预警信息',
        component: () => import('@/views/preWaring/Warning'),
        meta: { title: '预警', icon: 'form' }
      },
      // {
      //   path: '/preWaring/preWaring/:id',
      //   name: '电路图',
      //   component: () => import('@/views/circuitDiagram/index'),
      //   meta: { title: '电路图', icon: 'form' }
      // }     
      // {
      //   path: '/preWaring/preWaring/listTest',
      //   name: '测试图1',
      //   component: () => import('@/views/circuitDiagram/listTest'),
      //   meta: { title: '测试图1', icon: 'form' }
      // },
      // {
      //   path: '/preWaring/preWaring/homeView',
      //   name: '测试图2',
      //   component: () => import('@/views/circuitDiagram/home'),
      //   meta: { title: '测试图2', icon: 'form' }
      // }
    ]
  },
  {
    path: '/preHelp',
    component: Layout,
    name: '辅助决策',
    meta: { title: '预警信息处理', icon: 'example' },
    children: [
      {
        path: '/preHelp',
        name: 'Plan',
        component: () => import('@/views/fireControlSet/preHelp'),
        meta: { title: '辅助决策', icon: 'form' }
      },
      {
        path: '/preHelp/:id',
        name: 'Plan',
        component: () => import('@/views/fireControlSet/preHelp'),
        meta: { title: '新增救援', icon: 'form' }
      }
    ]
  },
  {
    path: '/dispatch',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Plan',
        component: () => import('@/views/plan/dispatch'),
        meta: { title: '指挥调度', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
