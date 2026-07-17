const env = require('../config/env');

// reqres.in's demo /api/users endpoints now require an API key (x-api-key),
// confirmed directly against the live API - reqres.in's own documentation
// describing these as unauthenticated is out of date. Get a free key at
// https://app.reqres.in and set it as REQRES_API_KEY.
const REQUEST_HEADERS = {
  'x-api-key': env.api.apiKey,
};

function createUser(request, payload) {
  return request.post(`${env.api.baseUrl}/api/users`, { data: payload, headers: REQUEST_HEADERS });
}

function getUser(request, userId) {
  return request.get(`${env.api.baseUrl}/api/users/${userId}`, { headers: REQUEST_HEADERS });
}

function updateUser(request, userId, payload) {
  return request.put(`${env.api.baseUrl}/api/users/${userId}`, {
    data: payload,
    headers: REQUEST_HEADERS,
  });
}

module.exports = { createUser, getUser, updateUser };
