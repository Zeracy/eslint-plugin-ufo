module.exports = {
    rules: {
        'jsx-attr-no-unnecessary-expression': require('./lib/rules/jsx-attr-no-unnecessary-expression'),
        'jsx-attr-no-unnecessary-spaces': require('./lib/rules/jsx-attr-no-unnecessary-spaces'),
        'jsx-class-attr-order': require('./lib/rules/jsx-class-attr-order'),
        'jsx-disallowed-attr': require('./lib/rules/jsx-disallowed-attr'),
        'jsx-height-width-attr-no-px': require('./lib/rules/jsx-height-width-attr-no-px'),
        'jsx-no-empty-attr': require('./lib/rules/jsx-no-empty-attr'),
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
            },
        },
    },
};
