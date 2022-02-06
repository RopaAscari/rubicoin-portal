const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@enums": path.resolve(__dirname, "./src/enums"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@cache": path.resolve(__dirname, "./src/cache"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@queries": path.resolve(__dirname, "./src/queries"),
      "@actions": path.resolve(__dirname, "./src/actions"),
      "@typings": path.resolve(__dirname, "./src/typings"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@reducers": path.resolve(__dirname, "./src/reducers"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
};
