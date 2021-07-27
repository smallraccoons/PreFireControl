<template>
  <div class="box">

<div >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <span>一级配电箱</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>

  <div class="top">
    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>01温度传感</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button>02温度传感</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
      <el-button>03温度传感</el-button>
    </el-tooltip>
  </div>

  <div class="left">
    <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
      <el-button>04智能空开</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
      <el-button>05智能空开</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
      <el-button>06电弧检测</el-button>
    </el-tooltip>
  </div>
</el-card>
</div>

<div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>二级配电箱</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>

    <div class="top">
    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>01温度传感</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button>02温度传感</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
      <el-button>03温度传感</el-button>
    </el-tooltip>
  </div>

  <div class="left">
    <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
      <el-button>04智能空开</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
      <el-button>05智能空开</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
      <el-button>06电弧检测</el-button>
    </el-tooltip>
  </div>
</el-card>
</div>
<br>
<div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>三级配电箱</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>

  <div class="top">
    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>01温度传感</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button>02温度传感</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
      <el-button>03温度传感</el-button>
    </el-tooltip>
  </div>

  <div class="left">
    <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
      <el-button>04智能空开</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
      <el-button>05智能空开</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
      <el-button>06电弧检测</el-button>
    </el-tooltip>
  </div>
</el-card>
</div>
<div id="mountNode"></div>

</div>
</template>

<style>
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .box {
    /* width: 500px; */
    display: flex;
    flex-wrap: wrap;

   .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }


    .item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
    .box-card{
        margin-right: 20px;
        margin-bottom: 20px;
    }
  }
</style>

<script>
  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>