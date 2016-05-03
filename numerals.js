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
  // For each symbol, starting with the largest value
  symbols
    .sort(function(a, b) { return b.value - a.value })
    .some(function(symbol) {

      // Can we use this to get towards our value?
      if(symbol.value <= input) {

        // Add the symbol to the result and stop iterating
        result += symbol.symbol;
        input -= symbol.value;
        return true;

      } else {

        // Does this symbol have a subtractor that we can use?
        return symbols
          .filter(function(subtractor) {
            return subtractor.canSubtractFrom
              && subtractor.canSubtractFrom.indexOf(symbol.symbol) >= 0
              && (symbol.value - subtractor.value) <= input
          })
          // Unnecessary at present because each symbol can only have one subtractor
          // but it's nice to keep things generic
          .sort(function(a, b) {
            return (symbol.value - b.value) - (symbol.value - a.value)
          })
          .some(function(subtractor) {
            // Add the subtractor and symbol to the result and stop iterating
            result += subtractor.symbol + symbol.symbol;
            input -= symbol.value - subtractor.value;
            return true;
          });
      }
    });

  // Have we reached our value?
  if(input == 0) {
    return result;
  } else {
    return generator(input, result);
  }
};

exports.parse = function(input) {
  var result = parser(input, []);

  if(result < min || result > max) {
    throw "Numeral value out of range";
  }

  return result;
};

var parser = function(input, result) {

  // Find the symbol entry
  var symbol = symbols.filter(function(symbol) {
    return symbol.symbol == input[0];
  })[0];

  if(!symbol) {
    throw "Invalid symbol '" + input[0] + "' found"
  }

  // Check whether this is an instance of subtractive notation
  if(symbol.canSubtractFrom && symbol.canSubtractFrom.indexOf(input[1]) >= 0) {
    // Calculate the value of both
    var subtractee = symbols.filter(function(symbol) {
      return symbol.symbol == input[1];
    })[0];
    result.push(subtractee.value - symbol.value);
    input = input.substring(2);
  } else {
    // Otherwise just process the single symbol
    result.push(symbol.value);
    input = input.substring(1);
  }

  if(result[result.length - 1] > result[result.length - 2]) {
    throw "Invalid numeral input";
  }

  // Have we processed the whole string?
  if(input == "") {
    // Sum the results array
    return result.reduce(function(a, b) {
      return a + b;
    });
  } else {
    return parser(input, result);
  }
};
