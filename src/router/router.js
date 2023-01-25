import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'

import ProfileSaved from '@/pages/ProfileSaved.vue'
import ProfileBought from '@/pages/ProfileBought.vue'
import ProfileViewed from '@/pages/ProfileViewed.vue'
import ProfileHelp from '@/pages/ProfileHelp.vue'
import ProfileAbout from '@/pages/ProfileAbout.vue'

import ProfileEdit from '@/pages/ProfileEdit.vue'

import Teachers from '@/pages/Teachers.vue'
import ForView from '@/pages/ForView.vue'
import Catalog from '@/pages/Catalog.vue'
import Category from '@/pages/Category.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
	{
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
	{
    path: '/catalog/category',
    name: 'category',
    component: Category
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

	{
    path: '/speakers',
    name: 'speakers',
    component: Teachers
  },
	{
    path: '/forview',
    name: 'forview',
    component: ForView
  },

	
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
