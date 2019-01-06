const { commonConfig, isProduction } = require("./webpack.default");

const webpackElectron = {
  ...commonConfig,
  target: "electron-main",
  entry: {
    main: "./main/index.js",
  },
  devtool: isProduction ? undefined : "inline-source-map",
};

const webpackReact = {
  ...commonConfig,
  target: "electron-renderer",
  entry: {
    renderer: "./renderer/index.tsx",
  },
  devtool: isProduction ? undefined : "inline-source-map",
};

console.log("isProduction = " + isProduction);

if (isProduction) {
  module.exports = [webpackElectron, webpackReact];
} else {
  module.exports = [webpackReact];
}
