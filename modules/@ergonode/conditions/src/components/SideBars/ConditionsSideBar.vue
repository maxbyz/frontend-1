/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Conditions.condition.components.ConditionsSideBar.title')"
        :search-value="searchValue"
        :searchable="true"
        :items="conditions"
        @search="onSearch">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
        </template>
        <template #item="{ item }">
            <ConditionSideBarElement
                :scope="scope"
                :item="item"
                :dragging-element-type="draggingElementType"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import ConditionSideBarElement from '@Conditions/components/SideBars/ConditionSideBarElement';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ConditionsSideBar',
    components: {
        ConditionSideBarElement,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        group: {
            type: String,
            required: true,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
    },
    async fetch() {
        await this.getConditions({
            group: this.group,
            onSuccess: this.getConditionsSuccess,
            onError: this.getConditionsError,
        });
    },
    data() {
        return {
            searchValue: '',
            allConditions: [],
            conditions: [],
            isPrefetchingData: true,
        };
    },
    methods: {
        ...mapActions('condition', [
            'getConditions',
        ]),
        onSearch(value) {
            const lowerCaseSearchValue = value.toLowerCase();

            this.conditions = this.allConditions.filter(({
                name,
            }) => name.toLowerCase().includes(lowerCaseSearchValue));

            this.searchValue = value;
        },
        getConditionsSuccess(conditions) {
            this.allConditions = conditions;
            this.conditions = conditions;

            this.isPrefetchingData = false;
        },
        getConditionsError() {
            this.isPrefetchingData = false;
        },
    },
};
</script>
