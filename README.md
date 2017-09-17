# Bernard Mordan

Clone the repo and run `npm install`. You can run the unit tests with `npm test`.

Run the microservice with `npm start` and it will attach itself to port `8080`.

```
curl http://localhost:8080/clinics/postcode/cr91pj
```

# Clinics test
For this exercise we would like you to build a small microservice that provides
data on UK clinics.

## Data

`/clinics/postcode/:postcode`

This endpoint should:
Accept a UK postcode, such as SW11 4LU
Provide a JSON response with results that match the full postcode only
Each result item should include:
organisation_id
name

The response might look something like:

```json
{
  "results": [
    {
      "organisation_id": "40957",
      "name": "Dodds Clinic"
    },
    {
      "organisation_id": "40755",
      "name": "Battersea Clinic"
    }
  ]
}
```

## Name endpoint

`/clinics/city/:name`

This endpoint should:
Accept the name of a city such as Southampton
Provide a JSON response with a results object that contains all of the
partial_postcodes found and how many of them where found
The response might look something like:

```json
{
  "results": {
    "N9": 4,
    "EC3N": 2,
    "W5": 7,
    "W1T": 5,
    "SW2": 2
  }
}
```

Notes
On this exercise we're more interested in the way you solve the problem than
the app just working. You should try to solve the problem elegantly instead of
just make it work with second class code. Please only spend a max of 2-4
hours on the project - don't worry if you don't get time to complete both of
the endpoints.


Things we're looking for:
Principles of functional programming and pure functions
Clean, modular, extensible code
Unit tests
