/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="$t('@Roles.transition.components.TransitionFormRole.sectionTitle')">
        <RolesAutocomplete
            :data-cy="dataCyGenerator(roleFieldKey)"
            :value="roles"
            :clearable="true"
            :multiselect="true"
            :disabled="disabled"
            :error-messages="errors[roleFieldKey]"
            @input="setRolesValue" />
    </FormSection>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import RolesAutocomplete from '@Roles/components/Autocompletes/RolesAutocomplete';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TransitionFormRole',
    components: {
        RolesAutocomplete,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('statusTransition', [
            'roles',
        ]),
        roleFieldKey() {
            return 'roleId';
        },
    },
    methods: {
        ...mapActions('statusTransition', [
            '__setState',
        ]),
        setRolesValue(value) {
            this.__setState({
                key: 'roles',
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'roles',
                value,
            });
        },
        dataCyGenerator(key) {
            return `transition-${key}`;
        },
    },
};
</script>
