const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



// To export the config object
module.exports = {
    // Four concepts  for MODULES
    
  
    // 1.Entry Point 
    entry: ['@babel/polyfill', './src/js/index.js'],
    
     // 2.OutPut Property
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
     // 3.Mode
    //dev: webpack --mode development
    
    devServer: {
        contentBase: './dist'
    },
     // 4.Plugings
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    // 5. Loaders (Babel)
    module: {
        rules: [
            {
               test: /\.m?js$/, // Irregular Expression to test for files ending with .js
               exclude: /(node_modules|bower_components)/, // checks all files except the mods in this foler.
               use: {
                   loader: 'babel-loader' // Then apply the babel loader to all js files.
               }
            }
        ]
    }
};


