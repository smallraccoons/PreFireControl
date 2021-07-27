import request from '@/utils/request'

export default {

    updateWarning(warning){
        return request({
            url: `/admin/warning/updateWarning`,
            method: 'post',
            data:  userInfo   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    saveUserInfo(warning){
        return request({
            url: `/admin/warning/save`,
            method: 'post',
            data:  warning   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    getWarningList(current,limit,searchObj){
        return request({
            url: `/admin/warning/findPageWarning/${current}/${limit}`,
            method: 'post',
            data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //根据userId删除对应的提交数据
    deleteWarning(id){
        return request({
            url: `/admin/warning/${id}`,
            method: 'delete',
            //data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //批量删除
    batchdeleteWarningList(idList){
        return request({
            url: `/admin/warning/batchRemoveWarning/`,
            method: 'delete',
            data:  idList   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //根据id查询对应信息
    getWarning(id){
        return request ({
            url:`/admin/warning/${id}`,
            method: 'get'
            //data:  idList   //使用json形式传输对象
        })
    },

    lockWarning(id,warning){
        return request({
            url: `/admin/warning/lockWarning/${id}/${warning}`,
            method: 'put'
            //data:  idList   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    }

}