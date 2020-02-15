const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.default = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'object-utils.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'object-utils',
    libraryTarget: 'umd',
  },
  node: {
    process: false,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  optimization: {
    minimize: true,
  },
};
