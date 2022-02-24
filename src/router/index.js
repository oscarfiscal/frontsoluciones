import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home/";
import Mascota from "@/views/Home/Mascota";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/mascota",
    name: "Mascota",
    component: Mascota,
 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
