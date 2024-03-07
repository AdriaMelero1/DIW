/* Imports of the components */

import Login from "./Login.js"
import User from  './User.js'

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    //components paths and component name
    {path: "/login", component: Login},
    {path: "/user", component: User}
  ]
});

export default router