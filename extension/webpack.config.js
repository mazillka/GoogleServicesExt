const path = require('path');
const copy = require('copy-webpack-plugin');

module.exports = [{
    watch: true,
    entry: {
        helpers: './src/js/helpers.js', 
        contentscript: './src/js/contentscript.js',
        db: './src/js/db.js',
        background: './src/js/background.js',
        popup: './src/popup.js',
        options: './src/options.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/js'),
    },
    plugins: [
        new copy([
            { from: './src/manifest.json', to: path.resolve(__dirname, './dist/') },
            { from: './src/html', to: path.resolve(__dirname, './dist/html') },
            { from: './src/css', to: path.resolve(__dirname, './dist/css') },
            { from: './src/icons', to: path.resolve(__dirname, './dist/icons') },
            { from: './src/img', to: path.resolve(__dirname, './dist/img') },
        ]),
    ],
}];
