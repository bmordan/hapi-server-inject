/* global test describe expect */

const server = require('../server')

describe('/clinics/city/:name', () => {
  test('get a summary of the number of clinics in a named area', () => {
    const testRoute = {
      method: 'GET',
      url: '/clinics/city/croydon'
    }

    const expectedResult = {
      results: {
        CR9: 2,
        CR0: 8
      }
    }

    return server.inject(testRoute)
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.payload)).toEqual(expectedResult)
      })
  })

  test('if your city is not in the dataset it will 404', () => {
    const testRoute = {
      method: 'GET',
      url: '/clinics/city/london'
    }

    return server.inject(testRoute)
      .then((res) => {
        expect(res.statusCode).toBe(404)
      })
  })
})
