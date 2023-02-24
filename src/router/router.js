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
import Teacher from '@/pages/Teacher.vue'
import ForView from '@/pages/ForView.vue'
import Catalog from '@/pages/Catalog.vue'
import Category from '@/pages/Category.vue'
import SubCategory from '@/pages/SubCategory.vue'
import Lecture from '@/pages/Lecture.vue'
import Policy from '@/pages/Policy.vue'
import NotFound from '@/pages/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
		// meta: {
    //   scrollPos: {
    //     top: 0,
    //     left: 0,
    //   },
    // },
  },
	{
    path: '/policy/',
    name: 'policy',
    component: Policy
  },
	{
    path: '/catalog/',
    name: 'catalog',
    component: Catalog
  },
	{
    path: '/catalog/category/',
    name: 'category',
    component: Category
  },
	{
    path: '/catalog/category/subcategory/',
    name: 'subcategory',
    component: SubCategory
  },
	{
    path: '/catalog/lecture/',
    name: 'lecture',
    component: Lecture
  },
	{
    path: '/profile/',
    name: 'profile',
    component: Profile,
  },
	{
    path: '/profile/saved/',
    name: 'saved',
    component: ProfileSaved
  },
	{
    path: '/profile/bought/',
    name: 'bought',
    component: ProfileBought
  },
	{
    path: '/profile/viewed/',
    name: 'viewed',
    component: ProfileViewed
  },
	{
    path: '/profile/help/',
    name: 'help',
    component: ProfileHelp
  },
	{
    path: '/profile/about/',
    name: 'about',
    component: ProfileAbout
  },
	{
    path: '/profile/edit/',
    name: 'edit',
    component: ProfileEdit
  },

	{
    path: '/speakers/',
    name: 'speakers',
    component: Teachers
  },
	{
    path: '/speakers/speaker/',
    name: 'speaker',
    component: Teacher
  },
	{
    path: '/forview/',
    name: 'forview',
    component: ForView
  },
	{
		path: "/:catchAll(.*)",
		component: NotFound,
	},

	
]


// const scrollBehavior = (to, from, savedPosition) => {
//   if (to.name === from.name) {
//     to.meta?.scrollPos && (to.meta.scrollPos.top = 0)
//     return { left: 0, top: 0 }
//   }
//   const scrollpos = savedPosition || to.meta?.scrollPos || { left: 0, top: 0 }
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(scrollpos)
//     }, 600)
//   })
// }



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
	scrollBehavior(to, from, savedPosition) {
		console.log(to.path);
      return {
				top: 0,
        // el: '#homeContainer',
				behavior: 'smooth',
      }
  },
})


// router.beforeEach((to, from, next) => {
//   from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY)
//   return next()
// })

export default router
