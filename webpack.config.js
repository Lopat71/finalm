const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");

const json = require("./package.json");
const project_name = json.name;
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
    isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // [
              //   "svgo",
              //   {
              //     name: "preset-default",
              //     params: {
              //       overrides: {
              //         removeViewBox: false,
              //         addAttributesToSVGElement: {
              //           attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
              //         },
              //       },
              //     },
              //   },
              // ],
            ],
          },
        },
        loader: false, // Skip problematic files instead of failing the build
      }),
    ],
  };

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"), // исправленный путь
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"), // исправленный путь
          to: path.resolve(__dirname, "app/assets"),
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
  ];

  return basePlugins;
};

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: "./js/main.js",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "app"),
    clean: true,
    publicPath: "",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "app"),
      watch: true,
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(?:|jpe?g|png|gif|svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: (pathData) => {
            const assetPath = pathData.filename.split('/').slice(1).join('/');
            return isDev ? `img/${assetPath}` : `img/[contenthash]_${assetPath}`;
          },
        },
      },
      {
        test: /\.(?:|woff2|woff)$/i,
        type: "asset/resource",
        generator: {
          filename: (pathData) => {
            const assetPath = pathData.filename.split('/').slice(1).join('/');
            return isDev ? `fonts/${assetPath}` : `fonts/[contenthash]_${assetPath}`;
          },
        },
      },
    ],
  },
};
