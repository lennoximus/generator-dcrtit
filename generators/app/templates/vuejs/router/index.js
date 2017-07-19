import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../components/App.vue'<% for(let i=0; i<pages.length; i++) {%><% var str = `../components/pages/${pages[i]}.vue`%>
import <%= pages[i] %> from '<%= str %>' <% } %>

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/', component: App,
      children: []
    }
  ]
})

export default router
