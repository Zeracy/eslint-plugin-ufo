const { isPromise } = require('../common/promise');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce the no finally in promise policy due to compatibility with older browsers.',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        fixable: false,
    },
    create (context) {
        return {
            CallExpression (node) {
                if (isPromise(node)) {
                    if (
                        node.callee &&
                        node.callee.property &&
                        node.callee.property.name === 'finally'
                    ) {
                        context.report({
                            node: node.callee.property,
                            message: 'Usage of finally is not allowed.',
                        });
                    }
                }
            },
        };
    },
};
