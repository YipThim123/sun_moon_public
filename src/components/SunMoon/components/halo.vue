<template>
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
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    const props = defineProps({
        halo: {
            type: String,
        },
        ballStatus: {
            type: Boolean,
        },
    })
</script>

<style>
    .sun-moon-button-box {

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
    }
</style>