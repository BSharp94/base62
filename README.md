# Base62

Base62 encoder and decoder based on [Base62 for PHP](https://github.com/tuupola/base62) for Javascript.  This library is useful for converting data into shortened strings good for URL shortening and/or obfuscating auto-incrementing resource ids from being exposed through RESTful APIs.

## Usage
```
import  Base62Converter from '../Base62Converter';

...

var converter = new Base62Converter();

var b62 = converter.Encode("34");  // "3PQ
var b10 = converter.Decode("3PQ"); // 34
```

## License

[The MIT LIcense (MIT)](./LICENSE).