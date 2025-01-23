<template>
  <div class="box">
    <SunMoon ball="cut-in" />
    <div>-</div>
    <div class="meteor"></div>
    <SunMoon ball="gradient" halo="linear" />
  </div>
</template>

<script setup>
  import SunMoon from './components/SunMoon.vue';
  import { ref } from 'vue';

  // 控制动画触发
  const animate = ref(false);

  const toggleAnimation = () => {
    animate.value = true;
    setTimeout(() => (animate.value = false), 1000); // 1 秒后重置动画
  };
</script>

<style scoped>
  .box {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(175, 88, 88);
  }

  .test-box {
    width: 50px;
    height: 50px;
    background-color: aqua;
    border-radius: 50%;
    /* 可选：使元素更像小球 */
  }

  /* 弹性动画 */
  .animate {
    animation: bounce 1s ease-in-out forwards;
  }

  @keyframes bounce {
    0% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(100px);
      /* 目标位置 */
    }

    80% {
      transform: translateX(80px);
      /* 回弹 */
    }

    90% {
      transform: translateX(95px);
      /* 第二次小幅回弹 */
    }

    100% {
      transform: translateX(100px);
      /* 最终稳定 */
    }
  }
</style>