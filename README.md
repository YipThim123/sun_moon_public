# 整合版

![展示GIF](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3h4bnJxcjJjYXpsMjA1c3Yzb2sycGNoaWV1eDA5czA0eXJ1NDZrdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FIpl1KcwLPUYYrFV6Q/giphy.gif "sun_moon")

## 简介
_**Vue3项目**_ \
该项目为**复刻**前端中的一个经典创意 \
演示视频链接: [在Vue3中实现前端烦人的白天黑夜切换按钮，UI vs 开发](https://www.bilibili.com/video/BV1xdFFevEfs/)

## 使用说明
当前分支为整合版，即项目中的代码只在一个vue文件中，各位同学直接使用。 \
\
项目代码只在 [/src/components/SunMoon.vue](https://github.com/YipThim123/sun_moon_public/blob/develop/src/components/SunMoon.vue)中。将该文件放入项目中后，导入即可使用，示例：
```vue
<template>
  <SunMoon />
</template>

<script setup>
  import SunMoon from './components/SunMoon.vue';
<script>
```

### 传参
1. size: 按钮高度，接收String和Number类型，例如：'100'，'100px', 100
2. ball: 月球出现动画，接收String类型，可选值：'cut-in'，'gradient'，分别为切入，渐变
3. halo: 光晕运动效果，接收String类型，可选值：'flex'，'linear'，分别为弹性运动，线性运动
4. delay: 鼠标悬浮动画的延迟时间，接收String和Number类型，可选值：'cut-in'，'gradient'，分别为切入，渐变
5. finish: 鼠标移出后的月亮效果，接收String类型，可选值：'now'，'delay'，分别为瞬间回到原位，等待转至终点

### 事件
@onStatus：点击按钮时触发，携带按钮的状态参数-Boolean值，false为太阳状态，即按钮位于左侧，true为月亮状态，即按钮位于右侧。

```vue
// 示例
<template> 
    <SunMoon :size="size" :ball="ball" :halo="halo" :delay="delay" :finish="finish" @onStatus="getStatus" />
</template>
<script setup>
    const getStatus = (value) => {
        status.value = value;
    };
</script>
```

\
若需要进行二次开发请切换至[component](https://github.com/YipThim123/sun_moon_public/tree/component)分支

## 更新日志

### 2025/01/25
此版本为整合版，代码全部写在一个文件中，方便直接调用

### 2025/02/11
补充了README.md中的简介和使用说明