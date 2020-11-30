export const state = {
    //    userInfo:{}
    //  页面刷新，状态层里的数据没了，但是本地存储还有，所以需要对userInfo作处理
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
}
export const mutations = {
    changeUserInfo(state, info) {
        state.userInfo = info

        if (info.id) {
            //如果传的参数中有id，说明是登陆，则在本地存储中也存一份
            sessionStorage.setItem("userInfo", JSON.stringify(info))
        }else{
            //如果传的参数中没有id,说明是退出，清空本地存储
            sessionStorage.removeItem("userInfo")
        }

    }
}
export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}



