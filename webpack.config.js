const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '../public/index.html',
    filename: 'index.html',
    inject: 'body',
})

const outPath = path.join(__dirname, './dist');
const sourcePath = path.join(__dirname, './src');

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
                use: [{
                    loader: styleLoader,
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true,
                    },
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules', sourcePath],
        alias: {
            src: sourcePath,
        }
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
}