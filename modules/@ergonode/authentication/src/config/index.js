/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/authentication',
    order: 20,
    relations: [
        '@ergonode/core',
    ],
    aliases: {
        '@Authentication': '/',
    },
    plugins: [
        {
            ssr: true,
            src: './plugins/privilege',
        },
    ],
};
