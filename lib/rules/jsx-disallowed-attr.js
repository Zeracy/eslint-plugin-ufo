const { isObject } = require('../common/index');
const { getNodeAttribute } = require('../common/node');

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'enforce the removal of attributes deemed as disallowed',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    removable: {
                        type: 'array',
                    },
                    replaceable: {
                        type: 'object',
                        additionalProperties: true,
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
         * @type {Array}
         */
        const { removable = [], replaceable = {} } = context.options[0];
        /**
         * @type {Array}
         */
        const replaceableKeys = Object.keys(replaceable);
        return {
            /**
             * @param {Object} node
             * @constructor
             */
            JSXAttribute (node) {
                /**
                 * @type {Object}
                 */
                const currentAttribute = getNodeAttribute(node, 'name');
                /**
                 * @type {string}
                 */
                const currentAttributeName = isObject(node.name) ? node.name.name : node.name;

                if (removable.indexOf(currentAttributeName) > -1) {
                    context.report({
                        node,
                        message: `Can not use the ${currentAttributeName} attribute.`,
                        fix: (fixer) => fixer.remove(node),
                    });
                }

                if (replaceableKeys.indexOf(currentAttributeName) > -1) {
                    context.report({
                        node,
                        message: `Use ${replaceable[currentAttributeName]} instead of the ${currentAttributeName} attribute.`,
                        fix: (fixer) => fixer.replaceTextRange(currentAttribute.range, replaceable[currentAttributeName]),
                    });
                }
            },
        };
    },
};
