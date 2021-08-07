const nodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',
  httpsAdapter: 'https',
  apiKey: 'eJGkA4tAM5ktBnPWWeuwAa8UACzEOdZR',
  formatter: null,
}

const geocoder = nodeGeocoder(options)

module.exports = geocoder
