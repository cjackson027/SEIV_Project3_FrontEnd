module.exports = {
  devServer: {
    //host: 'localhost',
    port: 8081
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/2022/project3/t4/',
  transpileDependencies: ['vuetify'],
}

