import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

// export default {
//     getFireControlSetList(){
//         return Request({
//             url: '/admin/firecontrol/firecontrolSet/',
//             method: 'get',
//             params        
//         })
//     }
// }
export default {
    getFireControlSetList(searchObj){
        return Request({
            url: '/admin/firecontrol/firecontrolSet/findAll',
            method: 'post',
            data:  searchObj   //使用json形式传输对象
            //param        不使用json形式传递的方法

        })
    }
}