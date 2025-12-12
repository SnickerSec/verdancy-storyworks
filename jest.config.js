module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['server.js'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
