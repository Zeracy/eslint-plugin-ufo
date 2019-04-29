/**
 * @type {Array}
 */
const defaultWhitelist = [
    'true',
    'false',
];

/**
 * @param {Array} whitelist
 * @param {string} value
 * @returns {boolean}
 */
const isWhitelisted = (whitelist, value) => whitelist.indexOf(value) > -1;

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce literal attributes over expressions when possible',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    whitelist: {
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
         * @type {Array}
         */
        const { whitelist = defaultWhitelist } = context.options[0];

        return {
            /**
            * @param {Object} node
            * @constructor
            */
            JSXAttribute (node) {
                /**
                 * @type {Object}
                 */
                const expressionSubNode = node.value ? node.value.expression : {};

                if (expressionSubNode && expressionSubNode.type === 'Literal') {
                    /**
                     * @type {Object}
                     */
                    const expression = expressionSubNode;

                    if (!isWhitelisted(whitelist, expression.raw)) {
                        context.report({
                            node,
                            message: `Can not use expressions for non-whitelisted literal values.`,
                            fix: (fixer) => fixer.replaceTextRange(node.value.range, `"${expression.value}"`),
                        });
                    }
                }
            },
        };
    },
};
