/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands1" />
        <path :d="drawingCommands2" />
    </Icon>
</template>

<script>

export default {
    name: 'IconHeadingThree',
    inheritAttrs: false,
    computed: {
        drawingCommands1() {
            return 'M17.5824 17.1392C19.8693 17.1392 21.505 15.8814 21.5 14.1413C21.505 12.8736 20.6996 11.9687 19.2031 11.7798V11.7003C20.3416 11.4964 21.1271 10.691 21.1222 9.54756C21.1271 7.94174 19.7202 6.67896 17.6122 6.67896C15.5241 6.67896 13.9531 7.90197 13.9233 9.66191H15.9865C16.0114 8.88634 16.7223 8.38421 17.6023 8.38421C18.4723 8.38421 19.054 8.9112 19.049 9.67682C19.054 10.4773 18.3729 11.0192 17.3935 11.0192H16.4439V12.6001H17.3935C18.5469 12.6001 19.2678 13.1768 19.2628 13.9971C19.2678 14.8075 18.5717 15.3643 17.5874 15.3643C16.6378 15.3643 15.9268 14.8672 15.8871 14.1214H13.7195C13.7543 15.9013 15.3452 17.1392 17.5824 17.1392Z';
        },
        drawingCommands2() {
            return 'M3 17.0001L5 17V13H10V17H12V7H10V11.0192H5V7H3V17.0001Z';
        },
    },
};
</script>
