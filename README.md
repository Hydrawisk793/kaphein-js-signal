# kaphein-js-signal
A waitable object for Javascript based on ECMAScript 6 Promise.

## Requirements
Your environment must support ECMAScript 6 `Promise` class. If not available, it must be shimmed with a third-party implementation such as `bulebird`.
```javascript
const Promise = require("bulebird");
// On web browsers.
window.Promsie = Promise;
// On non-web browsers.
global.Promise = Promise;
```

## Usage

### Installation
```shell
npm install kaphein-js-signal
```

### Import
CommonJS style
```javascript
const { Signal } = require("kaphein-js-signal");
```
ECMAScript module style
```javascript
import { Signal } from "kaphein-js-signal";
```

### Examples
```javascript
(async () =>
{
    try
    {
        // Throws SingalTimeoutError after 2000ms.
        const signal = new Signal(2000);

        // Waits for a signal.
        const result = await signal;

        // Calls signal.emit({ foo : "foo" }) somewhere.

        // Outputs { foo : "foo" }
        console.debug(result);
    }
    catch(error)
    {
        // Throws an instance of SingalTimeoutError on timeout.
    }
})();
```
