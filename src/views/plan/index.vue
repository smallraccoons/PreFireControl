<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="updateTime"
      label="时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="户主"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phoneNumber"
      label="联系电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="fireStation"
      label="消防站"
      width="120">
    </el-table-column>
    <el-table-column
      prop="riskInfo"
      label="事件类型"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="处理进度"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          updateTime: '2021-05-02',
          userName: '王小虎',
          address: '江干区、彭埠镇、新塘社区1号',
          phoneNumber: '19890237649',
          fireStation: '新塘社区1号消防站',
          riskInfo: '短路'
        },{
          updateTime: '2021-05-02',
          userName: '王二虎',
          address: '江干区、彭埠镇、新塘社区2号',
          phoneNumber: '19890237648',
          fireStation: '新塘社区2号消防站',
          riskInfo: '电流过大'
        }]
      }
    }
  }
</script>