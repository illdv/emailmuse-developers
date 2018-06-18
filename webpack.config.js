const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body',
})

const outPath = path.join(__dirname, './dist');
const sourcePath = path.join(__dirname, './src');
const assetsPath = path.join(__dirname, './assets');

const styleLoader = process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
    entry: './index.tsx',
    context: sourcePath,
    output: {
        path: outPath,
        filename: 'index_bundle.js',
    },
    mode: 'development',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
            {
                test: /.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: styleLoader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
                include: [sourcePath, assetsPath],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './images/[indicator].[hash].[ext]'
                    }
                }]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules', sourcePath],
        alias: {
            src: sourcePath,
        },
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new MiniCssExtractPlugin({
            filename: "[indicator].css",
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin([
            { from: '../init.js', to: '../dist' },
            { from: '../package.json', to: '../dist' }
        ])
    ],
}