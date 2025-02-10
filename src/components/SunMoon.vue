<template>
    <div class="button-box" @click="ballTrans" @mouseover="handleOver" @mouseleave="handleLeave">
        <div class="sky">
            <div class="inner-shadow"></div>
            <div :class="[ballStatus ? 'night' : 'day']"></div>
        </div>
        <div class="star-cloud-box">
            <div class="star-box" :class="{ 'star-move': !ballStatus }">
                <div v-for="star in starList" :key="star.id" class="star" :class="{ 'twinkle': ifTwinkle(star.id) }"
                    :style="{ height: `calc(var(--star-size) * ${star.size})`, width: `calc(var(--star-size) * ${star.size})`, top: star.top, left: star.left }">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <path d="M50,0 
                            C62.5,37.5 62.5,37.5 100,50 
                            C62.5,62.5 62.5,62.5 50,100 
                            C37.5,62.5 37.5,62.5 0,50 
                            C37.5,37.5 37.5,37.5 50,0" fill="white" />
                    </svg>
                </div>
                <div class="meteor" :class="{'meteor-fall': meteorFallStatus}"></div>
            </div>
            <div class="cloud-box">
                <div class="cloud-near" :class="{ 'cloud-far-move': ballStatus }">
                    <div v-for="(cloud, index) in cloudNearList" :key="index" class="cloud"
                        :class="{'cloud-near-shake': shakeStatus}" :style="getCloudNearStyle(cloud)"></div>
                </div>
                <div class="cloud-far" :class="{ 'cloud-far-move': ballStatus }">
                    <div v-for="(cloud, index) in cloudFarList" :key="index" class="cloud"
                        :class="{'cloud-far-shake': shakeStatus}" :style="getCloudFarStyle(cloud)"></div>
                </div>
            </div>
        </div>
        <div class="halo-box">
            <div class="halo-linear" v-if="halo === 'linear'">
                <div class="halo-middle" :class="{ 'halo-left': !ballStatus, 'halo-right': ballStatus }"></div>
            </div>
            <div class="halo-flex" v-else>
                <div class="halo-inner" :class="{ 'halo-left': !ballStatus, 'halo-right': ballStatus }">
                </div>
                <div class="halo-middle" :class="{ 'halo-left': !ballStatus, 'halo-right': ballStatus }">
                </div>
                <div class="halo-outer" :class="{ 'halo-left': !ballStatus, 'halo-right': ballStatus }">
                </div>
            </div>
        </div>
        <div class="ball-box">
            <div class="ball-gradient" v-if="ball === 'gradient'"
                :class="{ 'to-left': !ballStatus, 'to-right': ballStatus }">
                <div class="sun" :class="{ 'ballHide': ballStatus }"></div>
                <div class="moon" :class="{ 'ballHide': !ballStatus }">
                    <div class="moon-body" :class="{ 'moon-rotate': rotateStatus }">
                        <div v-for="crater in craterList" :key="crater.id" :class="`moon-crater`"
                            :style="{height: `calc(var(--ball-size) * ${crater.size})`, width: `calc(var(--ball-size) * ${crater.size})`,top: crater.top, left: crater.left, }">
                        </div>
                    </div>
                    <div class="moon-shadow"></div>
                </div>
            </div>
            <div class="ball-cut-in" v-else :class="{ 'to-left': !ballStatus, 'to-right': ballStatus }">
                <div class="sun"></div>
                <div class="moon" :class="{ 'moon-cut-in': ballStatus }">
                    <div class="moon-body" :class="{ 'moon-rotate': rotateStatus }">
                        <div v-for="crater in craterList" :key="crater.id" :class="`moon-crater`"
                            :style="{height: `calc(var(--ball-size) * ${crater.size})`, width: `calc(var(--ball-size) * ${crater.size})`,top: crater.top, left: crater.left, }">
                        </div>
                    </div>
                    <div class="moon-shadow"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

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

    const cloudNearList = [
        { size: 1.2, top: "15%", right: "-13%" },
        { size: 1.3, top: "39%", right: "-5%" },
        { size: 1.0, top: "66%", right: "5%" },
        { size: 1.5, top: "80%", right: "26%" },
        { size: 1.2, top: "75%", right: "38%" },
        { size: 1.3, top: "83%", right: "55%" },
        { size: 1.3, top: "89%", right: "68%" },
    ];

    const cloudFarList = [
        { size: 1.2, top: "2%", right: "-5%" },
        { size: 1.4, top: "25%", right: "5%" },
        { size: 1.0, top: "37%", right: "10%" },
        { size: 1.5, top: "58%", right: "30%" },
        { size: 1.2, top: "55%", right: "38%" },
        { size: 1.3, top: "70%", right: "57%" },
        { size: 1.1, top: "77%", right: "66%" },
    ]

    const getCloudNearStyle = (cloud) => {
        return {
            height: `calc(var(--near-cloud-size) / ${cloud.size})`,
            width: `calc(var(--near-cloud-size) / ${cloud.size})`,
            top: cloud.top,
            right: cloud.right,
        }
    }

    const getCloudFarStyle = (cloud) => {
        return {
            height: `calc(var(--far-cloud-size) / ${cloud.size})`,
            width: `calc(var(--far-cloud-size) / ${cloud.size})`,
            top: cloud.top,
            right: cloud.right,
        }
    }

    const craterList = [
        { id: 1, size: 0.18, top: '15%', left: '38%', },
        { id: 2, size: 0.32, top: '46%', left: '13%', },
        { id: 3, size: 0.22, top: '61%', left: '61%', },
    ]

    // 配置星星大小位置
    const starList = [
        { id: 0, size: 1.5, top: '13%', left: '20%', },
        { id: 1, size: 0.5, top: '28%', left: '10%', },
        { id: 2, size: 0.7, top: '43%', left: '22%', },
        { id: 3, size: 0.3, top: '68%', left: '15%', },
        { id: 4, size: 0.2, top: '75%', left: '11%', },
        { id: 5, size: 0.4, top: '78%', left: '22%', },
        { id: 6, size: 1.3, top: '21%', left: '53%', },
        { id: 7, size: 0.4, top: '20%', left: '42%', },
        { id: 8, size: 0.4, top: '48%', left: '37%', },
        { id: 9, size: 0.6, top: '53%', left: '52%', },
        { id: 10, size: 0.8, top: '73%', left: '46%', },
    ]

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

<style scoped>
    * {
        -webkit-tap-highlight-color: transparent;
    }

    .button-box {
        /* 按钮高度 */
        --box-height: v-bind(parsedSize);
        /* 按钮宽度 */
        --box-width: calc(var(--box-height) * 2.5);
        /* 小球直径 */
        --ball-size: calc(var(--box-height) * 0.85);
        /* 小球距左右长度 */
        --ball-margin: calc(var(--box-height) * 0.1);
        /* 小球移动时间 */
        --move-duration: 1.2s;
        /* 小球变色时间 */
        --opacity-duration: calc(var(--move-duration) / 1.8);
        /* 天空变色时间 */
        --sky-duration: var(--move-duration);
        /* 近云朵基准直径 */
        --near-cloud-size: var(--ball-size);
        /* 近云朵移动时间 */
        --near-cloud-duration: calc(var(--move-duration) * 1.2);
        /* 远云朵基准直径 */
        --far-cloud-size: var(--ball-size);
        /* 远云朵移动时间 */
        --far-cloud-duration: calc(var(--move-duration) * 1.3);
        /* 星星基准大小 */
        --star-size: calc(var(--ball-size) / 15);
        /* 星星闪烁时间 */
        --twinkle-duration: 1s;

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

        /* 天空 */
        .sky {
            position: absolute;
            height: var(--box-height);
            width: var(--box-width);
            overflow: hidden;

            .inner-shadow {
                position: absolute;
                height: var(--box-height);
                width: var(--box-width);
                border-radius: calc(var(--box-height) / 2);
                box-shadow: inset 0 0 0.5em rgba(0, 0, 0, 0.6);
                z-index: 4;
            }

            .day {
                height: var(--box-height);
                width: var(--box-width);
                background-color: rgb(70, 133, 196);
                transition: background-color var(--sky-duration);
            }

            .night {
                height: var(--box-height);
                width: var(--box-width);
                background-color: rgb(23, 30, 51);
                transition: background-color var(--sky-duration);
            }
        }

        .star-cloud-box {
            position: absolute;
            height: var(--box-height);
            width: var(--box-width);
            overflow: hidden;

            .star-move {
                transform: translateY(-100%);
            }

            .star-box {
                position: absolute;
                height: var(--box-height);
                width: var(--box-width);
                transition: transform var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);

                .star {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: var(--twinkle-duration);
                }

                .twinkle {
                    transform: scale(0);
                }

                .meteor {
                    position: absolute;
                    width: 0.2%;
                    height: 50px;
                    height: 50%;
                    background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
                    border-radius: 50%;
                    transform: translate(calc(var(--box-height) * 1.75), calc(var(--box-height) * -0.35)) rotate(255deg);
                    box-shadow: 0 0 0px rgba(255, 255, 255, 0.8);
                }

                .meteor-fall {
                    animation: meteor-fall 6s linear infinite;
                }
            }

            .cloud-box {
                position: absolute;
                height: var(--box-height);
                width: var(--box-width);

                .cloud-near-move {
                    transform: translateY(100%);
                }

                .cloud-far-move {
                    transform: translateY(100%);
                }

                .cloud-near-shake {
                    animation: cloud-near-shake 4s linear infinite;
                }

                .cloud-far-shake {
                    animation: cloud-far-shake 4s linear infinite;
                }

                .cloud-near {
                    position: absolute;
                    height: var(--box-height);
                    width: var(--box-width);
                    transition: transform var(--near-cloud-duration) cubic-bezier(0.49, 1.57, 0.04, 0.83);
                    z-index: 2;

                    .cloud {
                        position: absolute;
                        border-radius: 50%;
                        background-color: white;
                        z-index: 2;
                    }
                }

                .cloud-far {
                    position: absolute;
                    height: var(--box-height);
                    width: var(--box-width);
                    transition: transform var(--far-cloud-duration) cubic-bezier(0.49, 1.57, 0.28, 0.81);
                    z-index: 1;

                    .cloud {
                        position: absolute;
                        border-radius: 50%;
                        background-color: rgb(168, 197, 227);
                        z-index: 1;
                    }
                }
            }
        }

        /* 光晕 */
        .halo-box {
            position: absolute;
            display: flex;
            align-items: center;
            height: var(--box-height);
            width: var(--box-width);
            border-radius: var(--box-height);
            overflow: hidden;


            .halo-linear {
                position: absolute;
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                border-radius: 50%;

                .halo-middle {
                    position: absolute;
                    height: calc(var(--box-height) * 2.27);
                    width: calc(var(--box-height) * 2.27);
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.08);
                    z-index: 3;
                    transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
                }

                .halo-middle::before {
                    content: '';
                    position: absolute;
                    height: calc(var(--box-height) * 1.67);
                    width: calc(var(--box-height) * 1.67);
                    left: calc(var(--box-height) * 0.3);
                    top: calc(var(--box-height) * 0.3);
                    background-color: rgba(255, 255, 255, 0.08);
                    border-radius: 50%;
                    z-index: 3;
                }

                .halo-middle::after {
                    content: '';
                    position: absolute;
                    height: calc(var(--box-height) * 2.87);
                    width: calc(var(--box-height) * 2.87);
                    left: calc(var(--box-height) * -0.3);
                    top: calc(var(--box-height) * -0.3);
                    background-color: rgba(255, 255, 255, 0.08);
                    border-radius: 50%;
                    z-index: 3;
                }

                .halo-left {
                    transform: translateX(calc(-50% + var(--ball-margin) + var(--ball-size) / 2));
                }

                .halo-right {
                    transform: translateX(calc(var(--box-width) - 50% - var(--ball-margin) - var(--ball-size) / 2));
                }
            }

            .halo-flex {
                position: absolute;
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                border-radius: 50%;

                .halo-inner {
                    position: absolute;
                    height: calc(var(--box-height) * 1.47);
                    width: calc(var(--box-height) * 1.47);
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.08);
                    z-index: 3;
                    transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
                }

                .halo-middle {
                    position: absolute;
                    height: calc(var(--box-height) * 1.77);
                    width: calc(var(--box-height) * 1.77);
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.08);
                    z-index: 3;
                    transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
                }

                .halo-outer {
                    position: absolute;
                    height: calc(var(--box-height) * 2.07);
                    width: calc(var(--box-height) * 2.07);
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.08);
                    z-index: 3;
                    transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
                }

                .halo-left {
                    transform: translateX(calc(-1 * var(--ball-margin)));
                }

                .halo-right {
                    transform: translateX(calc(var(--box-width) - 100% + var(--ball-margin)));
                }
            }
        }

        /* 太阳和月亮 */
        .ball-box {
            position: absolute;
            height: var(--ball-size);
            width: var(--ball-size);
            border-radius: 50%;

            .to-left {
                transform: translateX(var(--ball-margin));
            }

            .to-right {
                transform: translateX(calc(var(--box-width) - var(--ball-size) - var(--ball-margin)));
            }

            .ball-gradient {
                position: absolute;
                height: var(--ball-size);
                width: var(--ball-size);
                border-radius: 50%;
                box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.6);
                transition: transform var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
                z-index: 5;

                .ballHide {
                    opacity: 0;
                }

                .sun {
                    position: absolute;
                    height: var(--ball-size);
                    width: var(--ball-size);
                    border-radius: 50%;
                    background-color: rgb(243, 198, 43);
                    box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                        inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
                    z-index: 1;
                    transition: opacity var(--opacity-duration);
                }

                .moon {
                    position: absolute;
                    height: var(--ball-size);
                    width: var(--ball-size);
                    border-radius: 50%;
                    z-index: 1;
                    transition: opacity var(--opacity-duration), transform 5s linear;

                    .moon-body {
                        position: absolute;
                        height: var(--ball-size);
                        width: var(--ball-size);
                        border-radius: 50%;
                        background-color: rgb(195, 201, 211);
                    }

                    .moon-rotate {
                        animation: moon-rotate 12s linear infinite;
                    }

                    .moon-shadow {
                        position: absolute;
                        height: var(--ball-size);
                        width: var(--ball-size);
                        border-radius: 50%;
                        box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                            inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
                        z-index: 2;
                    }

                    .moon-crater {
                        position: absolute;
                        height: calc(var(--ball-size) * 0.18);
                        width: calc(var(--ball-size) * 0.18);
                        top: 15%;
                        left: 38%;
                        border-radius: 50%;
                        background-color: rgb(145, 151, 165);
                    }

                    .moon-crater::before {
                        content: '';
                        position: absolute;
                        border-radius: 50%;
                        height: calc(100% - var(--ball-size) * 0.02);
                        width: calc(100% - var(--ball-size) * 0.02);
                        top: calc(var(--ball-size) * 0.01);
                        left: calc(var(--ball-size) * 0.01);
                        background-color: rgb(156, 159, 179);
                    }
                }
            }

            .ball-cut-in {
                position: absolute;
                height: var(--ball-size);
                width: var(--ball-size);
                border-radius: 50%;
                overflow: hidden;
                box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.6);
                transition: transform var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
                z-index: 5;

                .ballHide {
                    opacity: 0 !important;
                }

                .sun {
                    position: absolute;
                    height: var(--ball-size);
                    width: var(--ball-size);
                    border-radius: 50%;
                    background-color: rgb(243, 198, 43);
                    box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                        inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
                    z-index: 1;
                }

                .moon {
                    position: absolute;
                    height: var(--ball-size);
                    width: var(--ball-size);
                    border-radius: 50%;
                    background-color: rgb(195, 201, 211);
                    z-index: 1;
                    transform: translateX(100%);
                    transition: transform var(--opacity-duration);

                    .moon-body {
                        position: absolute;
                        height: var(--ball-size);
                        width: var(--ball-size);
                        border-radius: 50%;
                        background-color: rgb(195, 201, 211);
                    }

                    .moon-rotate {
                        animation: moon-rotate 12s linear infinite;
                    }

                    .moon-shadow {
                        position: absolute;
                        height: var(--ball-size);
                        width: var(--ball-size);
                        border-radius: 50%;
                        box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                            inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
                        z-index: 2;
                    }

                    .moon-crater {
                        position: absolute;
                        height: calc(var(--ball-size) * 0.18);
                        width: calc(var(--ball-size) * 0.18);
                        top: 15%;
                        left: 38%;
                        border-radius: 50%;
                        background-color: rgb(145, 151, 165);
                    }

                    .moon-crater::before {
                        content: '';
                        position: absolute;
                        border-radius: 50%;
                        height: calc(100% - var(--ball-size) * 0.02);
                        width: calc(100% - var(--ball-size) * 0.02);
                        top: calc(var(--ball-size) * 0.01);
                        left: calc(var(--ball-size) * 0.01);
                        background-color: rgb(156, 159, 179);
                    }
                }

                .moon-cut-in {
                    transform: translateX(0%);
                }
            }
        }
    }
</style>

<style>
    @keyframes moon-rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    @keyframes cloud-near-shake {
        0% {
            transform: translateY(0);
        }

        15% {
            transform: translateY(2.8%);
        }

        21% {
            transform: translateY(3.6%);
        }

        25% {
            transform: translateY(4%);
        }

        29% {
            transform: translateY(3.6%);
        }

        35% {
            transform: translateY(2.8%);
        }

        50% {
            transform: translateY(0);
        }

        65% {
            transform: translateY(-2.8%);
        }

        71% {
            transform: translateY(-3.6%);
        }

        75% {
            transform: translateY(-4%);
        }

        79% {
            transform: translateY(-3.6%);
        }

        85% {
            transform: translateY(-2.8%);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes cloud-far-shake {
        0% {
            transform: translateY(0);
        }

        18% {
            transform: translateY(1.7%);
        }

        25% {
            transform: translateY(2%);
        }

        32% {
            transform: translateY(1.7%);
        }

        50% {
            transform: translateY(0);
        }

        68% {
            transform: translateY(-1.7%);
        }

        75% {
            transform: translateY(-2%);
        }

        82% {
            transform: translateY(-1.7%);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes meteor-fall {
        0% {
            transform: translate(calc(var(--box-height) * 1.75), calc(var(--box-height) * -0.35)) rotate(255deg);
        }

        20% {
            transform: translate(calc(var(--box-height) * 1.75), calc(var(--box-height) * -0.35)) rotate(255deg);
        }

        40% {
            transform: translate(calc(var(--box-height) * -0.625), calc(var(--box-height) * 0.3)) rotate(255deg);
        }

        100% {
            transform: translate(calc(var(--box-height) * -0.625), calc(var(--box-height) * 0.3)) rotate(255deg);
        }
    }
</style>