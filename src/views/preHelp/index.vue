<template>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="家庭编号" >
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="辅助处理">
    <el-switch v-model="form.prehelp"></el-switch>
  </el-form-item>
  <el-form-item label="处理方案">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="一级警报" value="1"></el-option>
      <el-option label="二级警报" value="2"></el-option>
      <el-option label="三级警报" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    
  </el-form-item>
  <el-form-item label="处理时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <!-- <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item> -->
  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.comment"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>