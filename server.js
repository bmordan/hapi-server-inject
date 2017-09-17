const Hapi = require('hapi')
const requireDirectory = require('node-require-directory')
const routes = requireDirectory('./routes/')

const server = new Hapi.Server()

server.connection({ port: '8080' })
server.route(routes.clinics.postcode)
server.route(routes.clinics.city)

// don't call server.start if you are testing
// instead you can use server.inject to test handlers

if (!module.parent) {
  server.start(err => {
    if (err) throw new Error(err)
    console.log('Server running on port: ', server.info.port)
  })
}

module.exports = server
