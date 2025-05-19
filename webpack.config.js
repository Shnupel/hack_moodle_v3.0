import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import WebpackExtReloader from "webpack-ext-reloader";
import { fileURLToPath } from 'url';
import path from "path";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: {
        content: path.resolve(__dirname, "./src/scripts/index.ts"),
        background: path.resolve(__dirname, "./src/scripts/background.ts"),
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 200,
        poll: 1000
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "VPN fast",
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "popup.html",
            inject: "body"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, "./src/manifest.json"), to: "manifest.json" },
                { from: path.resolve(__dirname, "./src/public"), to: "" },
            ]
        }),
        new WebpackExtReloader({
            manifest: path.resolve(__dirname, "src/manifest.json"),
            entries: {
                background: "background",
                contentScript: "content",
            },
            reloadPage: true,
        }),

    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}