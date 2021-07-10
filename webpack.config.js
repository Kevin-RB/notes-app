const path = require('path');

module.exports = {
    // mode: 'production',
    entry: {
        index: ['@babel/polyfill', './src/index.js']
    },
    output: {
        filename: '[name]-main.js',
        path: path.resolve(__dirname, 'public/scripts'),
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
};