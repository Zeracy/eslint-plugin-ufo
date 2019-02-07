const { isObject } = require('../common/index');

/**
 * @param {*} value
 * @returns {boolean}
 */
const isValueEmpty = (value) => value ? !value.trim() : typeof value !== 'undefined';

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'enforce the removal of the defined attributes when they have no value associated',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    attributes: {
                        type: 'array',
                    },
                },
                additionalProperties: false,
            },
        ],
        fixable: 'code',
    },

    /**
     * @param {Object} context
     * @returns {*}
     */
    create (context) {
        /**
         * @type {Object}
         */
        const { attributes } = context.options[0];

        return {
            /**
             * @param {Object} node
             * @constructor
             */
            JSXAttribute (node) {
                /**
                 * @type {Object}
                 */
                const propKey = isObject(node.name) ? node.name.name : node.name;

                if (attributes.indexOf(propKey) > -1) {
                    /**
                     * @type {boolean}
                     */
                    const valueIsObject = isObject(node.value);
                    /**
                     * @type {Object}
                     */
                    const value = valueIsObject ? node.value.value : node.value;

                    if (isValueEmpty(value)) {
                        context.report({
                            node,
                            message: `Should not contain empty ${propKey} attribute.`,
                            fix: (fixer) => fixer.remove(node),
                        });
                    }
                }
            },
        };
    },
};
