# axios-smart-client

> 🚀 Smart Axios Wrapper for Developers

A plug-and-play HTTP client that simplifies API requests using axios, especially in real-world apps with:
- Multiple base URLs (e.g., auth, user, admin)
- Authorization tokens (from localStorage, cookies, etc.)
- Retry logic
- Loading indicators and unified error handling
- TypeScript, CommonJS, and ESM support
- **No need to install axios separately!** axios is installed automatically as a dependency.

---

## ✨ Features
- ✅ Multi-baseURL support
- ✅ Token injection
- ✅ Retry failed requests
- ✅ Unified error formatting
- ✅ TypeScript, CommonJS, and ESM support
- ✅ Tiny, dependency-light, and fast

---

## 🚀 Installation

```bash
npm install axios-smart-client
```

---

## 🛠 Usage

### JavaScript (CommonJS)
```js
const { init, api } = require('axios-smart-client');

init({
  baseURLs: { user: 'https://api.example.com/user' },
  getToken: () => localStorage.getItem('token'),
  showLoading: true,
  retries: 2,
  onError: (err) => alert(err.message),
});

api('user', 'get', '/profile')
  .then(user => console.log(user))
  .catch(err => console.error(err));
```

### JavaScript (ESM) or TypeScript
```js
import { init, api } from 'axios-smart-client';

init({
  baseURLs: { user: 'https://api.example.com/user' },
  getToken: () => localStorage.getItem('token'),
  showLoading: true,
  retries: 2,
  onError: (err) => alert(err.message),
});

const user = await api('user', 'get', '/profile');
```

---

## ⚙️ API

### `init(config)`
- `baseURLs`: `{ [key: string]: string }` — Required. Map of base names to URLs.
- `retries`: `number` — Optional. Number of retry attempts (default: 1).
- `showLoading`: `boolean` — Optional. Show loading logs (default: false).
- `getToken`: `() => string | null` — Optional. Function to get auth token.
- `onError`: `(err) => void` — Optional. Error handler callback.

### `api(base, method, url, data?)`
- `base`: `string` — The base key from `baseURLs`.
- `method`: `string` — HTTP method (get, post, put, patch, delete).
- `url`: `string` — Endpoint path.
- `data`: `any` — Optional. Payload for POST/PUT/PATCH.

Returns a `Promise` resolving to the response data or rejecting with a normalized error.

---

## 📦 License
MIT
