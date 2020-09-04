import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
Vue.use(VueRouter)
// 解决ele组件点击当前页路由时出错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }, {
    path: '/error',
    name: 'error',
    component: () => import('../views/error.vue')
  }, {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    children: [{
      path: '/setting',
      name: '系统设置',
      component: () => import('../views/setting.vue')
    }, {
      path: '/craft/craftList',
      name: '工艺单列表',
      component: () => import('../views/craft/craftList.vue')
    }, {
      path: '/craft/craftCreate',
      name: '工艺单添加',
      component: () => import('../views/craft/craftCreate.vue')
    }, {
      path: '/craft/craftUpdate/:id',
      name: '工艺单修改',
      component: () => import('../views/craft/craftUpdate.vue')
    }, {
      path: '/craft/craftDetail/:id',
      name: '工艺单详情',
      component: () => import('../views/craft/craftDetail.vue')
    }]
  }, {
    path: '/craftTable/:craftId',
    name: '工艺单打印',
    component: () => import('../views/craft/craftTable.vue')
  }, {
    path: '/craftTableToPDF/:craftId/:colorIndex',
    name: '工艺单打印PDF',
    component: () => import('../views/craft/craftTableToPDF.vue')
  }
]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 获取标题
  store.commit('getTitle', to.name ? to.name : from.name)
  const routerTable = {
    '系统设置': ['织为云', '系统设置'],
    '工艺单列表': ['织为云', '工艺单列表'],
    '工艺单添加': ['织为云', '工艺单列表', '工艺单添加'],
    '工艺单修改': ['织为云', '工艺单列表', '工艺单修改'],
    '工艺单详情': ['织为云', '工艺单列表', '工艺单详情']
  }
  store.commit('getRoute', routerTable[to.name])
  next()
})

export default router
