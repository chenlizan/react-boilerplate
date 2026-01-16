const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const clientConfig = {
  mode: "production",
  entry: ["@babel/polyfill", path.resolve(__dirname, "src/index")],
  output: {
    chunkFilename: "chunk.[contenthash:8].js",
    filename: "[name].[contenthash:8].js",
    publicPath: "./",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                ["@babel/plugin-proposal-private-methods", { loose: true }],
                ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
                ["import", { libraryName: "antd", style: "css" }, "ant"],
                ["import", { libraryName: "antd-mobile", style: "css" }, "ant-mobile"],
                ["lodash"],
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                namedExport: false,
                exportLocalsConvention: "camelCase",
                localIdentName: "[hash:base64:8]",
              },
              esModule: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    fallback: {
      dgram: false,
      dns: false,
      fs: false,
      http2: false,
      net: false,
      tls: false,
      child_process: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/chunk.[contenthash:8].css",
    }),
    new ProgressBarPlugin(),
  ],
  target: "web",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
        },
        common: {
          minChunks: 2,
          name: "common",
          chunks: "all",
          priority: 5,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
    moduleIds: "deterministic",
    emitOnErrors: false,
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = clientConfig;
