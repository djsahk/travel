// var serverBase = 'http://localhost:8088'
var serverBase = 'http://39.108.189.156'
var v1 = serverBase + '/api/'
export default {
  BASE_SERVER_URL: serverBase,
  API_URL_USER: v1 + 'user',
  API_URL_SPOT: v1 + 'spot',
  API_URL_COMMENTS: v1 + 'comments',
  API_URL_FOOTPRINT: v1 + 'footprint',
	API_URL_COLLECTION: v1 + 'collection',
  API_URL_NOTE: v1 + 'note',
 }
