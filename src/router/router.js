import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'

import ProfileSaved from '@/pages/ProfileSaved.vue'
import ProfileBought from '@/pages/ProfileBought.vue'
import ProfileViewed from '@/pages/ProfileViewed.vue'
import ProfileHelp from '@/pages/ProfileHelp.vue'
import ProfileAbout from '@/pages/ProfileAbout.vue'

import ProfileEdit from '@/pages/ProfileEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
	{
    path: '/profile',
    name: 'profile',
    component: Profile
  },
	{
    path: '/profile/saved',
    name: 'saved',
    component: ProfileSaved
  },
	{
    path: '/profile/bought',
    name: 'bought',
    component: ProfileBought
  },
	{
    path: '/profile/viewed',
    name: 'viewed',
    component: ProfileViewed
  },
	{
    path: '/profile/help',
    name: 'help',
    component: ProfileHelp
  },
	{
    path: '/profile/about',
    name: 'about',
    component: ProfileAbout
  },
	{
    path: '/edit',
    name: 'edit',
    component: ProfileEdit
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
