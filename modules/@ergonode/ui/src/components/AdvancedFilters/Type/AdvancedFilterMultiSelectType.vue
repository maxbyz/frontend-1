/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilter
        :scope="scope"
        :index="index"
        :value="filterValue"
        :hint="hint"
        :title="title"
        :parameters="parameters"
        :filter-id="filter.id"
        @remove="onRemove"
        @swap="onSwap"
        @apply="onApplyValue">
        <template #dropdown="{ onApply }">
            <AdvancedFilterMultiselectContent
                :value="localValue"
                :options="filter.options"
                :language-code="filter.languageCode"
                @input="onValueChange" />
            <MultiselectDropdownFooter
                v-if="filter.options.length"
                @apply="onApply"
                @clear="onClear" />
        </template>
    </AdvancedFilter>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import AdvancedFilter from '@UI/components/AdvancedFilters/AdvancedFilter';
import AdvancedFilterMultiselectContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterMultiselectContent';

export default {
    name: 'AdvancedFilterMultiSelectType',
    components: {
        AdvancedFilter,
        AdvancedFilterMultiselectContent,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Filter data model
         */
        filter: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: [],
            }),
        },
    },
    data() {
        return {
            localValue: {},
        };
    },
    computed: {
        parameters() {
            if (!this.filter.parameters) return '';

            return Object.values(this.filter.parameters).join(', ');
        },
        title() {
            const [
                code,
            ] = this.filter.id.split(':');

            return this.filter.label || `#${code}`;
        },
        hint() {
            const [
                code,
                languageCode,
            ] = this.filter.id.split(':');

            return this.filter.label ? `${code} ${languageCode}` : null;
        },
        filterValue() {
            if (this.localValue.isEmptyRecord) return 'Empty records';

            const value = [];

            this.localValue[FILTER_OPERATOR.EQUAL].forEach((id) => {
                const option = this.filter.options.find(opt => opt.id === id);

                if (option) {
                    value.push(option.value || `#${option.key}`);
                }
            });

            return value.join(', ');
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.localValue = {
                    ...this.value,
                };
            },
        },
    },
    methods: {
        onValueChange({
            key, value,
        }) {
            this.localValue[key] = value;
        },
        onRemove(index) {
            this.$emit('remove', index);
        },
        onSwap(payload) {
            this.$emit('swap', payload);
        },
        onClear() {
            this.localValue = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: [],
            };
        },
        onApplyValue() {
            if (JSON.stringify(this.value) !== JSON.stringify(this.localValue)) {
                this.$emit('apply', {
                    key: this.filter.id,
                    value: this.localValue,
                });
            }
        },
    },
};
</script>
