import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/common/Header'
import ProjectList from '@/components/project/List'
import ProjectEdit from '@/components/project/Edit'
import ProjectDetail from '@/components/project/detail'

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
      path: '/:type/project/',
      name: 'ProjectAdd',
      component: ProjectEdit
    },
    {
      path: '/:type/project/:id',
      name: 'ProjectEdit',
      component: ProjectEdit
    },
    {
      path: '/project/:id',
      name: 'ProjectDetail',
      component: ProjectDetail
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    }
  ]
})
