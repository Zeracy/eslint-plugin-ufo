const { isObject } = require('../common/index');
const { getNodeSubAttribute } = require('../common/node');

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce the removal of px units on height and width attributes',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        fixable: 'code',
    },

    /**
     * @param {Object} context
     * @returns {*}
     */
    create (context) {
        return {
            /**
             * @param {Object} node
             * @constructor
             */
            JSXAttribute (node) {
                const propKey = getNodeSubAttribute(node, 'name');
                if (propKey === 'height' || propKey === 'width') {
                    const valueIsObject = isObject(node.value);
                    const value = getNodeSubAttribute(node, 'value');
                    if (value && value.endsWith('px')) {
                        const valueSubObject = (valueIsObject ? node.value : node.value.value);
                        const start = valueSubObject.start + 1;
                        const end = valueSubObject.end - 1;
                        context.report({
                            node,
                            message: `Should not use px on ${propKey} since it is the default unit.`,
                            fix: (fixer) => fixer.replaceTextRange(
                                [start, end],
                                value.replace('px', ''),
                            ),
                        });
                    }
                }
            },
        };
    },
};
