<template>
  <div class="box">
    <!-- 表单容器 -->
    <div class="form-container" :class="{'form-show': formStatus}">

      <div class="form">
        <el-row>
          <el-col :span="8">
            <div class="form-item">
              <span>月亮进入</span>
              <el-radio-group v-model="ball" size="small">
                <el-radio-button label="切入" value="cut-in" />
                <el-radio-button label="渐变" value="gradient" />
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-item">
              <span>光晕动画</span>
              <el-radio-group v-model="halo" size="small">
                <el-radio-button label="弹性" value="flex" />
                <el-radio-button label="线性" value="linear" />
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-item">
              <span>月亮停止</span>
              <el-radio-group v-model="finish" size="small">
                <el-radio-button label="即刻" value="now" />
                <el-radio-button label="等待" value="delay" />
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="form-item">
              <span>按钮大小</span>
              <el-slider v-model="size" :min="20" :max="200"/>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="form-item">
              <span>动画延迟</span>
              <el-slider v-model="delay" :min="0" :max="2000"/>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="down-arrow" @click="formStatus = !formStatus">
        <el-icon size="20" v-if="!formStatus">
          <ArrowDownBold />
        </el-icon>
        <el-icon size="20" v-if="formStatus">
          <ArrowUpBold />
        </el-icon>
      </div>
    </div>

    <!-- 动态背景盒子 -->
    <div class="button_box" :class="{'background-sun': !status, 'background-night': status}">
      <SunMoon :size="size" :ball="ball" :halo="halo" :delay="delay" :finish="finish" @onStatus="getStatus" />
    </div>
  </div>
</template>

<script setup>
  import SunMoon from './components/SunMoon.vue';
  import { ref } from 'vue';

  const status = ref(false)
  const inputValue = ref('')
  const formStatus = ref(false)
  const size = ref(110)
  const ball = ref('cut-in')
  const halo = ref('flex')
  const finish = ref('now')
  const delay = ref(2000)

  const getStatus = (value) => {
    status.value = value;
  };

  const handleSubmit = () => {
    console.log('提交的内容:', inputValue.value);
    inputValue.value = ''; // 清空输入框
  };
</script>

<style scoped>
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 顶部表单样式 */
  .form-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    left: 50%;
    transform: translate(-50%, -220px);
    width: 30%;
    min-width: 300px;
    color: white;
    transition: height 0.5s ease;
    z-index: 10;
    border-radius: 0 0 16px 16px;
    transition: 0.5s;

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 10px 20px;
      width: 100%;
      min-width: 300px;
      height: 200px;
      background-color: rgb(131, 131, 131);
      color: white;
      overflow: hidden;
      transition: height 0.5s ease;
      border-radius: 0 0 16px 16px;
      z-index: 10;

      .el-row {
        width: 100%;
      }

      .form-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        justify-content: center;
        width: 100%;

        span {
          font-size: 14px;
        }
      }
    }

    .down-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 35px;
      background-color: rgba(124, 123, 123, 0.2);
      border-radius: 0 0 16px 16px;
      transition: 0.5s;
    }
  }

  .form-show {
    transform: translate(-50%, 0);
  }

  /* 动态背景盒子样式 */
  .button_box {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1.2s;
  }

  .background-sun {
    background-color: rgb(255, 255, 255);
  }

  .background-night {
    background-color: rgb(54, 54, 54);
  }
</style>