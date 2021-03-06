const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'none',
    entry: {
        client: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[contenthash:4].js',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                // strictMath: true,
                            }
                        },
                    }
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            ['import', {
                                libraryName: 'antd',
                                libraryDirectory: 'es',
                                style: true // `style: true` ????????? less ??????
                            }, 'antd-import'],
                        ],
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
    ],
    node: {
        fs: 'empty',
    },
    optimization: {
        minimizer: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:4].css'
            }),
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin(),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 5,
            name: false,
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'initial',
                    priority: 100,
                    reuseExistingChunk: false,
                    enforce: true,
                    test: m => /\/node_modules\/(react|redux|classnames|prop-types|lodash|acorn|rc-)/.test(m.context),
                    // test: m => /\/node_modules\/(react|redux|classnames|prop-types|acorn)/.test(m.context),
                },
                antd: {
                    name: 'antd',
                    chunks: 'initial',
                    priority: 90,
                    reuseExistingChunk: true,
                    enforce: true,
                    test: m => /\/node_modules\/(antd|@ant-design)/.test(m.context),
                },
            }
        },
    },
}
