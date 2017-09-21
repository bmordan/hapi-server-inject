/* global test describe expect */

const server = require('../server')

describe('/clinics/postcode/:postcode', () => {
  test('must include a postcode', () => {
    const testRoute = {
      method: 'GET',
      url: '/clinics/postcode/'
    }

    return server.inject(testRoute)
      .then((res) => {
        expect(res.statusCode).toBe(404)
      })
  })

  test('returns an array of results', () => {
    const testRoute = {
      method: 'GET',
      url: '/clinics/postcode/cr91pj'
    }

    const matches = {
      results: [
        {
          organisation_id: '58961',
          name: 'Edridge Road Community Health Centre'
        },
        {
          organisation_id: '77668',
          name: 'Edridge Road Walk-In Centre'
        }
      ]
    }

    return server.inject(testRoute)
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.payload)).toEqual(matches)
      })
  })

  test('returns a filtered array of results', () => {
    const testRoute = {
      method: 'GET',
      url: '/clinics/postcode/CR01AA'
    }

    const matches = {
      results: []
    }

    return server.inject(testRoute)
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.payload)).toEqual(matches)
      })
  })

  test('must pass a valid postcode', () => {
    const testRoute = {
      method: 'GET',
      url: '/clinics/postcode/test-code'
    }

    return server.inject(testRoute)
      .then((res) => {
        expect(res.statusCode).toBe(406)
      })
  })
})
