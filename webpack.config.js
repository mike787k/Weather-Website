const path = require("path");

module.exports = {
  // The entry point for your application
  entry: "./src/index.js",

  // The output configuration for your compiled assets
  output: {
    // The directory where webpack will output your compiled assets
    path: path.resolve(__dirname, "dist"),
    // The filename format for your compiled assets
    filename: "./src/App.js"
  },

  // Configuration for resolving module requests
  resolve: {
    // A list of file extensions that should be considered when resolving modules
    extensions: [".js", ".json"],
    // A list of module aliases to make import paths shorter and more readable
    alias: {
      "src": path.resolve(__dirname, "src")
    },
    // A fallback configuration for cases where the requested module is not found
    fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": require.resolve("path-browserify"),
        "zlib": false,
        "http": false,
        "https": false,
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("node-libs-browser/mock/url"),
        "crypto": false,
        "crypto-browserify": require.resolve('crypto-browserify'), 
    }
  }
};