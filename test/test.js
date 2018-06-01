import 'babel-polyfill';
import  Base62Converter from '../Base62Converter';
const       assert = require('assert');

const testNums = {
  "62": "3bm",
  "154": "DWwG",
  "245": "DnvB",
  "432": "ELx4",
};

var conveter;
describe("Bse 62 Converter", () => {

  before(() => {
    console.log(Base62Converter);
    conveter =  new Base62Converter();
  });

  for ( var b10 in testNums) {
    var b62 = testNums[b10];

    describe("Encoding", () => {
      it("Should match the right base62", () => {
        assert.equal(conveter.Encode(b10), b62);
      })
    });

    describe("Decoding", () => {
      it("Should match the right base10", () => {
        assert.equal(conveter.Decode(b62), b10);
      })
    });

  }

});