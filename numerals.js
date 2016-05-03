var symbols = [
  {
    symbol: "I",
    value: 1,
    canSubtractFrom: [
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
    canSubtractFrom: [
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
    canSubtractFrom: [
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
            return subtractor.canSubtractFrom
              && subtractor.canSubtractFrom.includes(symbol.symbol)
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

exports.parse = function(input) {
  var result = parser(input, 0);

  if(result < min || result > max) {
    throw "Numeral value out of range";
  }

  return result;
};

var parser = function(input, result) {
  var symbol = symbols.filter(function(symbol) {
    return symbol.symbol == input[0];
  })[0];

  if(!symbol) {
    throw "Invalid symbol '" + input[0] + "' found"
  }

  if(symbol.canSubtractFrom && symbol.canSubtractFrom.includes(input[1])) {
    var subtractee = symbols.filter(function(symbol) {
      return symbol.symbol == input[1];
    })[0];
    result += subtractee.value - symbol.value;
    input = input.substring(2);
  } else {
    result += symbol.value;
    input = input.substring(1);
  }

  if(input == "") {
    return result;
  } else {
    return parser(input, result);
  }
};
