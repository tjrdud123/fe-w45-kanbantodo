const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    host: '127.0.0.1',
    contentBase: path.join(__dirname, "/dist"),
    compress: true,
    hot: true,
    inline: true,
    port: 9000,
    open: true
  },
  module: {
    rules: [
      {
        // scss
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        // js
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // image(png, jpg, jpeg)
        test: /\.(png|jp(e*)g)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: 'images/[hash]-[name].[ext]'
        }
      },
      {
        // image(svg)
        test: /\.svg$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' })
  ]
};