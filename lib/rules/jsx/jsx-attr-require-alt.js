const { getNodeSubAttribute } = require('../common/node');

/**
 * @type {string[]}
 */
const defaultTargetElements = [
    'img',
    'LazyImage',
    'Image',
];

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'enforce the usage of the alt attribute on custom components',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    elements: {
                        type: 'object',
                        additionalProperties: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        fixable: false,
    },

    /**
     * @param {Object} context
     * @returns {*}
     */
    create (context) {
        const { elements } = context.options[0] || {};
        const targetElements = elements || defaultTargetElements;
        return {
            /**
             * @param {Object} node
             * @constructor
             */
            JSXOpeningElement (node) {
                /**
                 * @type {string}
                 */
                const currentNodeName = getNodeSubAttribute(node, 'name');
                if (targetElements.includes(currentNodeName)) {
                    const hasAltAttribute = node.attributes.reduce(
                        (acc, attribute) => getNodeSubAttribute(attribute, 'name') === 'alt' || acc,
                        false,
                    );
                    if (!hasAltAttribute) {
                        context.report({
                            node,
                            message: `Alt attribute is required on ${currentNodeName}.`,
                        });
                    }
                }
            },
        };
    },
};
