/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path
            :d="drawingCommands" />
    </Icon>
</template>

<script>

export default {
    name: 'IconPreview',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M12 6C7.90909 6 4.41545 8.488 3 12C4.41545 15.512 7.90909 18 12 18C16.0909 18 19.5845 15.512 21 12C19.5845 8.488 16.0909 6 12 6ZM11.9998 16.0001C9.74165 16.0001 7.90892 14.2081 7.90892 12.0001C7.90892 9.79212 9.74165 8.00012 11.9998 8.00012C14.258 8.00012 16.0907 9.79212 16.0907 12.0001C16.0907 14.2081 14.258 16.0001 11.9998 16.0001ZM9.54508 11.9999C9.54508 10.6719 10.6414 9.59985 11.9996 9.59985C13.3578 9.59985 14.4542 10.6719 14.4542 11.9999C14.4542 13.3279 13.3578 14.3999 11.9996 14.3999C10.6414 14.3999 9.54508 13.3279 9.54508 11.9999Z';
        },
    },
};
</script>
