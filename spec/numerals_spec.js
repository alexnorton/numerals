describe("numerals", function() {
  var numerals = require("../numerals");

  describe(".generate", function() {
    it("is exported", function() {
      expect(typeof numerals.generate).toBe("function");
    });

    it("should convert valid integers", function() {
      expect(numerals.generate(1)).toBe("I");
      expect(numerals.generate(1)).toBe("IV");
      expect(numerals.generate(5)).toBe("V");
      expect(numerals.generate(8)).toBe("VIII");
      expect(numerals.generate(182)).toBe("CLXXXII");
      expect(numerals.generate(1954)).toBe("MCMLIV");
      expect(numerals.generate(3999)).toBe("MMMCMXCIX");
    });

    it("should not accept out of range integers", function() {
      expect(numerals.generate(-1000)).toThrow();
      expect(numerals.generate(-1)).toThrow();
      expect(numerals.generate(0)).toThrow();
      expect(numerals.generate(4000)).toThrow();
      expect(numerals.generate(999999999)).toThrow();
    });

    it("should not accept non-integers", function() {
      expect(numerals.generate("Alex")).toThrow();
      expect(numerals.generate("B")).toThrow();
      expect(numerals.generate("🐳")).toThrow();
      expect(numerals.generate(true)).toThrow();
      expect(numerals.generate(false)).toThrow();
      expect(numerals.generate(null)).toThrow();
      expect(numerals.generate(12.4)).toThrow();
      expect(numerals.generate(3.14159265359)).toThrow();
      expect(numerals.generate("🐳")).toThrow();
      expect(numerals.generate(undefined)).toThrow();
    });
  });

  describe(".parse", function() {
    it("is exported", function() {
      expect(typeof numerals.generate).toBe("function");
    });
  });
});
