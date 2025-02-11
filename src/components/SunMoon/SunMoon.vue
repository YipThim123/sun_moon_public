<template>
    <div class="sun-moon-button-box" @click="ballTrans" @mouseover="handleOver" @mouseleave="handleLeave">
        <Sky :ballStatus="ballStatus" />
        <StarCloud :ballStatus="ballStatus" :meteorFallStatus="meteorFallStatus" :shakeStatus="shakeStatus"
            :twinkleList="twinkleList" />
        <Halo :halo="halo" :ballStatus="ballStatus" />
        <Ball :ballStatus="ballStatus" :ball="ball" :rotateStatus="rotateStatus" />
    </div>
</template>


<script setup>
    import { ref, reactive, computed } from "vue";
    import Sky from './components/sky.vue'
    import Halo from './components/halo.vue'
    import StarCloud from './components/starCloud.vue'
    import Ball from './components/ball.vue'

    const emit = defineEmits(['onStatus']);

    const props = defineProps({
        size: {
            type: [String, Number],
            default: '20px',
            // 按钮高度, 示例: '20', '20px'
        },
        ball: {
            type: String,
            default: 'cut-in'
            // cut-in: 月球切入出现, gradient: 月球渐变出现
        },
        halo: {
            type: String,
            default: 'flex',
            // flex: 光晕弹性运动, linear: 光晕线性运动
        },
        delay: {
            type: [String, Number],
            default: '2000',
            // 鼠标悬浮动画的延迟时间, 示例: '2000'
        },
        finish: {
            type: String,
            default: 'now'
            // now: 鼠标移出后的月亮瞬间回到原位, delay: 鼠标移出后的月亮转至终点
        },
    })

    const parsedSize = computed(() => {
        if (typeof props.size === "string") {
            if (props.size.slice(-2) === 'px') {
                return props.size;
            }
        }
        return `${props.size}px`
    });

    const ballStatus = ref(false);
    const ballTrans = () => {
        if (ballStatus.value) {
            ballStatus.value = false;
            emit('onStatus', ballStatus.value);
            dayHoverAnimation()
            nightHoverAnimationReset()
        }
        else if (!ballStatus.value) {
            ballStatus.value = true;
            emit('onStatus', ballStatus.value);
            nightHoverAnimation()
            dayHoverAnimationReset()
        }
    };

    // 鼠标悬浮状态
    const hoverStatus = ref(false)

    // 鼠标悬浮事件
    const handleOver = () => {
        hoverStatus.value = true
        dayHoverAnimation()
        nightHoverAnimation()
    }
    // 鼠标离开事件
    const handleLeave = () => {
        hoverStatus.value = false
        nightHoverAnimationReset()
        dayHoverAnimationReset()
    }

    // 云朵摆动状态
    const shakeStatus = ref(false)
    // 云朵摆动延迟
    const dayHoverAnimationDelayId = ref(null)
    // 云朵停止重复计时器
    const shakeIntervalId = ref(null)
    const dayHoverAnimation = () => {
        if (!ballStatus.value && !dayHoverAnimationDelayId.value && !shakeStatus.value) {
            dayHoverAnimationDelayId.value = setTimeout(() => {
                if (hoverStatus.value && !ballStatus.value) {
                    shakeStatus.value = true
                    shakeIntervalId.value = setInterval(() => {
                        if (!hoverStatus.value || ballStatus.value) {
                            shakeStatus.value = false
                            clearInterval(shakeIntervalId.value)
                        }
                    }, 4000)
                }
            }, props.delay)
        }
    }
    const dayHoverAnimationReset = () => {
        clearTimeout(dayHoverAnimationDelayId.value)
        dayHoverAnimationDelayId.value = null
    }

    /**
     * 配置星星闪烁列表
     * @type {Array<Object>}
     * @property {number} twinkleId - 闪烁星星id
     * @property {null|number} twinkleInterval - 闪烁计时重复执行器
     * @property {boolean} twinkleShowStatus - 闪烁状态
     * @property {number} twinkleTime - 闪烁时间
     */
    const twinkleList = reactive(
        [
            {
                twinkleId: 1,
                twinkleInterval: null,
                twinkleShowStatus: false,
                twinkleTime: 1100
            },
            {
                twinkleId: 3,
                twinkleInterval: null,
                twinkleShowStatus: false,
                twinkleTime: 1300
            },
        ])

    // 防止nightHoverAnimation函数重复触发
    const nightHoverAnimationStatus = ref(false)
    // 夜晚动画延迟计时器
    const nightHoverAnimationDelayId = ref(null)
    const nightHoverAnimation = () => {
        // 函数处于非触发状态、闪烁计时器不存在、按钮处于夜晚状态，执行下一步
        if (!nightHoverAnimationStatus.value && !nightHoverAnimationDelayId.value && ballStatus.value) {
            // 添加计时器
            nightHoverAnimationDelayId.value = setTimeout(() => {
                // 鼠标仍悬浮、按钮仍处于夜晚状态，执行下一步
                if (hoverStatus.value && ballStatus.value) {
                    // 函数改为触发状态
                    nightHoverAnimationStatus.value = true
                    moonRotate()
                    starTwinkle()
                    meteorFall()
                }
                else {
                    nightHoverAnimationReset()
                }
            }, props.delay)
        }
    }

    const starTwinkle = () => {
        twinkleList.forEach((twinkStar) => {
            twinkStar.twinkleShowStatus = true
            if (!twinkStar.twinkleInterval) {
                twinkStar.twinkleInterval = setInterval(() => {
                    twinkStar.twinkleId = (twinkStar.twinkleId + 3) % 11;
                    if (!hoverStatus.value || !ballStatus.value) {
                        clearInterval(twinkStar.twinkleInterval)
                        twinkStar.twinkleInterval = null
                        twinkStar.twinkleShowStatus = false
                    }
                }, twinkStar.twinkleTime);
            }
        });
    }

    /**
     * 寻找闪烁的星星
     */
    const ifTwinkle = (id) => {
        return twinkleList.some(
            (twinkleStar) =>
                twinkleStar.twinkleShowStatus && id === twinkleStar.twinkleId
        );
    };

    /**
     * 重置闪烁状态
     */
    const nightHoverAnimationReset = () => {
        clearTimeout(nightHoverAnimationDelayId.value)
        nightHoverAnimationDelayId.value = null
        nightHoverAnimationStatus.value = false
        if (props.finish === 'now') {
            rotateStatus.value = false
        }
    }

    // 控制旋转动画
    const rotateStatus = ref(false)
    // 旋转计时重复执行器
    const rotateInterval = ref(null)
    const moonRotate = () => {
        rotateStatus.value = true
        if (!rotateInterval.value) {
            rotateInterval.value = setInterval(() => {
                if (!hoverStatus.value || !ballStatus.value) {
                    rotateStatus.value = false
                    clearInterval(rotateInterval.value)
                    rotateInterval.value = null
                }
            }, 12000)
        }
    }

    const meteorFallStatus = ref(false)
    const meteorFallInterval = ref(null)
    const meteorFall = () => {
        meteorFallStatus.value = true
        if (!meteorFallInterval.value) {
            meteorFallInterval.value = setInterval(() => {
                if (!hoverStatus.value || !ballStatus.value) {
                    meteorFallStatus.value = false
                    clearInterval(meteorFallInterval.value)
                    meteorFallInterval.value = null
                }
            }, 6000)
        }
    }
</script>

<style>
    @import url(./css/variable.css);

    .sun-moon-button-box {
        /* 按钮高度 */
        --box-height: v-bind(parsedSize);

        -webkit-tap-highlight-color: transparent;
        height: var(--box-height);
        width: var(--box-width);
        clip-path: inset(0 round var(--box-height));
        font-size: calc(var(--box-height) / 10);
        display: flex;
        align-items: center;
        border-radius: calc(var(--box-height) / 2);
        overflow: hidden;
        cursor: pointer;
        z-index: 1;
    }
</style>