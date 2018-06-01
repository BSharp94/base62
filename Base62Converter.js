const DEFAULT_CHARACTER_SET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const INVERTED_CHARACTER_SET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
class Base62Converter {

  constructor(charset = DEFAULT_CHARACTER_SET) {
    this.charset = DEFAULT_CHARACTER_SET;
  }
  
  Encode(value) {
    var arr = value.split("").map(i => i.charCodeAt(0));
    return EncodeArr(arr, this.charset);
  }

  Decode(value) {
    var arr = value.split("").map(i => this.charset.indexOf(i));
    return DecodeArr(arr, this.charset);
  }
}

// Private 
function EncodeArr(arr, charset) {
  var converted = BaseConvert(arr, 256, 62);
  return converted.map(c => charset[c]).join("");
}

// private
function DecodeArr(arr, charset) {
  var converted = BaseConvert(arr, 62, 256);
  return converted.map(c => String.fromCharCode(c)).join("");
}

// private
function BaseConvert(source, sourceBase, targetBase) {
  var result = [];
  var count = 0;
  var digit;
  var quotent;
  while(source.length > 0) {
    var quotent = [];
    var remainder = 0;
    source.map(s => {
      var accumulator = s + remainder * sourceBase;
      digit = Math.floor(accumulator / targetBase);
      remainder = accumulator % targetBase;
      if (quotent.length > 0 || digit > 0)
        quotent.push(digit)
    })
    result.unshift(remainder);
    source = quotent;
  }
  return result;
}

export default Base62Converter;