/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path
            :d="drawingCommands"
            :transform="transform" />
    </Icon>
</template>

<script>

export default {
    name: 'IconInfo',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M13,17 L11,17 L11,15 L13,15 L13,17 L13,17 Z M13,13 L11,13 L11,7 L13,7 L13,13 L13,13 Z';
        },
        transform() {
            return 'translate(12, 12) rotate(-180) translate(-12, -12)';
        },
    },
};
</script>
