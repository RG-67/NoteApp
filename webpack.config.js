const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web', // Alias react-native to react-native-web
    },
    extensions: ['.web.js', '.js'],
  },
  entry: './src/index.js',  // Entry file should be src/index.js
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.join(__dirname, 'public'), // Replace contentBase with static
    port: 3000,
    hot: true,
    open: true,
  },
};