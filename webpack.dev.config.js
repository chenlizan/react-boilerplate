const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

const PORT = 4000;

const clientConfig = {
  mode: "development",
  devServer: {
    open: true,
    port: PORT,
    historyApiFallback: true,
    hot: true,
  },
  devtool: "eval-source-map",
  entry: ["@babel/polyfill", path.resolve(__dirname, "src/index")],
  output: {
    chunkFilename: "chunk.[contenthash:5].js",
    filename: "[name].js",
    publicPath: "/",
    clean: false,
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          "style-loader",
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                namedExport: false,
                exportLocalsConvention: "camelCase",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
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
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dll/vendor-manifest.json"),
      name: "vendor_dll",
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "dll/vendor.dll.js"),
      publicPath: "/",
      outputPath: "",
      typeOfAsset: "js",
      attributes: { defer: false },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: true,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      fix: true,
      failOnError: false,
      context: path.resolve(__dirname, "src"),
      eslintPath: "eslint/use-at-your-own-risk",
      lintDirtyModulesOnly: true,
    }),
    new StylelintPlugin({
      configFile: ".stylelintrc",
      files: "**/*.(c|le)ss",
      fix: true,
    }),
    new ProgressBarPlugin(),
  ],
  target: "web",
  optimization: {
    emitOnErrors: false,
    moduleIds: "named",
  },
};

module.exports = clientConfig;
