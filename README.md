# ts-mongo-fetcher
Node.js API that fetches data from a MongoDB and return it formatted.

It needs a `.env` file with `MONGODB_URI` env var value in order to fetch data from a MongoDB database. 

## First of all

`$ npm install`

## For testing locally:

`$ npm run dev`

## Running the tests:

`$ npm run test`

## Request example:
POST localhost:8000/
```json
{
    "startDate": "2016-11-26",
    "endDate": "2016-12-26",
    "minCount": 1000,
    "maxCount": 8888
}
```
