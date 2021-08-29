module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/version/2'
      },
    ]
  },
}
