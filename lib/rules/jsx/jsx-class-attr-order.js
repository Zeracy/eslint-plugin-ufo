const { getNodeSubAttribute } = require('../common/node');

/**
 * @type {Object}
 */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce the declaration of the usage of generic classes before helpers',
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
                 * @type {Object}
                 */
                const propKey = getNodeSubAttribute(node, 'name');

                if (propKey === 'class') {
                    /**
                     * @type {string}
                     */
                    const value = getNodeSubAttribute(node, 'value');
                    /**
                     * @type {boolean}
                     */
                    let foundHelper = false;

                    value && value.split(' ').map((cssClass) => {
                        if (cssClass.startsWith('-')) {
                            foundHelper = true;
                        } else if (
                            !(
                                cssClass.startsWith('-') ||
                                cssClass.startsWith('_')
                            ) && foundHelper
                        ) {
                            context.report(node, `${cssClass} Should be used before any helpers`);
                        }
                    });
                }
            },
        };
    },
};
