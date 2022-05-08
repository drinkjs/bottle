import { createRouter, createWebHistory } from "vue-router";
import Hello from "../components/HelloWorld.vue"

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:"/home", 
      component: Hello
    }
  ]
})

export default router;