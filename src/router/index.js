import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '@/config/firebase.js'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
          requiereAutenticacion: true
        }
    },
    {
        path: '/',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    {
        path: '/registro',
        name: 'Registro',
        component: () =>
            import ( /* webpackChunkName: "Registro" */ '../views/Registro.vue')
    },
    {
        path: '/administracion',
        name: 'Administracion',
        component: () =>
            import ( /* webpackChunkName: "Administracion" */ '../views/Administracion.vue'),
        meta:{
        requiereAutenticacion: true
      }
    },

    {
        path: '/*',
        redirect: {
            name: 'Login'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
  const valorRequiereAutenticacion = to.matched.some(route => route.meta.requiereAutenticacion)

  if (valorRequiereAutenticacion && !auth.currentUser) {
    next('login')
  }

  else {
    next()
  }

})

export default router
