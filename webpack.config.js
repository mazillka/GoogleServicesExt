const devMode = process.env.NODE_ENV !== "production";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ZipBundlerPlugin = require("webpack-zip-bundler");

module.exports = [{
    entry: {
        contentscript: "./src/js/contentscript.js",
        background: "./src/js/background.js",
        popup: "./src/js/popup.js",
        options: "./src/js/options.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist/"),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", {
                        discardComments: {
                            removeAll: true
                        }
                    }]
                }
            })
        ],
    },
    module: {
        rules: [
            // html
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: !devMode,
                        interpolate: true,
                        root: path.resolve(__dirname, "src"),
                        attrs: [":data-src"]
                    }
                }]
            },

            // sass, css
            {
                test: /\.(scss)|(css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => {
                            return [
                                require("precss"),
                                require("autoprefixer")
                            ];
                        }
                    }
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([
            { from: "./src/html", to: "html" },
            { from: "./src/icons", to: "icons" },
            { from: "./src/images", to: "images" },
            { from: "./src/manifest.json", to: "manifest.json" }
        ]),
        
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
        }),

        new ZipBundlerPlugin()
    ]
}];
