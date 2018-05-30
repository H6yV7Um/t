import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/common/Header'
import ProjectList from '@/components/project/List'
import ProjectAdd from '@/components/project/EditAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/projects',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/project/add',
      name: 'ProjectAdd',
      component: ProjectAdd
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    }
  ]
})
