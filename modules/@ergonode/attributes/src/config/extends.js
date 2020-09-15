/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL,
} from '@Attributes/defaults/attributes';
import {
    createOptionsData,
    prepareOptionsData,
    prepareParametersData,
    prepareTextAreaData,
    setParametersData,
    setTextAreaData,
    setTranslation,
    updateOptionsData,
    updateTranslation,
} from '@Attributes/extends/methods';

import {
    Components,
    Icons,
    Store,
} from './imports';

const getTypeConfiguration = ({
    $this, type,
}) => {
    switch (type) {
    case 'DATE':
        return {
            params: {
                key: 'format',
                value: $this.state.dictionaries.dateFormats,
                fieldName: 'parameters',
            },
        };
    case 'UNIT':
        return {
            params: {
                key: 'unit',
                value: $this.state.dictionaries.units,
                fieldName: 'parameters',
            },
        };
    case 'PRICE':
        return {
            params: {
                key: 'currency',
                value: $this.state.dictionaries.currencies,
                fieldName: 'parameters',
            },
        };
    case 'TEXT_AREA':
        return {
            params: {
                key: 'richEdit',
                fieldName: 'parameters',
            },
        };
    case 'SELECT':
        return {
            params: {
                fieldName: 'options',
            },
        };
    case 'MULTI_SELECT':
        return {
            params: {
                fieldName: 'options',
            },
        };
    default:
        return null;
    }
};

export default {
    dictionaries: [
        {
            stateProp: 'attrTypes',
            dataFormat: {},
            requestPath: '/dictionary/attributes/types',
        },
    ],
    extendStore: {
        attribute: Store.Attribute,
    },
    extendMethods: {
        '@Attributes/store/attribute/action/createAttribute/__before': ({
            $this, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'DATE':
                case 'UNIT':
                case 'PRICE':
                    return prepareParametersData({
                        $this,
                        typeConfig,
                    });
                case 'TEXT_AREA':
                    return prepareTextAreaData({
                        $this,
                        typeConfig,
                    });
                case 'SELECT':
                case 'MULTI_SELECT':
                    return prepareOptionsData({
                        $this,
                        typeConfig,
                    });
                default:
                    return {};
                }
            }
            return {};
        },
        '@Attributes/store/attribute/action/createAttribute/__after': ({
            $this, data, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'SELECT':
                case 'MULTI_SELECT':
                    return createOptionsData({
                        $this,
                        typeConfig,
                        data,
                    });
                default:
                    return {};
                }
            }
            return {};
        },
        '@Attributes/store/attribute/action/updateAttribute/__before': ({
            $this, type, data,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'SELECT':
                case 'MULTI_SELECT':
                    prepareOptionsData({
                        $this,
                        typeConfig,
                    });
                    updateOptionsData({
                        $this,
                        data,
                    });
                    return {};
                case 'NUMERIC':
                case 'TEXT':
                case 'TEXT_AREA':
                    return updateTranslation({
                        $this,
                    });
                default:
                    return {};
                }
            }
            return {};
        },
        '@Attributes/store/attribute/action/updateAttribute/__after': ({
            $this, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'SELECT':
                case 'MULTI_SELECT':
                    $this.commit('attribute/REMOVE_UPDATED_OPTION');
                    break;
                default:
                    break;
                }
            }
        },
        '@Attributes/store/attribute/action/getAttributesOptionsByType/__after': ({
            $this, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'TEXT':
                    // TODO: Temporary till BE will create SKU as an attribute
                    return [
                        SKU_MODEL,
                    ];
                default:
                    return [];
                }
            }
            return [];
        },
        '@Attributes/store/attribute/action/getAttribute/__after': ({
            $this, data, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'DATE':
                case 'UNIT':
                case 'PRICE':
                    setParametersData({
                        $this,
                        data,
                        typeConfig,
                    });
                    break;
                case 'TEXT_AREA':
                    setTranslation({
                        $this,
                        data,
                    });
                    setTextAreaData({
                        $this,
                        data,
                        typeConfig,
                    });
                    break;
                case 'NUMERIC':
                case 'TEXT':
                    setTranslation({
                        $this,
                        data,
                    });
                    break;
                default:
                    break;
                }
            }
        },
    },
    extendComponents: {
        '@Attributes/components/Forms/AttributeForm': {
            DATE: {
                component: Components.AttributeFormParamsSelect,
                props: {
                    getParams: $this => getTypeConfiguration({
                        $this: $this.$store,
                        type: 'DATE',
                    }),
                },
            },
            UNIT: {
                component: Components.AttributeFormParamsSelect,
                props: {
                    getParams: $this => getTypeConfiguration({
                        $this: $this.$store,
                        type: 'UNIT',
                    }),
                },
            },
            PRICE: {
                component: Components.AttributeFormParamsSelect,
                props: {
                    getParams: $this => getTypeConfiguration({
                        $this: $this.$store,
                        type: 'PRICE',
                    }),
                },
            },
            TEXT_AREA: {
                component: Components.AttributeFormParamsToggle,
                props: {
                    getParams: () => getTypeConfiguration({
                        type: 'TEXT_AREA',
                    }),
                },
            },
            SELECT: {
                component: Components.AttributeFormOptions,
            },
            MULTI_SELECT: {
                component: Components.AttributeFormOptions,
            },
        },
        '@Attributes/components/Forms/AttributeTranslationForm': {
            NUMERIC: {
                component: Components.AttributeTranslationFormPlaceholder,
            },
            TEXT: {
                component: Components.AttributeTranslationFormPlaceholder,
            },
            TEXT_AREA: {
                component: Components.AttributeTranslationFormPlaceholder,
            },
            SELECT: {
                component: Components.AttributeTranslationFormOptions,
            },
            MULTI_SELECT: {
                component: Components.AttributeTranslationFormOptions,
            },
        },
        '@Attributes/components/Lists/AttributeListElement/Icon': {
            NUMERIC: {
                component: Icons.IconNumeric,
            },
            TEXT: {
                component: Icons.IconText,
            },
            TEXT_AREA: {
                component: Icons.IconTextArea,
            },
            SELECT: {
                component: Icons.IconSelect,
            },
            MULTI_SELECT: {
                component: Icons.IconMultiSelect,
            },
            DATE: {
                component: Icons.IconDate,
            },
            UNIT: {
                component: Icons.IconUnit,
            },
            PRICE: {
                component: Icons.IconPrice,
            },
            IMAGE: {
                component: Icons.IconImage,
            },
        },
    },
};
