import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'

import ProfileSaved from '@/pages/ProfileSaved.vue'
import ProfileBought from '@/pages/ProfileBought.vue'
import ProfileViewed from '@/pages/ProfileViewed.vue'
import ProfileHelp from '@/pages/ProfileHelp.vue'
import ProfileNotifications from '@/pages/ProfileNotifications.vue'
import ProfilePartner from '@/pages/ProfilePartner.vue'
import ProfileAbout from '@/pages/ProfileAbout.vue'
import ProfileSupport from '@/pages/ProfileSupport.vue'
import ProfileSupportRequest from '@/pages/ProfileSupportRequest.vue'
import ProfileSupportNew from '@/pages/ProfileSupportNew.vue'

import ProfileEdit from '@/pages/ProfileEdit.vue'

import Teachers from '@/pages/Teachers.vue'
import Teacher from '@/pages/Teacher.vue'
import ForView from '@/pages/ForView.vue'
import Promopack from '@/pages/Promopack.vue'
import Catalog from '@/pages/Catalog.vue'
import Category from '@/pages/Category.vue'
import SubCategory from '@/pages/SubCategory.vue'
import Lecture from '@/pages/Lecture.vue'
import Policy from '@/pages/Policy.vue'
import Form from '@/pages/Form.vue'
import Prices from '@/pages/Prices.vue'
import CatalogPrices from '@/pages/CatalogPrices.vue'
import CategoryPrices from '@/pages/CategoryPrices.vue'
import SubcategoryPrices from '@/pages/SubcategoryPrices.vue'
import PromopackPrices from '@/pages/PromopackPrices.vue'
import Faq from '@/pages/Faq.vue'
import NotFound from '@/pages/NotFound.vue'
import InAuth from '@/pages/InAuth.vue'


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
    path: '/form/',
    name: 'form',
    component: Form
  },
	{
    path: '/prices/',
    name: 'prices',
    component: Prices
  },
	{
    path: '/catalog_prices/',
    name: 'catalog_prices',
    component: CatalogPrices
  },
	{
    path: '/category_prices/',
    name: 'category_prices',
    component: CategoryPrices
  },
	{
    path: '/subcategory_prices/',
    name: 'subcategory_prices',
    component: SubcategoryPrices
  },
	{
    path: '/promopack_prices/',
    name: 'promopack_prices',
    component: PromopackPrices
  },
	{
    path: '/profile/help/question',
    name: 'faq',
    component: Faq
  },
	{
    path: '/catalog/',
    name: 'catalog',
    component: Catalog
  },
	{
    path: '/register',
    name: 'inauth',
    component: InAuth
  },
	{
    path: '/catalog/:slug',
    component: Category
  },
	{
    path: '/catalog/:parent_slug/:slug',
		// props: {id: id},
    name: 'subcategory',
    component: SubCategory
  },
	{
    path: '/videos/:id',
    name: 'lecture',
    component: Lecture,
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
    path: '/profile/support/',
    name: 'support',
    component: ProfileSupport
  },
	{
    path: '/profile/support/:id',
    name: 'request',
    component: ProfileSupportRequest
  },
	{
    path: '/profile/support/new',
    name: 'newrequest',
    component: ProfileSupportNew
  },
	{
    path: '/profile/notifications/',
    name: 'notifications',
    component: ProfileNotifications
  },
	{
    path: '/profile/partner/',
    name: 'partner',
    component: ProfilePartner
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
    path: '/lectors/',
    name: 'lectors',
    component: Teachers
  },
	{
    path: '/lectors/:id/',
    name: 'lector',
    component: Teacher
  },
	{
    path: '/forview/',
    name: 'forview',
    component: ForView
  },
	{
    path: '/promopack/',
    name: 'promopack',
    component: Promopack
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
		// console.log(to.path);
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
