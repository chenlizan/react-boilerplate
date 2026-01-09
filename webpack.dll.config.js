const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const dll = {
  mode: "development",
  entry: {
    vendor: ["antd", "react", "react-dom", "react-redux", "react-router-dom", "redux", "redux-actions"],
  },
  output: {
    path: path.resolve(__dirname, "dll"),
    filename: "vendor.dll.js",
    library: "vendor_dll",
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, "dll", "vendor-manifest.json"),
      name: "vendor_dll",
    }),
    new ProgressBarPlugin(),
  ],
};

module.exports = dll;
