/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="nodesComponent.component"
        v-bind="nodesComponent.props"
        v-on="nodesComponent.listeners" />
</template>

<script>
import DatePickerContentHeader from '@UI/components/DatePicker/DatePickerContentHeader';
import DatePickerMonth from '@UI/components/DatePicker/DatePickerMonth';
import DatePickerMonths from '@UI/components/DatePicker/DatePickerMonths';
import DatePickerYears from '@UI/components/DatePicker/DatePickerYears';
import {
    CALENDAR_TYPE,
    getHeaderForCalendarDaysType,
    getMonthIndex,
} from '@UI/models/calendar';

export default {
    name: 'DatePickerCalendar',
    components: {
        DatePickerMonth,
        DatePickerContentHeader,
        DatePickerMonths,
        DatePickerYears,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Date,
            default: null,
        },
        /**
         * The value from/to which is selection - displayed as lighted color between range to - from
         */
        rangeValue: {
            type: Date,
            default: null,
        },
        /**
         * Chosen year
         */
        year: {
            type: Number,
            required: true,
        },
        /**
         * Displaying years
         */
        years: {
            type: Array,
            required: true,
        },
        /**
         * Chosen month
         */
        month: {
            type: Number,
            required: true,
        },
        /**
         * Type of calendar view
         */
        calendarType: {
            type: String,
            required: true,
            validator: value => Object.values(CALENDAR_TYPE).indexOf(value) !== -1,
        },
        /**
         * Determines whether to exclude past dates
         */
        disabledPast: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        nodesComponent() {
            switch (this.calendarType) {
            case CALENDAR_TYPE.DAY:
                return {
                    component: DatePickerMonth,
                    props: {
                        value: this.value,
                        rangeValue: this.rangeValue,
                        month: this.month,
                        year: this.year,
                        disabledPast: this.disabledPast,
                    },
                    listeners: {
                        select: this.onDaySelect,
                    },
                };
            case CALENDAR_TYPE.MONTH:
                return {
                    component: DatePickerMonths,
                    props: {
                        value: this.value,
                        rangeValue: this.rangeValue,
                        year: this.year,
                    },
                    listeners: {
                        select: this.onMonthSelect,
                    },
                };
            default: return {
                component: DatePickerYears,
                props: {
                    value: this.value,
                    rangeValue: this.rangeValue,
                    nodes: this.years,
                    year: this.year,
                },
                listeners: {
                    select: this.onYearSelect,
                },
            };
            }
        },
    },
    methods: {
        onDaySelect(date) {
            this.$emit('input', new Date(date.year, date.month - 1, date.day));
        },
        onMonthSelect(month) {
            const monthIndex = getMonthIndex(month) + 1;
            this.$emit('month', monthIndex);
            this.$emit('calendar-type', CALENDAR_TYPE.DAY);
            this.$emit('calendar-header', getHeaderForCalendarDaysType(monthIndex, this.year));
        },
        onYearSelect(year) {
            this.$emit('year', year);
            this.$emit('calendar-type', CALENDAR_TYPE.MONTH);
            this.$emit('calendar-header', year);
        },
    },
};
</script>
