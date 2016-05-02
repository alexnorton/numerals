var symbols = [
  {
    symbol: "I",
    value: 1,
    canPrepend: [
      "V", "X"
    ]
  },
  {
    symbol: "V",
    value: 5
  },
  {
    symbol: "X",
    value: 10,
    canPrepend: [
      "L", "C"
    ]
  },
  {
    symbol: "L",
    value: 50
  },
  {
    symbol: "C",
    value: 100,
    canPrepend: [
      "D", "M"
    ]
  },
  {
    symbol: "D",
    value: 500
  },
  {
    symbol: "M",
    value: 1000
  }
];

var min = 1;
var max = 3999;

exports.generate = function(input) {
  if((input | 0) !== input) {
    throw "Invalid input type"
  }

  if(input < min || input > max) {
    throw "Input out of range"
  }

  return generator(input, "");
};

var generator = function(input, result) {
  symbols
    .sort(function(a, b) { return b.value - a.value })
    .some(function(symbol, index, array) {
      if(symbol.value <= input) {
        result += symbol.symbol;
        input -= symbol.value;
        return true;
      } else {
        return symbols
          .filter(function(subtractor) {
            return subtractor.canPrepend
              && subtractor.canPrepend.includes(symbol.symbol)
              && (symbol.value - subtractor.value) <= input
          })
          .sort(function(a, b) {
            return (symbol.value - b.value) - (symbol.value - a.value)
          })
          .some(function(subtractor) {
            result += subtractor.symbol + symbol.symbol;
            input -= symbol.value - subtractor.value;
            return true;
          });
      }
    });

  if(input == 0) {
    return result;
  } else {
    return generator(input, result);
  }
};

exports.parse = function() {};
