const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Generates the index.html file
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "Text Editor",
      }),
      // Injects the custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      // Generates the manifest.json file
      new WebpackPwaManifest({
        name: "Text Editor",
        short_name: "Editor",
        description: "A text editor application",
        background_color: "#ffffff",
        theme_color: "#000000",
        start_url: "./index.html",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/icon-192x192.png"),
            sizes: [192, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Babel loader for ES6+ syntax
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
