const { init, api } = require('./dist/index.cjs.js');

init({
  baseURLs: { test: 'https://httpbin.org' },
  getToken: () => 'demo-token',
  showLoading: true,
  retries: 1,
  onError: (err) => console.log('Handled error:', err),
});

api('test', 'get', '/get')
  .then(res => console.log('Success:', res))
  .catch(err => console.error('API Error:', err));
