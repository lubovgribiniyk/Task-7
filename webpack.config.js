const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    entry: "./src/js/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "build.js",
      publicPath: "dist/"
    },
    devtool: mode === "development" ? "source-map" : false,
    devServer: {
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "sass-loader"]
          })
        }
      ]
    },
    plugins: [new ExtractTextPlugin("style.css")]
  };
};
