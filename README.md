# 组件版
![展示GIF](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3h4bnJxcjJjYXpsMjA1c3Yzb2sycGNoaWV1eDA5czA0eXJ1NDZrdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FIpl1KcwLPUYYrFV6Q/giphy.gif "sun_moon")

## 简介
该项目为**复刻**前端中的一个经典创意 \
演示视频链接: [在Vue3中实现前端烦人的白天黑夜切换按钮，UI vs 开发](https://www.bilibili.com/video/BV1xdFFevEfs/)

## 使用说明
当前分支为组件版，即项目中的各部分代码封装在各组件中，便于理解与修改，提供给各位同学进行二次开发。 \
\
项目代码只在 [/src/components/SunMoon](https://github.com/YipThim123/sun_moon_public/tree/component/src/components/SunMoon)目录中。 
1. ``SunMoon.vue`` -- 父组件，调用各组件，含有计算动画的函数。
2. ``css/variable`` -- 按钮中各样式的变量
3. ``ball.vue`` -- 按钮中的球体部分，即太阳、月亮
4. ``halo.vue`` -- 按钮中的光晕部分
5. ``sky.vue`` -- 按钮中的天空部分（只涉及背景颜色）
6. ``starCloud.vue`` -- 按钮中的背景细节部分，星星与云朵

若需要直接使用请切换至[develop](https://github.com/YipThim123/sun_moon_public/tree/develop)分支

## 更新日志

### 2025/01/25
此版本为组件版，按钮中的各模块分开，便于二次开发

### 2025/02/11
补充了README.md中的简介和使用说明