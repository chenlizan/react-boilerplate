/**
 * Created by chenlizan on 2017/8/11.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const clientConfig = {
    entry: {
        client: [path.resolve(__dirname, 'src/index')],
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-actions']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: 'chunk.[chunkhash:5].js',
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                }]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', {'targets': {'browsers': ['defaults', 'ie >= 9']}}], /*'es2015-ie',*/ 'react', 'stage-0'],
                        plugins: [
                            ['import', [
                                {'libraryName': 'antd', 'style': 'css'},
                                {'libraryName': 'antd-mobile', 'style': 'css'}
                            ]],
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            namedExport: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }]
                })
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            },
            {
                test: /\.less$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            namedExport: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: "less-loader"
                    }]
                })
            },
            {
                test: /\.less/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "less-loader"
                    }]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            favicon: 'public/favicon.ico',
            filename: 'index.html',
            template: 'public/index.html'
        }),
        new ExtractTextPlugin('[name].[contenthash:5].css'),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ecma: 8,
                compress: {
                    comparisons: false
                },
                output: {
                    ascii_only: true
                },
                warnings: true
            }
        }),
        new ProgressBarPlugin()
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    target: 'web'
};

module.exports = clientConfig;
