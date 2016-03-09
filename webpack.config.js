var path = require('path');
var webpack = require('webpack');


<!-- entry: path.resolve(__dirname, 'main.jsx')-->

module.exports = {
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, './entrys/201513569/diminishMainCompoundUnChecked.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: "./build",
        colors: true,
        historyApiFallback: true,
        inline: true,
        port:3000,
        hot:true,
        proxy:{
            '/gradms/bsuims/*.do':{
                    target: 'http://localhost:8080/',
                    secure: false
            }
        }
    },
    plugins: [
       new webpack.HotModuleReplacementPlugin()
    ],module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'jsx-loader?harmony'
            },
            { test: /\.css$/, loader: "style!css" },
            {test:/\.json$/,loader:"json"},
            {
                test: /\.jsx?$/,
                loader:'babel',
                exclude:'/node_modules/',
                query: {
                    presets: ['es2015','react']
                }
            },
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/gif"}
        ]
    }
};