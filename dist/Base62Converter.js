var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CHARACTER_SET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var INVERTED_CHARACTER_SET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var Base62Converter = function () {
  function Base62Converter() {
    var charset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CHARACTER_SET;

    _classCallCheck(this, Base62Converter);

    this.charset = DEFAULT_CHARACTER_SET;
  }

  _createClass(Base62Converter, [{
    key: "Encode",
    value: function Encode(value) {
      var arr = value.split("").map(function (i) {
        return i.charCodeAt(0);
      });
      return EncodeArr(arr, this.charset);
    }
  }, {
    key: "Decode",
    value: function Decode(value) {
      var _this = this;

      var arr = value.split("").map(function (i) {
        return _this.charset.indexOf(i);
      });
      return DecodeArr(arr, this.charset);
    }
  }]);

  return Base62Converter;
}();

// Private 


function EncodeArr(arr, charset) {
  var converted = BaseConvert(arr, 256, 62);
  return converted.map(function (c) {
    return charset[c];
  }).join("");
}

// private
function DecodeArr(arr, charset) {
  var converted = BaseConvert(arr, 62, 256);
  return converted.map(function (c) {
    return String.fromCharCode(c);
  }).join("");
}

// private
function BaseConvert(source, sourceBase, targetBase) {
  var result = [];
  var count = 0;
  var digit;
  var quotent;
  while (source.length > 0) {
    var quotent = [];
    var remainder = 0;
    source.map(function (s) {
      var accumulator = s + remainder * sourceBase;
      digit = Math.floor(accumulator / targetBase);
      remainder = accumulator % targetBase;
      if (quotent.length > 0 || digit > 0) quotent.push(digit);
    });
    result.unshift(remainder);
    source = quotent;
  }
  return result;
}