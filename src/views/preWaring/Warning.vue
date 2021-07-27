<template>
<div class="app-container">

<el-form :inline="true" class="demo-form-inline">
   <!-- <el-form-item>
      <el-input  v-model="searchObj.homeId" placeholder="家庭编号"/>
   </el-form-item>
   <el-form-item>
      <el-input v-model="searchObj.id" placeholder="提交编号"/>
   </el-form-item> -->
    <!-- <el-form-item>
      <el-input v-model="searchObj.riskLevel" placeholder="安全状态"/>
   </el-form-item> -->
    <el-form-item >
    <el-select v-model="searchObj.warning" placeholder="请选择处理状态">
      <el-option label="风险已处理" value="0"></el-option>
      <el-option label="风险未处理" value="1"></el-option>
    </el-select>
  </el-form-item>
   <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
</el-form>

<!-- 工具条 -->
<div>
   <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
</div>

<!-- banner列表 -->
<el-table
:data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"/>
    <el-table-column type="index" label="序号" width="50"/>
    <el-table-column prop="id" label="提交编号"/>
    <el-table-column prop="homeId" label="家庭编号" width="200"/>
    <!-- <el-table-column prop="current" label="电流"/>
    <el-table-column prop="voltage" label="电压"/>
    <el-table-column prop="kitchenLineTemperature" label="厨房温度"/>
    <el-table-column prop="bedroomLineTemperature" label="卧室温度"/>
    <el-table-column prop="restroomLineTemperature" label="休息室温度"/>
    <el-table-column prop="livingRoomLineTemperature" label="客厅温度"/>
    <el-table-column prop="riskInfo" label="风险信息" width="100"/> -->
    <el-table-column prop="warning" label="风险情况"/>
    <el-table-column prop="createTime" label="创建时间" width="100"/>
    <el-table-column prop="updateTime" label="更新时间" width="100"/>
    <el-table-column label="风险状态" width="80">
        <template slot-scope="scope">
            {{ scope.row.warning == 1 ? '不安全' : '安全' }}
        </template>
    </el-table-column>

    <el-table-column label="操作" width="480" align="center">
        <template slot-scope="scope">
            <el-button type="danger" size="mini" 
                icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
            <el-button v-if="scope.row.warning == 1" type="primary" size="mini" 
                icon="el-icon-delete" @click="lockWarning(scope.row.id,0)">恢复安全</el-button>
            <el-button v-if="scope.row.warning == 0" type="danger" size="mini" 
                icon="el-icon-delete" @click="lockWarning(scope.row.id,1)">设置警报</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="toRescue(scope.row.id)">电路信息</el-button>
            <router-link :to="'/preHelp/'+scope.row.id">
               <el-button type="primary" size="mini" icon="el-icon-edit">辅助决策</el-button>
            </router-link>
            <!-- <router-link :to="'http://localhost:8080/draw/index.html/'+scope.row.id">
               
            </router-link> -->
        </template>
    </el-table-column>

</el-table>
    <!-- 分页 -->
    <el-pagination
    :current-page="current"
    :page-size="limit"
    :total="total"
    style="padding: 30px 0; text-align: center;"
    layout="total, prev, pager, next, jumper"
    @current-change="getList"
    />

</div>
</template>

<script>
//引入接口定义的js文件
import warnings from '@/api/warning'

export default {
    data(){
        return {
            current:1,//当前页
            limit:5,//每页显示的记录对象
            searchObj:{},//条件封装对象
            list:[], //每页数据集合
            total:0,
            //url: 'http://localhost:8080/draw/index.html',
            url: ' http://127.0.0.1:8080/draw/index.html',
            multipleSelection:[] //批量选择中选择的记录列表
        }

    },
    created() { //在数据渲染之前
    //    this.searchObj.riskLevel = 1
    //    this.getList()
          this.getList2()
    },
    methods: {//定义方法，进行请求接口的调用
     toRescue(id) {
        window.location.href = this.url;
        //window.open(`/static/index.html`);
      },
        lockWarning(id,warning){
            warnings.lockWarning(id,warning)
             .then(response => {
                            //刷新页面
                            this.getList(1)
                        })
        },
        getList2(page=1) {
            this.current = page
            this.searchObj.warning = 1
            warnings.getWarningList(this.current,this.limit,this.searchObj)
            .then(response => { //response是接口返回数据
            this.list = response.data.records
            this.total = response.data.total
            console.log(response)
            })//请求成功调用
            .catch(error => {
                console.log(error)
            })//请求失败调用
        },
        //消防提交列表：
        getList(page=1) {
            this.current = page
            warnings.getWarningList(this.current,this.limit,this.searchObj)
            .then(response => { //response是接口返回数据
            this.list = response.data.records
            this.total = response.data.total
            console.log(response)
            })//请求成功调用
            .catch(error => {
                console.log(error)
            })//请求失败调用
        },
        //删除医院设置的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除数据信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => { //确定执行then方法
                    //调用接口
                    warnings.deleteWarning(id)
                        .then(response => {
                            //提示
                            this.$message({
                            type: 'success',
                            message: '删除成功!'
                            })
                            //刷新页面
                            this.getList(1)
                        })
            })
        },
        handleSelectionChange(selection) {
             this.multipleSelection = selection
             console.log(selection)
        },
        //批量删除
        removeRows() {
            this.$confirm('此操作将删除设备提交信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => { //确定执行then方法
                var idList = []
                //遍历数组得到每个id值，设置到idList里面
                for(var i=0;i<this.multipleSelection.length;i++) {
                    var obj = this.multipleSelection[i]
                    var id = obj.id
                    idList.push(id)
                }
                //调用接口
                warnings.batchdeleteWarningList(idList)
                    .then(response => {
                        //提示
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        })
                        //刷新页面
                        this.getList(1)
                    })
            })
        }

    }
}
</script>
