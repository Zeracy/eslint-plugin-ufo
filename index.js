module.exports = {
    rules: {
        'jsx-attr-no-unnecessary-expression': require('./lib/rules/jsx/jsx-attr-no-unnecessary-expression'),
        'jsx-attr-no-unnecessary-spaces': require('./lib/rules/jsx/jsx-attr-no-unnecessary-spaces'),
        'jsx-class-attr-order': require('./lib/rules/jsx/jsx-class-attr-order'),
        'jsx-disallowed-attr': require('./lib/rules/jsx/jsx-disallowed-attr'),
        'jsx-height-width-attr-no-px': require('./lib/rules/jsx/jsx-height-width-attr-no-px'),
        'jsx-no-empty-attr': require('./lib/rules/jsx/jsx-no-empty-attr'),
        'jsx-attr-require-alt': require('./lib/rules/jsx/jsx-attr-require-alt'),
        'require-function-jsdoc-on-export': require('./lib/rules/jsdoc/require-function-jsdoc-on-export'),
        'no-finally-in-promise': require('./lib/rules/promise/no-finally-in-promise'),
    },
    configs: {
        recommended: {
            plugins: [
                'ufo',
            ],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            rules: {
                'ufo/jsx-attr-no-unnecessary-spaces': 2,
                'ufo/jsx-class-attr-order': 2,
                'ufo/jsx-no-empty-attr': ['error', { attributes: ['height', 'width', 'class'] }],
                'ufo/jsx-height-width-attr-no-px': 2,
                'ufo/jsx-disallowed-attr': ['error', { removable: ['style'], replaceable: { className: 'class' } }],
                'ufo/jsx-attr-no-unnecessary-expression': ['error', { whitelist: ['true', 'false'] }],
                'ufo/require-function-jsdoc-on-export': ['error'],
                'ufo/no-finally-in-promise': 2,
                'ufo/jsx-attr-require-alt': 2,
            },
        },
    },
};
