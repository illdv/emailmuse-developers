const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
})

const styleLoader = process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'index_bundle.js',
    },
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
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
}