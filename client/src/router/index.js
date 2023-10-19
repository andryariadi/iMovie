import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import MyBookmark from '../views/Mybookmark.vue'
import DetailMovie from '../views/DetailMovie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: MyBookmark
    },
    {
      path: '/movies/:id',
      name: 'detailmovie',
      component: DetailMovie
    }
  ]
})

let isAuthenticated = false

router.beforeEach((to, from, next) => {
  if (localStorage.access_token) {
    isAuthenticated = true
  } else {
    isAuthenticated = false
  }

  if (to.name === 'bookmark' && !isAuthenticated) {
    next({ path: '/login' })
  } else if (
    (to.name === 'login' && isAuthenticated) ||
    (to.name === 'register' && isAuthenticated)
  ) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
