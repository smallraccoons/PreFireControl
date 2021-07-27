import request from '@/utils/request'

export default {
    getSubmitNewList(current,limit,searchObj){
        return request({
            url: `/admin/firecontrol/submitNew/findSubmitNew/${current}/${limit}`,
            method: 'post',
            data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //更具homeId删除对应的提交数据
    deleteSubmitNew(id){
        return request({
            url: `/admin/firecontrol/submitNew/remove/${id}`,
            method: 'delete',
            //data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //批量删除
    batchdeleteSubmitNew(idList){
        return request({
            url: `/admin/firecontrol/submitNew/batchRemoveSubmitNew/`,
            method: 'delete',
            data:  idList   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    }
    // lockSubmitNew(id,riskLevel){
    //     return request({
    //         url: `/admin/firecontrol/fireControlSubmitSet/lockFireControlSubmit/${id}/${riskLevel}`,
    //         method: 'put'
    //         //data:  idList   //使用json形式传输对象
    //         //param        不使用json形式传递的方法

    //     })
    // }

}