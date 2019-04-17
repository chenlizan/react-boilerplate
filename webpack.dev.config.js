/**
 * Created by chenlizan on 2017/8/11.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const PORT = 3000;

const clientConfig = {
    devServer: {
        port: PORT,
        historyApiFallback: true
    },
    devtool: 'eval-source-map',
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index')],
    output: {
        chunkFilename: 'chunk.[chunkhash:5].js',
        filename: '[name].js',
        publicPath: '/'
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
                        presets: ['env', 'es2015', 'react', 'stage-0'],
                        plugins: [
                            ['import', [
                                {'libraryName': 'antd', 'style': 'css'},
                                {'libraryName': 'antd-mobile', 'style': 'css'}
                            ]], 'lodash', 'transform-decorators-legacy'
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
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            namedExport: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({flexbox: 'no-2009'})
                            ]
                        }
                    }]
                })
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.less$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            namedExport: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({flexbox: 'no-2009'})
                            ]
                        }
                    }, 'less-loader']
                })
            },
            {
                test: /\.less/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('development')}
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '.', 'dll'),
            manifest: require('./dll/vendor-manifest.json')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].[contenthash:5].css'),
        new HtmlWebpackPlugin({
            favicon: 'public/favicon.ico',
            template: 'public/index.html'
        }),
        new HtmlWebpackIncludeAssetsPlugin({assets: ['../dll/vendor.dll.js'], append: false}),
        new OpenBrowserPlugin({url: `http://localhost:${PORT}`, browser: 'chrome'}),
        new ProgressBarPlugin()
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    target: 'web'
};

module.exports = clientConfig;
