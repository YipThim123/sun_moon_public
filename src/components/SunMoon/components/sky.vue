<template>
    <div class="sky">
        <div class="inner-shadow"></div>
        <div :class="[ballStatus ? 'night' : 'day']"></div>
    </div>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    const props = defineProps({
        ballStatus: {
            type: Boolean,
        },
    })
</script>

<style>
    .sun-moon-button-box {

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
    }
</style>