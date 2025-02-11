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
  import SunMoon from './components/SunMoon.vue'
</script>
```

### 传参
| 参数    | 说明               | 类型            | 可选值                            |
|---------|------------------|---------------|-------------------------------------|
| size    | 按钮高度           | String / Number | 例如：'100'，'100px', 100          |
| ball    | 月球出现动画       | String          | 'cut-in'（切入）, 'gradient'（渐变）  |
| halo    | 光晕运动效果       | String          | 'flex'（弹性运动）, 'linear'（线性运动） |
| delay   | 悬浮动画延迟时间   | String / Number  | 例如：'2000'，2000（毫秒） |
| finish  | 移出后月亮效果     | String          | 'now'（瞬间回位）, 'delay'（延迟至终点） |

### 事件
| 事件      | 说明             | 回调参数       |  参数说明  |
|-----------|----------------|--------------|--------------|
| @onStatus | 点击按钮时触发  | Boolean |false：太阳状态，按钮位于左侧；true：月亮状态，按钮位于右侧|


```vue
// 示例
<template> 
    <SunMoon :size="size" :ball="ball" :halo="halo" :delay="delay" :finish="finish" @onStatus="getStatus" />
</template>
<script setup>
    import SunMoon from './components/SunMoon.vue'
    import { ref } from 'vue'
    const status = ref(false)
    const getStatus = (value) => {
        status.value = value
    }
</script>
```

\
若需要进行二次开发请切换至[component](https://github.com/YipThim123/sun_moon_public/tree/component)分支

## 更新日志

### 2025/01/25
此版本为整合版，代码全部写在一个文件中，方便直接调用

### 2025/02/11
补充了README.md中的简介和使用说明
