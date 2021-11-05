module.exports = {
  publicPath: '/bid-value-reduction/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
};