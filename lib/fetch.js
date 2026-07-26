'use strict';

const Ua = require('x-fakeua');

async function lynxFetch(url, options = {}) {
  const target = new URL(url);
  const method = (options.method || 'GET').toUpperCase();

  const headers = {
    Accept: [
      'application/json',
      'application/ld+json',
      'application/problem+json',
      'application/xml',
      'text/xml',
      'text/plain',
      'text/html',
      'application/xhtml+xml',
      'application/javascript',
      'text/javascript',
      'text/css',
      'image/avif',
      'image/webp',
      'image/apng',
      'image/svg+xml',
      'image/*',
      'audio/*',
      'video/*',
      'application/pdf',
      'application/octet-stream',
      '*/*'
    ].join(', '),

    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'User-Agent':
      Ua('random') ||
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',

    Host: target.host,
    Origin: target.origin,
    Referer: `${target.origin}/`,
    Connection: 'keep-alive',
    DNT: '1',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',

    ...options.headers
  };

  if (!['GET', 'HEAD'].includes(method)) {
    headers['Content-Type'] ??= 'application/json';
  }

  const response = await global.fetch(url, {
    ...options,
    method,
    headers
  });

  const type = (response.headers.get('content-type') || '').toLowerCase();

  let data;

  try {
    if (type.includes('json')) {
      data = await response.json();
    } else if (
      type.includes('text') ||
      type.includes('html') ||
      type.includes('xml') ||
      type.includes('javascript') ||
      type.includes('css')
    ) {
      data = await response.text();
    } else {
      data = Buffer.from(await response.arrayBuffer());
    }
  } catch {
    data = null;
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    redirected: response.redirected,
    url: response.url,
    method,
    headers: Object.fromEntries(response.headers.entries()),
    response
  };
}

function request(method) {
  return async (url, data, options = {}) => {
    const opts = {
      ...options,
      method
    };

    if (data !== undefined && !['GET', 'HEAD'].includes(method)) {
      if (
        typeof data === 'string' ||
        Buffer.isBuffer(data) ||
        data instanceof Uint8Array ||
        data instanceof URLSearchParams ||
        data instanceof FormData
      ) {
        opts.body = data;
      } else {
        opts.body = JSON.stringify(data);
      }
    }

    return lynxFetch(url, opts);
  };
}

lynxFetch.get = (url, options = {}) =>
lynxFetch(url, { ...options, method: 'GET' });
lynxFetch.delete = request('DELETE');
lynxFetch.post = request('POST');
lynxFetch.put = request('PUT');
lynxFetch.patch = request('PATCH');
lynxFetch.head = (url, options = {}) =>
lynxFetch(url, { ...options, method: 'HEAD' });

lynxFetch.options = (url, options = {}) =>
  lynxFetch(url, { ...options, method: 'OPTIONS' });

lynxFetch.create = function (defaults = {}) {
  const instance = async (url, options = {}) => {
    const target = defaults.baseURL
      ? new URL(url, defaults.baseURL).toString()
      : url;

    return lynxFetch(target, {
      ...defaults,
      ...options,
      headers: {
        ...(defaults.headers || {}),
        ...(options.headers || {})
      }
    });
  };

  ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].forEach(method => {
    instance[method] = (url, data, options = {}) => {
      const target = defaults.baseURL
        ? new URL(url, defaults.baseURL).toString()
        : url;

      return lynxFetch[method](target, data, {
        ...defaults,
        ...options,
        headers: {
          ...(defaults.headers || {}),
          ...(options.headers || {})
        }
      });
    };
  });

  return instance;
};

module.exports = lynxFetch;