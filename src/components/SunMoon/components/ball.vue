<template>
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
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    const props = defineProps({
        ball: {
            type: String,
        },
        rotateStatus: {
            type: Boolean,
        },
        ballStatus: {
            type: Boolean,
        },
    })

    const craterList = [
        { id: 1, size: 0.18, top: '15%', left: '38%', },
        { id: 2, size: 0.32, top: '46%', left: '13%', },
        { id: 3, size: 0.22, top: '61%', left: '61%', },
    ]
</script>

<style>
    .sun-moon-button-box {

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

    @keyframes moon-rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>