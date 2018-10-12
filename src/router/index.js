import Vue from 'vue'
import Router from 'vue-router'
// ----------- FRONT -------------- //
import FrontLayout from '../components/front/FrontLayout'
import Portfolio from '../components/front/Portfolio'
import Project from '../components/front/ProjectShow'
import Articles from '../components/front/Articles'
import ArticleShow from '../components/front/ArticleShow'
import About from '../components/front/About'
import Contact from '../components/front/Contact'
import Landing from '../components/front/Landing'
// --------- ADMIN ---------------- //
import AdminLayout from '../components/admin/AdminLayout'
import Dashboard from '../components/admin/Dashboard'
import ArticlesList from '../components/admin/articles/Articles'
import ArticleNew from '../components/admin/articles/ArticleNew'
import ArticleEdit from '../components/admin/articles/ArticleEdit'
// --------- OTHERS --------------- //
import NotFound from '../components/NotFound'
import NotAllowed from '../components/NotAllowed'
import Login from '../components/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: 'blog',
          component: Articles
        },
        {
          path: 'article/:slug',
          component: ArticleShow
        },
        {
          path: 'portfolio',
          component: Portfolio
        },
        {
          path: 'project/:slug',
          alias: 'projet/:slug',
          component: Project
        },
        {
          path: 'about',
          alias: 'a-propos',
          component: About
        },
        {
          path: 'contact',
          component: Contact
        },
        {
          path: '',
          component: Landing
        }
      ]
    },

    {
      path: '/admin',
      component: AdminLayout,
      name: 'admin',
      children: [
        {
          name: 'Dashboard',
          path: '',
          component: Dashboard,
          meta: {
            title: 'Dashboard',
            breadcrumb: [
              'Dashboard'
            ]
          }
        },
        {
          name: 'All articles',
          path: 'articles',
          component: ArticlesList,
          meta: {
            title: 'All articles',
            breadcrumb: [
              'Dashboard',
              'All articles'
            ]
          }
        },
        {
          name: 'New Article',
          path: 'article/new',
          component: ArticleNew,
          meta: {
            title: 'New article',
            breadcrumb: [
              'Dashboard',
              'All articles',
              'New article'
            ]
          }
        },
        {
          name: 'Edit Article',
          path: 'article/edit/:slug',
          component: ArticleEdit,
          meta: {title: 'Edit article'}
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/503',
      component: NotAllowed
    },
    {
      path: '/404',
      component: NotFound,
      alias: '*'
    }
  ]
})
