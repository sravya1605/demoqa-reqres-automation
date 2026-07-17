const env = require('../config/env');

function createUser(request, payload) {
  return request.post(`${env.api.baseUrl}/api/users`, { data: payload });
}

function getUser(request, userId) {
  return request.get(`${env.api.baseUrl}/api/users/${userId}`);
}

function updateUser(request, userId, payload) {
  return request.put(`${env.api.baseUrl}/api/users/${userId}`, { data: payload });
}

module.exports = { createUser, getUser, updateUser };
