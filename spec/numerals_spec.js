describe("numerals", function() {
  var numerals = require("../numerals");

  describe(".generate", function() {
    it("is exported", function() {
      expect(typeof numerals.generate).toBe("function");
    });

    it("should convert valid integers", function() {
      expect(numerals.generate(1)).toBe("I");
      expect(numerals.generate(4)).toBe("IV");
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
    });
  });

  describe(".parse", function() {
    it("is exported", function() {
      expect(typeof numerals.generate).toBe("function");
    });

    it("should convert valid numerals", function() {
      expect(numerals.parse("I")).toBe(1);
      expect(numerals.parse("IV")).toBe(4);
      expect(numerals.parse("V")).toBe(5);
      expect(numerals.parse("VIII")).toBe(8);
      expect(numerals.parse("CLXXXII")).toBe(182);
      expect(numerals.parse("MCMLIV")).toBe(1954);
      expect(numerals.parse("MMMCMXCIX")).toBe(3999);
    });

    it("should not accept out of range numerals", function() {
      expect(numerals.parse("MMMM")).toThrow();
      expect(numerals.parse("MMMMDCCCXXIII")).toThrow();
    });

    it("should not accept invalid numerals", function() {
      expect(numerals.parse("IXC")).toThrow();
      expect(numerals.parse("XCX")).toThrow();
      expect(numerals.parse("IIVVMM")).toThrow();
    });

    it("should not accept non-numeral strings", function() {
      expect(numerals.parse("Alex")).toThrow();
      expect(numerals.parse("B")).toThrow();
      expect(numerals.parse("🐳")).toThrow();
    });

    it("should not accept non-strings", function() {
      expect(numerals.parse(true)).toThrow();
      expect(numerals.parse(null)).toThrow();
      expect(numerals.parse(62)).toThrow();
      expect(numerals.parse(13.2)).toThrow();
    })
  });
});
