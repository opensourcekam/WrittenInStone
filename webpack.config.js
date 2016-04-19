module.exports = {
  entry: "./app-client",
  output: {
    filename: "./public/javascripts/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
