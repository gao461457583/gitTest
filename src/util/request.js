import axios from "axios"
import qs from "qs"
import Vue from "vue"
//开发环境
let baseUrl="/api"
Vue.prototype.$imgUrl="http://localhost:3000"

//上线环境
// let baseUrl=""
// Vue.prototype.$imgUrl=""

//相应拦截
axios.interceptors.response.use(res=>{
    console.group("=======本次请求的路:"+res.config.url);
    console.log(res);
    console.groupEnd("请求结束");
    return res
})
// ==========MENU========================================
//菜单添加
export const menuAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:"post",
        data:qs.stringify(form)
    })
}

//菜单列表
export const remenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}

//删除菜单
export const delMenu=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
//获取一条菜单信息
export const getInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改menu
export const editInfo=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}
//=======================role=================
//添加role
export const addRole=(form)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(form)
    })
}
//获取role列表
export const roleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
        
    })
}
//删除role
export const delRole=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
//获取一条role信息
export const getRoleInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改role
export const editRoleInfo=(form)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(form)
    })
}
//===================manage=============
//添加role
export const addManage=(form)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(form)
    })
}
//获取manage列表
export const manageList=(size,page)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:{
            size,
            page
        }
    })
}
//删除manage
export const delManage=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify({uid:uid})
    })
}
//修改manage
export const editManageInfo=(form)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(form)
    })
}
//获取一条manage信息
export const getManageInfo=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}
//管理员管理------分页
//计算总条目数
export const total=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get",
        
    })
}
//=============商品分类===========
//商品分类添加
export const addCate=(form)=>{
    let data=new FormData()
    // data.append("pid",1)
    for(let i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:data
    })
}
//获取商品分类列表
export const cateList=({pid:pid})=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:{
            istree:true,
            pid:pid
        }
    })
}
//删除商品分类
export const delCate=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
//获取一条商品分类信息
export const getCateInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改cate
export const editCateInfo=(form)=>{
    let data=new FormData()
    // data.append("pid",1)
    for(let i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:data
    })
}
//=================商品规格==============
//添加
export const addSpecs=(form)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(form)
    })
}
//获取商品规格列表
export const specsList=(size,page)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:{
            size:size,
            page:page
        }
    })
}
//删除商品规格
export const delSpecs=(id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
//获取一条specs信息
export const getSpecsInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改specs
export const editSpecsInfo=(form)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(form)
    })
}
//==============商品管理============
//请求列表
export const goodsList=(form)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:form
    })
}
//商品分类添加
export const addGoods=(form)=>{
    let data=new FormData()
    // data.append("pid",1)
    for(let i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:data
    })
}
//删除
export const delGoods=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
//获取一条goods信息
export const getGoodsInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改goods
export const editGoodsInfo=(form)=>{
    let data=new FormData()
    // data.append("pid",1)
    for(let i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:data
    })
}


