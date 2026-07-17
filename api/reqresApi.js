const env = require('../config/env');

// reqres.in's own QA guidance notes that shared CI IP ranges (e.g. GitHub
// Actions) are more likely to be flagged by its bot protection than a normal
// browser request. Sending a stable, realistic User-Agent avoids that.
const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
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
