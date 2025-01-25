<template>
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
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    const props = defineProps({
        meteorFallStatus: {
            type: Boolean,
        },
        twinkleList: {
            type: Object,
        },
        shakeStatus: {
            type: Boolean,
        },
        ballStatus: {
            type: Boolean,
        },
    })

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
     * 寻找闪烁的星星
     */
    const ifTwinkle = (id) => {
        return props.twinkleList.some(
            (twinkleStar) =>
                twinkleStar.twinkleShowStatus && id === twinkleStar.twinkleId
        );
    };
</script>

<style>
    .sun-moon-button-box {

        /* 云朵与星星 */
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