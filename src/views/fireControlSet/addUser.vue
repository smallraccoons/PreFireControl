<template>
  <div class="app-container">
      用户添加
      <el-form label-width="120px">
         <el-form-item label="用户姓名">
            <el-input v-model="userInfo.userName"/>
         </el-form-item>
         <el-form-item label="用户身份证">
            <el-input v-model="userInfo.userId"/>
         </el-form-item>
         <el-form-item label="用户家庭编号">
            <el-input v-model="userInfo.homeId"/>
         </el-form-item>
         <el-form-item label="联系人性别">
            <el-input v-model="userInfo.sex"/>
         </el-form-item>
         <el-form-item label="联系人年龄">
            <el-input v-model="userInfo.age"/>
         </el-form-item>
         <el-form-item label="联系人手机">
            <el-input v-model="userInfo.phoneNumber"/>
         </el-form-item>
         <el-form-item label="联系人邮箱">
            <el-input v-model="userInfo.email"/>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<style>
</style>

<script>
import userIF from '@/api/userInfo'

  export default {
    data() {
      return {
        userInfo: {
        }
      }
    },
    created() {//页面渲染之前执行
      //获取路由id值
      //调用接口得到医院设置信息
      if(this.$route.params && this.$route.params.id) {
         const id = this.$route.params.id
         this.getUserInfo(id)
      } else {
         //表单数据清空
         this.userInfo = {}
      }
    },
    methods: {
      //根据id查询.
      getUserInfo(id){
        userIF.getUserInfo(id)
            .then(response => {
              this.userInfo = response.data
            })

      },
      //添加
      saveOrUpdate() {
        userIF.saveUserInfo(this.userInfo)
            .then(response => {
              //提示
              this.$message({
              type: 'success',
              message: '添加成功!'
              })
              //跳转到列表页面，使用路由跳转方式
              this.$router.push({path: '/user/userInfo/:id'})
            })
        console.log('submit!');
      }
    }
  }
</script>             