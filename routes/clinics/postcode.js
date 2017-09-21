const Postcode = require('postcode')
const BOOM = require('boom')
const Joi = require('joi-browser')
const datastore = require('../../data/data.json')

module.exports = {
  method: 'GET',
  path: '/clinics/postcode/{postcode}',
  handler: (request, reply) => {
    const postcode = new Postcode(request.params.postcode)

    if (!postcode.valid()) {
      return reply(BOOM.notAcceptable(`${request.params.postcode} is not a valid UK postcode`))
    }

    const outcode = postcode.outcode()

    const results = datastore.result
      .filter(clinic => clinic.partial_postcode === outcode)
      .filter(clinic => {
        const clinicPostcode = clinic.postcode.toLowerCase().split(' ').join('')
        const requestPostcode = postcode.normalise().toLowerCase().split(' ').join('')
        return clinicPostcode === requestPostcode
      })
      .map(clinic => {
        const { organisation_id, name } = clinic
        return { organisation_id, name }
      })

    if (!results) return reply(BOOM.notFound())

    reply({results})
  },
  config: {
    validate: {
      params: {
        postcode: Joi.string().min(4).required()
      }
    },
    description: 'Returns the name and organisation_id of clinics',
    notes: 'Pass a postcode and receive an array of objects with the name and id of the clinics with that postcode'
  }
}
