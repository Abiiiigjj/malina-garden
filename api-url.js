(function (root) {
  'use strict';

  function createApiUrl(apiBase) {
    const base = String(apiBase || '/api').replace(/\/$/, '');

    return function apiUrl(path) {
      if (/^https?:\/\//i.test(path || '')) return path;

      const suffix = '/' + String(path || '').replace(/^\/+/, '');
      // Compatibility with older API responses that already included the
      // reverse-proxy prefix. Never produce /api/api/.
      if (base.endsWith('/api') && suffix.startsWith('/api/')) {
        return base.slice(0, -4) + suffix;
      }
      return base + suffix;
    };
  }

  root.createApiUrl = createApiUrl;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createApiUrl };
  }
}(typeof globalThis !== 'undefined' ? globalThis : this));
