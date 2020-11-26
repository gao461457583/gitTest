import {remenuList} from '../../util/request'


const state ={
    menuList:[]
}


const mutations={
    mmenuList(state,arr){
        state.menuList = arr
    }
}


const actions ={
    amenuList(context){
        remenuList().then(res=>{
            context.commit('mmenuList',res.data.list)
        })
    }
}


const getters ={
    gmenuList(state){
        return state.menuList
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    
}