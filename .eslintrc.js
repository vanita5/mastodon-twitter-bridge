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
        db: false,
        app: false,
        serversideAPI: false,
    },
    rules: {
        indent: [2, 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/react-in-jsx-scope': 0,
        'react/no-danger': 0,
        'no-empty-function': 0,
        'no-console': 0,
        'max-len': [0, 110],
        'comma-dangle': [
            2,
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
    },
};
