import Vue from 'vue'
import VueRouter from 'vue-router'

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import ScenicDetail from '../components/ScenicDetail.vue'
import Search from '../components/Search.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Personal from '../components/PersonalInformation.vue'
import  TabNav from '../components/tabNav.vue'
import AccountNumber from '../components/AccountNumber.vue'
import Footprint from '../components/Footprint.vue'
import Collection from '../components/Collection.vue'
import Note from '../components/Note.vue'
import Release from '../components/release.vue'
import Edit from '../components/Edit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/main',
    component: TabNav,
    children: [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine')
  },
  {
    path: '/find',
    name: 'find',
    component: () => import('@/views/find')
  },
  {
    path: '/circle',
    name: 'circle',
    component: () => import('@/views/circle')
  }]
  },
  {
    path: '/scenicdetail',
    name: 'ScenicDetail',
    component: ScenicDetail
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path:'/accountnumber',
    name: 'AccountNumber',
    component: AccountNumber
  },
  {
    path: '/footprint',
    name: 'Footprint',
    component: Footprint
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/note',
    name: 'Note',
    component: Note
  },
  {
    path: '/release',
    name: 'Release',
    component: Release
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') { //如果要去的页面是登录页面，就进行下一步，不做判断
    next()
  } else if (to.name == 'home' || to.name=='Register') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
        alert('请先登录');
        router.push({name:'Login'});
    }
  }
})
export default router
