import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Test1 from '@/components/test1'
import Test2 from '@/components/test2'
import Address from '@/components/address'
// import JavaScript from '@/components/JavaScript'
// import FrontEnd from '@/components/FrontEnd'
// import PersonalLog from '@/components/PersonalLog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Test1',
      component:Test1
    },
    {
      path:'/test1',
      name:'Test1',
      component:Test1
    },
    {
      path:'/test2',
      name:'Test2',
      component:Test2,
    },
    {
      path:'/address',
      name:'Address',
      component:Address,
    }
  ]
})
