module.exports = {
    extends: 'marudor',
    parserOptions: {
        ecmaVersion: 7,
    },
    env: {
        browser: true,
        node: true,
    },
    globals: {
        __DEV__: false,
        __PROD__: false,
    },
    rules: {
        indent: [2, 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/react-in-jsx-scope': 0,
        'react/no-danger': 0,
        'no-empty-function': 0,
        'no-console': 0,
    },
};
