import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Profile from '@/pages/Profile.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
	{
    path: '/',
    name: 'profile',
    component: Profile
  },
  {
    path: '/about',
    name: 'about',
		component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
