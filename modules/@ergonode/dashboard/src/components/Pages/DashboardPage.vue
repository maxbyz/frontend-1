/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dashboard-page">
        <VerticalFixedScroll>
            <div class="dashboard-page__content">
                <WelcomeUser />
                <div class="dashboard-page__widgets">
                    <ProductsWidget />
                    <CompletenessWidget />
                    <StatusesWidget />
                </div>
            </div>
        </VerticalFixedScroll>
    </div>
</template>

<script>
import WelcomeUser from '@Dashboard/components/WelcomeUser/WelcomeUser';
import CompletenessWidget from '@Dashboard/components/Widgets/CompletenessWidget';
import ProductsWidget from '@Dashboard/components/Widgets/ProductsWidget';
import StatusesWidget from '@Dashboard/components/Widgets/StatusesWidget';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'DashboardPage',
    components: {
        VerticalFixedScroll,
        WelcomeUser,
        ProductsWidget,
        CompletenessWidget,
        StatusesWidget,
    },
};
</script>

<style lang="scss" scoped>
    .dashboard-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        &__content {
            padding: 32px 40px 40px;
        }

        &__widgets {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
            grid-template-rows: minmax(80px, auto);
            grid-auto-rows: 80px;
            grid-gap: 40px;
            margin-top: 40px;
        }
    }
</style>
