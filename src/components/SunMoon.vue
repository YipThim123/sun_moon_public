<template>
    <div class="button-box" @click="ballTrans">
        <div class="sky">
            <div class="inner-shadow"></div>
            <div :class="[ballStatus ? 'night' : 'day']"></div>
        </div>
        <div class="star-cloud-box">
            <div class="star-box">

            </div>
            <div class="cloud-box">
                <div class="cloud-near" :class="{ 'cloud-near-move': ballStatus }">
                    <div class="cloud1"></div>
                    <div class="cloud2"></div>
                    <div class="cloud3"></div>
                    <div class="cloud4"></div>
                    <div class="cloud5"></div>
                    <div class="cloud6"></div>
                    <div class="cloud7"></div>
                </div>
                <div class="cloud-far" :class="{ 'cloud-far-move': ballStatus }">
                    <div class="cloud1"></div>
                    <div class="cloud2"></div>
                    <div class="cloud3"></div>
                    <div class="cloud4"></div>
                    <div class="cloud5"></div>
                    <div class="cloud6"></div>
                    <div class="cloud7"></div>
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
                    <div class="moon-crater"></div>
                </div>
            </div>
            <div class="ball-cut-in" v-else :class="{ 'to-left': !ballStatus, 'to-right': ballStatus }">
                <div class="sun"></div>
                <div class="moon" :class="{ 'moon-cut-in': ballStatus }">
                    <div class="moon-crater"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
const ballStatus = ref(false);

const props = defineProps({
    size: {
        type: String,
        default: '200px',
    },
    ball: {
        type: String,
        default: 'cut-in'
    },
    halo: {
        type: String,
        default: 'flex',
    }
})

const ballTrans = () => {
    ballStatus.value = !ballStatus.value;
};
</script>

<style scoped>
.button-box {
    --box-height: v-bind(size);
    --box-width: calc(var(--box-height) * 2.5);
    --ball-size: calc(var(--box-height) * 0.85);
    --ball-margin: calc(var(--box-height) * 0.1);
    --move-duration: 1.2s;
    --sky-duration: var(--move-duration);
    --cloud-duration: calc(var(--move-duration) * 1.3);
    --opacity-duration: calc(var(--move-duration) / 1.8);

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

/* 天空 */
.sky {
    position: absolute;
    height: var(--box-height);
    width: var(--box-width);

    .inner-shadow {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: calc(var(--box-height) / 2);
        box-shadow: inset 0 0 0.5em rgba(0, 0, 0, 0.6);
        z-index: 4;
    }

    .day {
        height: 100%;
        width: 100%;
        background-color: rgb(70, 133, 196);
        transition: background-color var(--sky-duration);
    }

    .night {
        height: 100%;
        width: 100%;
        background-color: rgb(23, 30, 51);
        transition: background-color var(--sky-duration);
    }
}

.star-cloud-box {
    position: absolute;
    height: var(--box-height);
    width: var(--box-width);

    .star-box {
        position: absolute;
        height: var(--box-height);
        width: var(--box-width);
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

        .cloud-near {
            position: absolute;
            height: var(--box-height);
            width: var(--box-width);
            transition: transform var(--cloud-duration) cubic-bezier(0.49, 1.57, 0.04, 0.83);
            z-index: 2;

            .cloud1 {
                position: absolute;
                height: calc(var(--ball-size)/1.2);
                width: calc(var(--ball-size)/1.2);
                top: 15%;
                right: -13%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }

            .cloud2 {
                position: absolute;
                height: calc(var(--ball-size) / 1.3);
                width: calc(var(--ball-size) / 1.3);
                top: 39%;
                right: -5%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }

            .cloud3 {
                position: absolute;
                height: calc(var(--ball-size));
                width: calc(var(--ball-size));
                top: 66%;
                right: 5%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }

            .cloud4 {
                position: absolute;
                height: calc(var(--ball-size)/ 1.5);
                width: calc(var(--ball-size) / 1.5);
                top: 80%;
                right: 26%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }

            .cloud5 {
                position: absolute;
                height: calc(var(--ball-size) / 1.2);
                width: calc(var(--ball-size)/ 1.2);
                top: 75%;
                right: 38%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }

            .cloud6 {
                position: absolute;
                height: calc(var(--ball-size) /1.3);
                width: calc(var(--ball-size)/1.3);
                top: 83%;
                right: 55%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }

            .cloud7 {
                position: absolute;
                height: calc(var(--ball-size) /1.3);
                width: calc(var(--ball-size)/1.3);
                top: 89%;
                right: 68%;
                border-radius: 50%;
                background-color: white;
                z-index: 2;
            }
        }

        .cloud-far {
            position: absolute;
            height: var(--box-height);
            width: var(--box-width);
            transition: transform var(--cloud-duration) cubic-bezier(0.49, 1.57, 0.28, 0.81);
            z-index: 1;

            .cloud1 {
                position: absolute;
                height: calc(var(--ball-size)/1.2);
                width: calc(var(--ball-size)/1.2);
                top: 0%;
                right: -5%;
                border-radius: 50%;
                background-color: rgb(168, 197, 227);
                z-index: 1;
            }

            .cloud2 {
                position: absolute;
                height: calc(var(--ball-size) / 1.4);
                width: calc(var(--ball-size) / 1.4);
                top: 25%;
                right: 5%;
                border-radius: 50%;
                background-color: rgb(168, 197, 227);
                z-index: 1;
            }

            .cloud3 {
                position: absolute;
                height: calc(var(--ball-size));
                width: calc(var(--ball-size));
                top: 37%;
                right: 10%;
                border-radius: 50%;
                background-color: rgb(168, 197, 227);
                z-index: 1;
            }

            .cloud4 {
                position: absolute;
                height: calc(var(--ball-size)/ 1.5);
                width: calc(var(--ball-size) / 1.5);
                top: 58%;
                right: 30%;
                border-radius: 50%;
                background-color: rgb(168, 197, 227);
                z-index: 1;
            }

            .cloud5 {
                position: absolute;
                height: calc(var(--ball-size) / 1.2);
                width: calc(var(--ball-size)/ 1.2);
                top: 55%;
                right: 38%;
                border-radius: 50%;
                background-color: rgb(168, 197, 227);
                z-index: 1;
            }

            .cloud6 {
                position: absolute;
                height: calc(var(--ball-size) /1.3);
                width: calc(var(--ball-size)/1.3);
                top: 70%;
                right: 57%;
                border-radius: 50%;
                background-color: rgb(168, 197, 227);
                z-index: 1;
            }

            .cloud7 {
                position: absolute;
                height: calc(var(--ball-size) /1.1);
                width: calc(var(--ball-size)/1.1);
                top: 77%;
                right: 66%;
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

        /* .halo-inner {
        position: absolute;
        height: calc(var(--box-height) * 1.67);
        width: calc(var(--box-height) * 1.67);
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.08);
        z-index: 3;
        transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
    } */

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

        /* .halo-outer {
        position: absolute;
        height: calc(var(--box-height) * 2.87);
        width: calc(var(--box-height) * 2.87);
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.08);
        z-index: 3;
        transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
    } */

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
            height: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-color: rgb(243, 198, 43);
            box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
            z-index: 1;
            transition: opacity var(--opacity-duration);
        }

        .moon {
            position: absolute;
            height: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-color: rgb(195, 201, 211);
            box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
            z-index: 1;
            transition: opacity var(--opacity-duration);

            .moon-crater {
                position: absolute;
                height: calc(var(--ball-size) * 0.16);
                width: calc(var(--ball-size) * 0.16);
                top: 15%;
                left: 38%;
                border-radius: 50%;
                background-color: rgb(156, 159, 179);
                border: calc(var(--ball-size) / 100) rgb(145, 151, 165) solid;
            }

            .moon-crater::before {
                content: '';
                position: absolute;
                height: calc(var(--ball-size) * 0.3);
                width: calc(var(--ball-size) * 0.3);
                top: 180%;
                left: -145%;
                border-radius: 50%;
                background-color: rgb(156, 159, 179);
                border: calc(var(--ball-size) / 100) rgb(145, 151, 165) solid;
            }

            .moon-crater::after {
                content: '';
                position: absolute;
                height: calc(var(--ball-size) * 0.2);
                width: calc(var(--ball-size) * 0.2);
                top: 263%;
                left: 130%;
                border-radius: 50%;
                background-color: rgb(156, 159, 179);
                border: calc(var(--ball-size) / 100) rgb(145, 151, 165) solid;
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

        .sun {
            position: absolute;
            height: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-color: rgb(243, 198, 43);
            box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
            z-index: 1;
        }

        .moon {
            position: absolute;
            height: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-color: rgb(195, 201, 211);
            box-shadow: inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
                inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
            z-index: 1;
            transform: translateX(100%);
            transition: transform var(--opacity-duration);

            .moon-crater {
                position: absolute;
                height: calc(var(--ball-size) * 0.16);
                width: calc(var(--ball-size) * 0.16);
                top: 15%;
                left: 38%;
                border-radius: 50%;
                background-color: rgb(156, 159, 179);
                border: calc(var(--ball-size) / 100) rgb(145, 151, 165) solid;
            }

            .moon-crater::before {
                content: '';
                position: absolute;
                height: calc(var(--ball-size) * 0.3);
                width: calc(var(--ball-size) * 0.3);
                top: 180%;
                left: -145%;
                border-radius: 50%;
                background-color: rgb(156, 159, 179);
                border: calc(var(--ball-size) / 100) rgb(145, 151, 165) solid;
            }

            .moon-crater::after {
                content: '';
                position: absolute;
                height: calc(var(--ball-size) * 0.2);
                width: calc(var(--ball-size) * 0.2);
                top: 263%;
                left: 130%;
                border-radius: 50%;
                background-color: rgb(156, 159, 179);
                border: calc(var(--ball-size) / 100) rgb(145, 151, 165) solid;
            }
        }

        .moon-cut-in {
            transform: translateX(0%);
        }
    }
}
</style>