const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outPath = path.join(__dirname, './build');

const sourcePath = path.join(__dirname, './src');
const assetsPath = path.join(__dirname, './assets');

const isProduction = process.env.NODE_ENV === 'production';

const styleLoader = !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader;
const devtool = !isProduction ? 'source-map' : 'none';

const dotenv = require('dotenv').config({
    path: isProduction ? './.env.production' : './.env.development',
});

const moduleWebpack = {
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
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        },
        {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
            ],
        },
        {
            test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
            include: [sourcePath, assetsPath],
            use: [{
                loader: 'file-loader',
                options: {
                    name: './images/[name].[hash].[ext]',
                },
            }],
        },
    ],
};

const commonConfig = {
    context: sourcePath,
    output: {
        path: outPath,
        filename: '[name].js',
    },
    mode: 'development',
    devtool,
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules', sourcePath],
        alias: {
            src: sourcePath,
        },
    },
    devServer: {
        open: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './renderer/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([
            {from: '../package.json', to: '../build'},
        ]),
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(isProduction),
            APP_VERSION: JSON.stringify(require('./package.json').version),
            API_URL: JSON.stringify(dotenv.parsed.API_URL),
        }),
    ],
    module: moduleWebpack,
};

module.exports = {commonConfig, isProduction};
