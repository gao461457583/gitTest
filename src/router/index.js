import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export const indexRouters = [
  {
    path: "menu",
    name: "菜单管理",
    component: () => import("../page/menu/menu.vue"),
  },

  {
    path: "role",
    name: "角色管理",
    component: () => import("../page/role/role.vue")
  },

  {
    path: "manage",
    name: "管理员管理",
    component: () => import("../page/manage/manage.vue")
  },
  {
    path: "cate",
    name: "商品分类",
    component: () => import("../page/cate/cate.vue")
  },
  {
    path: "specs",
    name: "商品规格",
    component: () => import("../page/specs/specs.vue")
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../page/goods/goods.vue")
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import("../page/member/member.vue")
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../page/banner/banner.vue")
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import("../page/seckill/seckill.vue")
  },
]


export default new Router({
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
        ...indexRouters
      ]
    }
  ]
})
