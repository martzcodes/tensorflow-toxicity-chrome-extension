const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    // toxicityPolyfill: path.join(
    //   __dirname,
    //   "../projects/toxicity-output/src/polyfills.ts"
    // ),
    // toxicityMain: path.join(
    //   __dirname,
    //   "../projects/toxicity-output/src/main.ts"
    // ),
    popup: path.join(__dirname, "../chrome-src/popup.ts"),
    options: path.join(__dirname, "../chrome-src/options.ts"),
    background: path.join(__dirname, "../chrome-src/background.ts"),
    content_script: path.join(__dirname, "../chrome-src/content_script.ts")
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
