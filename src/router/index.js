import Vue from 'vue'
import Router from 'vue-router'
// ----------- FRONT -------------- //
import FrontLayout from '../components/front/FrontLayout'
import Portfolio from '../components/front/Portfolio'
import Project from '../components/front/ProjectShow'
import Articles from '../components/front/Articles/Articles'
import ArticleShow from '../components/front/Articles/ArticleShow'
import About from '../components/front/About'
import Contact from '../components/front/Contact'
import Landing from '../components/front/Landing'
import TagList from '../components/front/TagList'
import ShowTag from '../components/front/ShowTag'
// --------- ADMIN ---------------- //
import AdminLayout from '../components/admin/AdminLayout'
import Tags from '../components/admin/Tags'
import Dashboard from '../components/admin/Dashboard'
import Messages from '../components/admin/Messages'
import ArticlesList from '../components/admin/articles/Articles'
import BOArticle from '../components/admin/articles/Article'
import ArticleNew from '../components/admin/articles/ArticleNew'
import ArticleEdit from '../components/admin/articles/ArticleEdit'
import ProjectShow from '../components/admin/portfolio/Project'
import Projects from '../components/admin/portfolio/Projects'
import ProjectNew from '../components/admin/portfolio/ProjectNew'
import ProjectEdit from '../components/admin/portfolio/ProjectEdit'
import Comments from '../components/admin/Comments'
import EditSettings from '../components/admin/Settings'
import UserSettings from '../components/admin/UserSettings'
// --------- OTHERS --------------- //
import NotFound from '../components/front/Errors/NotFound'
import NotAllowed from '../components/front/Errors/NotAllowed'
import Login from '../components/auth/Login'
import LegalNotice from '../components/front/LegalNotice'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          name: 'blog-index',
          path: 'blog',
          component: Articles
        },
        {
          name: 'blog-show',
          path: 'article/:slug',
          component: ArticleShow
        },
        {
          name: 'portfolio',
          path: 'portfolio',
          component: Portfolio
        },
        {
          name: 'portfolio-show',
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
        },
        {
          path: '/legal-notice',
          alias: '/mentions-legales',
          component: LegalNotice
        }
      ]
    },

    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          name: 'Dashboard',
          path: '',
          component: Dashboard,
          meta: {
            title: 'Dashboard',
            breadcrumb: []
          }
        },
        {
          name: 'Messages',
          path: 'messages',
          component: Messages,
          meta: {
            title: 'Messages',
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
              'All articles'
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
          component: BOArticle,
          meta: {
            breadcrumb: [
              'Dashboard',
              'All articles'
            ]
          }
        },
        {
          name: 'All comments',
          path: 'comments',
          component: Comments,
          meta: {
            breadcrumb: [
              'Dashboard'
            ]
          }
        },
        {
          name: 'Portfolio',
          path: 'portfolio',
          component: Projects,
          meta: {
            breadcrumb: [
              'Dashboard',
              'Portfolio'
            ]
          }
        },
        {
          name: 'New project',
          path: 'project/new',
          component: ProjectNew,
          meta: {
            breadcrumb: [
              'Dashboard',
              'Portfolio',
              'New project'
            ]
          }
        },
        {
          name: 'Show Project',
          path: 'project/:slug',
          component: ProjectShow,
          meta: {
            breadcrumb: [
              'Dashboard',
              'Portfolio'
            ]
          }
        },
        {
          name: 'Edit Project',
          path: 'project/edit/:slug',
          component: ProjectEdit,
          meta: {
            breadcrumb: [
              'Dashboard',
              'Portfolio'
            ]
          }
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
