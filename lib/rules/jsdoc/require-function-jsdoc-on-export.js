const options = {
    ClassDeclaration: false,
    FunctionDeclaration: true,
    ArrowFunctionExpression: true,
    MethodDefinition: false,
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce the usage of Jsdoc on functions when they are declared as an export',
            category: 'ECMAScript 6',
            recommended: true,
            url: 'https://github.com/Zeracy/eslint-plugin-ufo',
        },
        fixable: 'code',
    },
    create (context) {
        const source = context.getSourceCode();

        /**
         * @param {Object} node
         * @returns {void}
         */
        function checkJsDoc (node) {
            const jsdocComment = source.getJSDocComment(node);

            if (!jsdocComment && isExportNode(node)) {
                report(node);
            }
        }

        /**
         * @param {Object} node
         * @returns {void}
         */
        function checkClassMethodJsDoc (node) {
            if (node.parent.type === 'MethodDefinition') {
                checkJsDoc(node);
            }
        }

        /**
         * @param {Object} node
         * @returns {void}
         */
        function isExportNode (node) {
            const parentType = node.parent && node.parent.type;
            if (parentType) {
                return [
                    'ExportDefaultDeclaration',
                    'ExportNamedDeclaration',
                ].includes(parentType);
            }

            return false;
        }

        /**
         * @param {Object} node
         * @returns {void}
         */
        function report (node) {
            context.report(node, 'Missing JSDoc comment.');
        }

        return {
            ArrowFunctionExpression (node) {
                if (
                    options.ArrowFunctionExpression
                ) {
                    checkJsDoc(node);
                }
            },
            FunctionDeclaration (node) {
                if (options.FunctionDeclaration) {
                    checkJsDoc(node);
                }
            },
            FunctionExpression (node) {
                if (options.MethodDefinition) {
                    checkClassMethodJsDoc(node);
                }
            },
        };
    },
};
