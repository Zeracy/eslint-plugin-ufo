const { isObject } = require('../common/index');

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
                const propKey = isObject(node.name) ? node.name.name : node.name;
                if (propKey === 'height' || propKey === 'width') {
                    const valueIsObject = isObject(node.value);
                    const value = valueIsObject ? node.value.value : node.value;
                    if (value && value.endsWith('px')) {
                        const start = (valueIsObject ? node.value : node.value.value).start + 1;
                        const end = (valueIsObject ? node.value : node.value.value).end - 1;
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
