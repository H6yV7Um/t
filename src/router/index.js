import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/common/Header'
import ProjectList from '@/components/project/List'
import ProjectEdit from '@/components/project/Edit'

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
      component: ProjectEdit
    },
    {
      path: '/project/edit',
      name: 'ProjectEdit',
      component: ProjectEdit
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    }
  ]
})
