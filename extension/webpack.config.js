const path = require('path');
const copy = require('copy-webpack-plugin');

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
    plugins: [
        new copy([
            { from: './static/html', to: path.resolve(__dirname, './dist/html') },
            { from: './static/icons', to: path.resolve(__dirname, './dist/icons') },
            { from: './static/img', to: path.resolve(__dirname, './dist/img') },
            { from: './src/css', to: path.resolve(__dirname, './dist/css') },
            { from: './manifest.json', to: path.resolve(__dirname, './dist/') },
        ]),
    ],
}];
