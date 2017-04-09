// @flow
const path = require('path');
const glob = require('glob');

module.exports = {
    /*eslint no-unused-vars: 0*/
    // $FlowFixMe
    webpack: (config, { dev }) => {
        config.module.rules.push(
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    failOnError: true,
                    failOnWarning: true
                }
            },
            {
                test: /\.(css|scss|sass)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'babel-loader',
                    'raw-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['styles', 'node_modules']
                                .map(d => path.join(__dirname, d))
                                .map(g => glob.sync(g))
                                .reduce((a, c) => a.concat(c), []),
                        },
                    }
                ],
            }
        );
        return config;
    },
};
