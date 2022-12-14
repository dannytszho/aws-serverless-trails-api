module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,js}", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 80,
      function: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverage: true,
};
