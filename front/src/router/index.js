import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import RepositoriesView from '../views/RepositoriesView.vue'
import CommitsView from '../views/CommitsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: RepositoriesView
  },
  {
    path: '/commits/:repoName',
    name: 'CommitsView',
    component: () => import('@/views/CommitsView.vue'),
    props: true  
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
