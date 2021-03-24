const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        client: './src/index.js',
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
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
                                style: true // `style: true` 会加载 less 文件
                            }, 'antd-import'],
                        ],
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
    ],
    node: {
        fs: 'empty',
    },
    devServer: {
        port: 9800,
        hot: true,
    }
}
