/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>

export default {
    name: 'IconRestore',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12ZM12 3C7.03 3 3 7.03 3 12H0L4 16L8 12H5C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C10.49 19 9.09 18.51 7.94 17.7L6.52 19.14C8.04 20.3 9.94 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z';
        },
    },
};
</script>
