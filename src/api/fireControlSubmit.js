import request from '@/utils/request'

export default {
    getFireControlSubmitList(current,limit,searchObj){
        return request({
            url: `/admin/firecontrol/fireControlSubmitSet/findPageFireControlSubmit/${current}/${limit}`,
            method: 'post',
            data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //更具homeId删除对应的提交数据
    deleteFireControlSubmit(id){
        return request({
            url: `/admin/firecontrol/fireControlSubmitSet/${id}`,
            method: 'delete',
            //data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    //批量删除
    batchdeleteFireControlSubmit(idList){
        return request({
            url: `/admin/firecontrol/fireControlSubmitSet/batchRemoveFireControlSubmit/`,
            method: 'delete',
            data:  idList   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    },
    lockFireControlSubmit(id,riskLevel){
        return request({
            url: `/admin/firecontrol/fireControlSubmitSet/lockFireControlSubmit/${id}/${riskLevel}`,
            method: 'put'
            //data:  idList   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    }

}