const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname),
    //页面入口文件配置
    entry: './src/index.ts',
     //入口文件输出配置
    output: {
        path: path.resolve('./dist/'),
        filename: 'mgvalidator.dev.js',
        library : 'validator'
    },
    module: {
        //加载器配置
        'loaders': [
            {
              'test': [/\.ts(x?)$/],
              'loaders': ['ts-loader'],
              'exclude': [/node_modules/]
            }
          ]
    },
    resolve: {
        extensions: ['.tsx', '.ts'],
    }
};