module.exports = {
  entry: "./index.js",
  context:__dirname+"/components",
  devtool: 'source-map',
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module:{
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ["react",'es2015']
      }
    }
  ]
  }

}
