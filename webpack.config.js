const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'docs')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    target: 'web',
    devServer: {
        port: '3000',
        hot: isDev,
        open: isDev
    },
    devtool: isDev? 'source-map' : false,
    plugins: [
        new ESLintPlugin(),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),

        new CopyPlugin({
            patterns: [
              {from: path.resolve(__dirname, 'src/favicon.ico'),
              to: path.resolve(__dirname, 'docs')},
            ],
          }),
          new MiniCssExtractPlugin({
              filename: filename('css')
          }),

    ],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [

                MiniCssExtractPlugin.loader,


                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                  }
                }
              },

          ]
    }
}

