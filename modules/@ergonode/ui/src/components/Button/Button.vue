/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :style="floatingStyle"
        :class="classes"
        :disabled="disabled"
        type="button"
        :aria-label="title">
        <!--
            @slot Prepend element - icon recommended
            @binding {string} color color of an element
        -->
        <slot
            name="prepend"
            :color="foregroundColor" />
        <span
            v-if="title"
            :class="titleClasses"
            v-text="title" />
        <!--
            @slot Append element - icon recommended
            @binding {string} color color of an element
        -->
        <slot
            name="append"
            :color="foregroundColor" />
        <slot />
    </button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREY_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    Z_INDEX_LVL_2,
} from '@UI/assets/scss/_js-variables/indexes.scss';

/**
 * `Button` is a default component to display action in page.
 * It may have any icon component inside `prepend` and `append` slots.
 */
export default {
    name: 'Button',
    props: {
        /**
         * The theme of the component
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.TINY,
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The floating state, absolute position relative to parent
         * @values top, left, bottom, right
         */
        floating: {
            type: Object,
            default: null,
        },
    },
    computed: {
        foregroundColor() {
            if (this.theme === THEME.SECONDARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
        floatingStyle() {
            if (!this.floating) return null;

            return {
                position: 'absolute',
                zIndex: Z_INDEX_LVL_2,
                ...this.floating,
            };
        },
        classes() {
            return [
                'button',
                `button--${this.theme}`,
                `button--${this.size}`,
            ];
        },
        titleClasses() {
            return [
                'button__title',
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .button {
        $button: &;

        position: relative;
        display: flex;
        align-items: center;
        width: max-content;
        white-space: nowrap;
        border: none;
        box-sizing: content-box;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        text-transform: uppercase;
        cursor: pointer;
        outline: none;

        &__title {
            letter-spacing: 0.5px;
        }

        &:disabled {
            cursor: not-allowed;
        }

        &--primary {
            background-color: $GREEN;

            &:hover:not(:disabled), &:focus {
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }

        &--destructive {
            background-color: $RED;

            &:hover:not(:disabled), &:focus {
                box-shadow: $ELEVATOR_DESTRUCTIVE_HOVER_FOCUS;
            }
        }

        &--primary, &--destructive {
            color: $WHITE;

            &:disabled {
                background-color: $GREY;
            }
        }

        &--secondary {
            background-color: transparent;
            color: $GRAPHITE;

            &:disabled {
                color: $GREY_DARK;
            }

            &:hover:not(:disabled), &:focus {
                background-color: $WHITE;
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }

        &--regular {
            height: 40px;
            padding: 0 12px;
            font: $FONT_BOLD_14_20;
        }

        &--small {
            height: 32px;
            padding: 0 8px;
        }

        &--tiny {
            height: 24px;
            padding: 0 3px;

            #{$button}__title {
                margin: 0 3px;
            }
        }

        &--small, &--regular {
            #{$button}__title {
                margin: 0 4px;
            }
        }

        &--tiny, &--small {
            #{$button}__title {
                font: $FONT_BOLD_12_16;
            }
        }
    }
</style>
