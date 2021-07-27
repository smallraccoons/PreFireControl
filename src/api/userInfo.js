import request from '@/utils/request'

export default {

    updateUserInfo(userInfo){
        return request({
            url: `/admin/userInfo/updateUserInfo`,
            method: 'post',
            data:  userInfo   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    saveUserInfo(userInfo){
        return request({
            url: `/admin/userInfo/save`,
            method: 'post',
            data:  userInfo   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    getUserInfoList(current,limit,searchObj){
        return request({
            url: `/admin/userInfo/findPageUserInfo/${current}/${limit}`,
            method: 'post',
            data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //根据userId删除对应的提交数据
    deleteUserInfoList(id){
        return request({
            url: `/admin/userInfo/${id}`,
            method: 'delete',
            //data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //批量删除
    batchdeleteUserInfoList(idList){
        return request({
            url: `/admin/userInfo/batchRemoveUserInfo/`,
            method: 'delete',
            data:  idList   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //根据id查询对应信息
    getUserInfo(id){
        return request ({
            url:`/admin/userInfo/${id}`,
            method: 'get'
            //data:  idList   //使用json形式传输对象
        })
    }


    // lockFireControlSubmit(id,riskLevel){
    //     return request({
    //         url: `/admin/firecontrol/fireControlSubmitSet/lockFireControlSubmit/${id}/${riskLevel}`,
    //         method: 'put'
    //         //data:  idList   //使用json形式传输对象
    //         //param        不使用json形式传递的方法

    //     })
    // }

}