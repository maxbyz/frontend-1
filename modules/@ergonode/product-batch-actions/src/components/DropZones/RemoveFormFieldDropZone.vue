/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            :hover-background-color="graphiteLightColor"
            :title="$t('@ProductBatchActions.productBatchAction.components.RemoveFormFieldDropZone.title')">
            <template #icon="{ color }">
                <IconRemoveFilter :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapState,
} from 'vuex';

export default {
    name: 'RemoveFormFieldDropZone',
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.FORM_FIELD;
        },
    },
};
</script>
