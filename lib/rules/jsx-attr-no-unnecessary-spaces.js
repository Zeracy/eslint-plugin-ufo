const { isObject } = require('../common/index');

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforce consistent spacing inside attributes',
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
                /**
                 * @type {boolean}
                 */
                const valueIsObject = isObject(node.value);

                /**
                 * @type {Object}
                 */
                const value = valueIsObject ? node.value.value : node.value;

                if (value && (value.endsWith(' ') || value.indexOf('  ') !== -1)) {
                    /**
                     * @type {Object}
                     */
                    const valueNode = valueIsObject ? node.value : node.value.value;
                    /**
                     * @type {number}
                     */
                    const start = (valueNode).start + 1;
                    /**
                     * @type {number}
                     */
                    const end = (valueNode).end - 1;

                    context.report({
                        node,
                        message: 'Avoid unnecessary spaces.',
                        fix: (fixer) => fixer.replaceTextRange(
                            [start, end],
                            value.replace(/ {2,}/g, ' ').trim(),
                        ),
                    });
                }
            },
        };
    },
};
