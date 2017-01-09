module.exports = {
  entry: './site/javascripts/index.js',
  output: {
    filename: 'index.js',
    path: './site/build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
