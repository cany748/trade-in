const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    extract: false,
    loaderOptions: {
      css: {
        url: false,
      },
      stylus: {
        stylusOptions: {
          import: [path.resolve(__dirname, "./src/css/settings.styl")],
        },
      },
    },
  },
});
