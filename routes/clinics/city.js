const BOOM = require('boom')
const datastore = require('../../data/data.json')
const Joi = require('joi-browser')

module.exports = {
  method: 'GET',
  path: '/clinics/city/{city}',
  handler: (request, reply) => {
    const clinics = datastore.result.filter(clinic => {
      return clinic.city.toLowerCase() === request.params.city.toLowerCase()
    })

    if (!clinics.length) {
      return reply(BOOM.notFound(`${request.params.city} is not listed`))
    }

    const results = clinics.reduce((result, clinic) => {
      if (result[clinic.partial_postcode]) {
        result[clinic.partial_postcode] += 1
      } else {
        result[clinic.partial_postcode] = 1
      }
      return result
    }, {})

    reply({results})
  },
  config: {
    validate: {
      params: {
        city: Joi.string().min(1).required()
      }
    },
    description: 'Returns a lookup object of clinics',
    notes: 'The lookup object returned by this route has all the postcode outcodes for the city passed on the params as keys and the value is the number of clinics in that area.'
  }
}
