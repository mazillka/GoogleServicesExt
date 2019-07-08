const path = require('path');
const copy = require('copy-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [{
    watch: true,
    entry: {
        contentscript: './src/contentscript.js',
        background: './src/background.js',
        popup: './src/popup.js',
        options: './src/options.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/js'),
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                miniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ],
        }],
    },
    plugins: [
        new copy([
            { from: './static/html', to: path.resolve(__dirname, './dist/html') },
            { from: './static/icons', to: path.resolve(__dirname, './dist/icons') },
            { from: './static/img', to: path.resolve(__dirname, './dist/img') },
            { from: './static/svg', to: path.resolve(__dirname, './dist/svg') },
            { from: './manifest.json', to: path.resolve(__dirname, './dist/') }
        ]),
        new miniCssExtractPlugin({
            filename: "../css/[name].css"
        }),
        new optimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ]
}];
