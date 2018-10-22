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
import TagList from '../components/front/TagList'
import ShowTag from '../components/front/ShowTag'
// --------- ADMIN ---------------- //
import AdminLayout from '../components/admin/AdminLayout'
import Tags from '../components/admin/Tags'
import Dashboard from '../components/admin/Dashboard'
import ArticlesList from '../components/admin/articles/Articles'
import BOArticle from '../components/admin/articles/Article'
import ArticleNew from '../components/admin/articles/ArticleNew'
import ArticleEdit from '../components/admin/articles/ArticleEdit'
import EditSettings from '../components/admin/Settings'
import UserSettings from '../components/admin/UserSettings'
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
        },
        {
          path: 'tags',
          component: TagList
        },
        {
          path: 'tag/:slug',
          component: ShowTag
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
          meta: {
            breadcrumb: [
              'Dashboard',
              'All articles',
              'Edit article'
            ]
          }
        },
        {
          name: 'Show Article',
          path: 'article/:slug',
          component: BOArticle
        },
        {
          name: 'Edit settings',
          path: 'settings',
          component: EditSettings,
          meta: {
            title: 'Edit settings',
            breadcrumb: [
              'Dashboard',
              'Settings'
            ]
          }
        },
        {
          name: 'User settings',
          path: 'user/settings',
          component: UserSettings,
          meta: {
            title: 'User settings',
            breadcrumb: [
              'Dashboard',
              'User settings'
            ]
          }
        },
        {
          name: 'Tags',
          path: 'tags',
          component: Tags,
          meta: {
            title: 'Tag list',
            breadcrumb: [
              'Dashboard',
              'Tags'
            ]
          }
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
