const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "../chrome-src/popup.ts"),
    options: path.join(__dirname, "../chrome-src/options.ts"),
    background: path.join(__dirname, "../chrome-src/background.ts"),
    content_script: path.join(__dirname, "../chrome-src/content_script.ts")
    // poly: path.join(__dirname, "../dist/toxicity-output/es2015-polyfills.js"),
    // toxicity: path.join(__dirname, "../dist/toxicity-output/main.js")
  },
  output: {
    path: path.join(__dirname, "../dist/chrome/js"),
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "chrome-tsconfig.json"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
