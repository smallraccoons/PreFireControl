<template>
<div class="app-container">

<el-form :inline="true" class="demo-form-inline">
   <el-form-item>
      <el-input  v-model="searchObj.homeId" placeholder="家庭编号"/>
   </el-form-item>
   <el-form-item>
      <el-input v-model="searchObj.id" placeholder="提交编号"/>
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
    <el-table-column prop="temperature1" label="温度1"/>
    <el-table-column prop="temperature2" label="温度2"/>
    <el-table-column prop="temperature3" label="温度3"/>
    <el-table-column prop="temperature4" label="温度4"/>
    <el-table-column prop="voltage" label="电流"/>
    <el-table-column prop="current" label="客厅温度"/>
    <el-table-column prop="localCurrent" label="剩余电流" width="100"/>
    <el-table-column prop="metalShortCircuit" label="金属短路"/>
    <el-table-column prop="highCurrent" label="电流过载" width="100"/>
    <el-table-column prop="highOver" label="线阻过大" />
    <el-table-column prop="riskVoltage" label="漏电报警" />
    <el-table-column prop="temperatureWaring1" label="温度1报警" />
    <el-table-column prop="temperatureWaring2" label="温度2报警" />
    <el-table-column prop="temperatureWaring3" label="温度3报警" />
    <el-table-column prop="temperatureWaring4" label="温度4报警" />
    <el-table-column prop="overVoltage" label="过压报警" width="100"/>
    <el-table-column prop="lowVoltage" label="欠压报警" width="100"/>
    <el-table-column prop="updateTime" label="更新时间" width="100"/>
    <!-- <el-table-column label="风险状态" width="80">
        <template slot-scope="scope">
            {{ scope.row.status === 1 ? '不安全' : '安全' }}
        </template>
    </el-table-column> -->

    <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
            <el-button type="danger" size="mini" 
                icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
            <!-- <el-button v-if="scope.row.riskLevel == 1" type="primary" size="mini" 
                icon="el-icon-delete" @click="lockFireControlSubmit(scope.row.id,0)">恢复安全</el-button>
            <el-button v-if="scope.row.riskLevel == 0" type="danger" size="mini" 
                icon="el-icon-delete" @click="lockFireControlSubmit(scope.row.id,1)">设置警报</el-button> -->
            <!-- <router-link :to="'/fireControlSubmit/edit/'+scope.row.id">
               <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
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
import submitNew from '@/api/submitNew'

export default {
    data(){
        return {
            current:1,//当前页
            limit:5,//每页显示的记录对象
            searchObj:{},//条件封装对象
            list:[], //每页数据集合
            total:0,
            multipleSelection:[] //批量选择中选择的记录列表
        }

    },
    created() { //在数据渲染之前
       this.getList()
    },
    methods: {//定义方法，进行请求接口的调用
        lockSubmitNew(id,riskLevel){
            submitNew.lockSubmitNew(id,riskLevel)
             .then(response => {
                            //刷新页面
                            this.getList(1)
                        })
        },
        //消防提交列表：
        getList(page=1) {
            this.current = page
            submitNew.getSubmitNewList(this.current,this.limit,this.searchObj)
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
                    submitNew.deleteSubmitNew(id)
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
            this.$confirm('此操作将永久删除设置信息, 是否继续?', '提示', {
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
                submitNew.batchdeleteSubmitNew(idList)
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
