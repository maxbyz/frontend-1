/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    route, app, error, store,
}) => {
    const {
        meta = [],
    } = route;
    const [
        item,
    ] = meta;

    if (store.state.authentication.token && store.state.authentication.user) {
        if (item && item.privileges && item.privileges.read
                && !app.$hasAccess([
                    item.privileges.read,
                ])) {
            error({
                statusCode: 403,
            });
        }
    }
};
