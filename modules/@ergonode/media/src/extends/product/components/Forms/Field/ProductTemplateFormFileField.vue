/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <UploadFiles
            :style="{ height: '100%' }"
            :value="fieldData"
            :label="label"
            :required="properties.required"
            :disabled="disabled"
            height="100%"
            @input="onValueChange" />
    </ProductTemplateFormField>
</template>

<script>
import UploadFiles from '@Media/components/Inputs/UploadFile/UploadFiles';
import ProductTemplateFormField from '@Media/extends/product/components/Forms/Field/ProductTemplateFormField';

export default {
    name: 'ProductTemplateFormFileField',
    components: {
        UploadFiles,
        ProductTemplateFormField,
    },
    props: {
        size: {
            type: Object,
            default: () => ({}),
        },
        position: {
            type: Object,
            default: () => ({}),
        },
        properties: {
            type: Object,
            default: () => ({}),
        },
        drafts: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        changedValues: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        fieldData() {
            if (typeof this.changedValues[this.fieldKey] !== 'undefined') {
                return this.changedValues[this.fieldKey];
            }

            const {
                attribute_code,
            } = this.properties;

            return this.drafts[this.languageCode][attribute_code] || [];
        },
        parameter() {
            if (!this.properties.parameters) return null;

            const [
                key,
            ] = Object.keys(this.properties.parameters);

            return this.properties.parameters[key];
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                fieldKey: this.fieldKey,
                languageCode: this.languageCode,
                productId: this.$route.params.id,
                elementId: this.properties.attribute_id,
                code: this.properties.attribute_code,
                value,
            });
        },
    },
};
</script>
