# percent-decode

Decode a percent-encoded string according to the URL spec.

Unlike `decodeURIComponent()` which throws an error if the input
contains a `%` not followed by two hexadecimal digits.

```js
const percentDecode = require('percent-decode');

const request = '/100% real file ✓.html';
const encoded = new URL(request, 'http://localhost').pathname;
const decoded = percentDecode(encoded);

console.log(encoded); // /100%%20real%20file%20%E2%9C%93.html
console.log(decoded); // /100% real file ✓.html
```
