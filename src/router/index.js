import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import login from '@/components/login'
import error404 from '@/components/404'
import index from '@/components/views/index'
import products from '@/components/views/products'
import addproducts from '@/components/views/addproducts'
import orderlist from '@/components/views/orderlist'
import settings from '@/components/views/settings'
import charts from '@/components/views/charts'
import actionLog from '@/components/views/actionLog'
import userManagement from '@/components/views/userManagement'
import userDetail from '@/components/views/userDetail'
import distributionorders from '@/components/views/distributionorders'
import orderdetail from '@/components/views/orderdetail'
import serviceorders from '@/components/views/serviceorders'
import detail from '@/components/views/detail'
import list from '@/components/views/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登陆',
      component: login,
      iconCls: 'el-icon-message', //图标样式class
      hidden: true
    },
    {
      path: '/',
      redirect: '/index',
      name: '导航',
      component: home,
      iconCls: 'el-icon-message', //图标样式class
      leaf: true,//只有一个节点
      children: [
        { path: '/index', component: index, name: '首页' },
        { path: '/list', component: list, name: 'list', hidden: true },
        { path: '/detail', component: detail, name: 'detail', hidden: true}
      ]
    },
    {
      path: '/',
      name: '商品管理',
      component: home,
      iconCls: 'el-icon-goods', 
      children: [
        { path: '/products', component: products, name: '商品列表' },
        { path: '/addProducts', component: addproducts, name: '添加商品'}
      ]
    },
    {
      path: '/',
      name: '订单管理',
      component: home,
      iconCls: 'el-icon-tickets',
      leaf: false,//只有一个节点
      children: [
        { path: '/orderlist', component: orderlist, name: '订单列表' },
        { path: '/orderlist/distributionorders', component: distributionorders, name: '分销订单',hidden: true },
        { path: '/orderlist/orderdetail', component: orderdetail, name: '订单详情', hidden: false },
        { path: '/orderlist/serviceorders', component: serviceorders, name: '订单服务',hidden: true },
      ]
    },
    {
      path: '/',
      name: '用户管理',
      component: home,
      iconCls: 'el-icon-location',
      leaf: true,//只有一个节点
      children: [
        { path: '/userManagement', component: userManagement, name: '用户列表' },
        { path: '/userDetail', component: userDetail, name: '用户详情', hidden: true }
      ]
    },
    {
      path: '/',
      name: '规则设置',
      component: home,
      iconCls: 'el-icon-setting',
      leaf: true,//只有一个节点
      children: [
        { path: '/settings', component: settings, name: '分销规则设置' }
      ]
    },
    {
      path: '/',
      name: '统计',
      component: home,
      iconCls: 'el-icon-picture-outline',
      children: [
        { path: '/charts', component: charts, name: '统计报表' },
        { path: '/log', component: actionLog, name: '操作日志' }
      ]
    },
    {
      path: '*',
      name: '404',
      component: error404,
      iconCls: 'el-icon-message', //图标样式class
      hidden: true
    },
  ]
})
