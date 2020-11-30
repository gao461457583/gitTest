import Vue from 'vue'
import Router from 'vue-router'
//引入仓库
import store from "../store/index"

Vue.use(Router)

//封装路由守卫
function changeEnter(path,next) {
  // 取出你可以去的地址
  let menus_url = store.state.userInfo.menus_url
  if (menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
}

export const indexRouters = [
  {
    path: "menu",
    name: "菜单管理",
    component: () => import("../page/menu/menu.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/menu",next)
    }, 
  },

  {
    path: "role",
    name: "角色管理",
    component: () => import("../page/role/role.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/role",next)
    },
  },

  {
    path: "manage",
    name: "管理员管理",
    component: () => import("../page/manage/manage.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/manage",next)
    },
  },
  {
    path: "cate",
    name: "商品分类",
    component: () => import("../page/cate/cate.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/cate",next)
    },
  },
  {
    path: "specs",
    name: "商品规格",
    component: () => import("../page/specs/specs.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/specs",next)
    },
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../page/goods/goods.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/goods",next)
    },
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import("../page/member/member.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/member",next)
    },
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../page/banner/banner.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/banner",next)
    },
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import("../page/seckill/seckill.vue"),
    //设置路由守卫
    beforeEnter: (to, from, next) => {
      changeEnter("/seckill",next)
    },
  },
]


let router=new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../page/login/login.vue")
    },
    {
      path: "",
      component: () => import("../page/index/index.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../page/home/home.vue")
        },
        //菜单添加及修改
        {
          path: "info",
          component: () => import("../page/menu/info.vue")
        },
        {
          path: "/info/:id",
          component: () => import("../page/menu/info.vue")
        },
        //角色添加及修改
        {
          path:"/roleInfo",
          component:()=>import("../page/role/roleInfo.vue")
        },
        {
          path:"/roleInfo/:id",
          component:()=>import("../page/role/roleInfo.vue")
        },
        //管理元添加及修改
        {
          path:"/manageInfo",
          component:()=>import("../page/manage/manageInfo.vue")
        },
        {
          path:"/manageInfo/:uid",
          component:()=>import("../page/manage/manageInfo.vue")
        },
        //商品分类添加及修改
        {
          path:"/cateInfo",
          component:()=>import("../page/cate/cateInfo.vue")
        },
        {
          path:"/cateInfo/:id",
          component:()=>import("../page/cate/cateInfo.vue")
        },
        //商品规格添加及修改
        {
          path:"/specsInfo",
          component:()=>import("../page/specs/specsInfo.vue")
        },
        {
          path:"/specsInfo/:id",
          component:()=>import("../page/specs/specsInfo.vue")
        },
         //商品管理添加及修改
         {
          path:"/goodsInfo",
          component:()=>import("../page/goods/goodsInfo.vue")
        },
        {
          path:"/goodsInfo/:id",
          component:()=>import("../page/goods/goodsInfo.vue")
        },
         //会员管理添加及修改
         {
          path:"/memberInfo",
          component:()=>import("../page/member/memberInfo.vue")
        },
        {
          path:"/memberInfo/:uid",
          component:()=>import("../page/member/memberInfo.vue")
        },
         //轮播图添加及修改
         {
          path:"/bannerInfo",
          component:()=>import("../page/banner/bannerInfo.vue")
        },
        {
          path:"/bannerInfo/:id",
          component:()=>import("../page/banner/bannerInfo.vue")
        },
        ...indexRouters
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  //如果去的是login
  if(to.path=="/login"){
    next()
    return
  }
  //如果去的不是login,验证仓库里面是否存在token,如果存在 则已登陆
  if(store.state.userInfo.token){
    next()
    return
  }
  //去的既不是login，也不存在token，强行跳转到login
  next("/login")
  
})

export default router