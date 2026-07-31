const test = require('node:test');
const assert = require('node:assert/strict');

const { createApiUrl } = require('./api-url.js');

test('joins same-origin API paths', () => {
  const apiUrl = createApiUrl('/api');
  assert.equal(apiUrl('/mini_app/dashboard'), '/api/mini_app/dashboard');
});

test('joins external API paths', () => {
  const apiUrl = createApiUrl('https://example.test/api/');
  assert.equal(
    apiUrl('/webhook/images/file/1/photo.jpg?tok=abc'),
    'https://example.test/api/webhook/images/file/1/photo.jpg?tok=abc',
  );
});

test('does not duplicate legacy /api prefixes', () => {
  const apiUrl = createApiUrl('https://example.test/api');
  assert.equal(
    apiUrl('/api/mini_app/image/exclusive/phase1/photo.jpg?tok=abc'),
    'https://example.test/api/mini_app/image/exclusive/phase1/photo.jpg?tok=abc',
  );
});

test('keeps absolute URLs unchanged', () => {
  const apiUrl = createApiUrl('/api');
  assert.equal(apiUrl('https://cdn.example.test/photo.jpg'), 'https://cdn.example.test/photo.jpg');
});
