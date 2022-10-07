const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: "development",
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'lite-lc-core.umd.js',
    library: {
      type: 'commonjs2'
    }
  },
  externals: {
    // 打包过程遇到以下依赖导入，不会打包对应库代码，而是调用window上的React和ReactDOM
    // import React from 'react'
    // import ReactDOM from 'react-dom'
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          // webpack中的顺序是【从后向前】链式调用的
          // 所以对于less先交给less-loader处理，转为css
          // 再交给css-loader
          // 最后导出css（MiniCssExtractPlugin.loader）
          // 所以注意loader的配置顺序
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }

        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ],
  },
  plugins: [
    // 插件用于最终的导出独立的css的工作
    new MiniCssExtractPlugin({
      filename: 'lite-lc-core.umd.css'
    }),
  ]
};
