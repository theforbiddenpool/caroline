const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  clearMocks: true,
  coverageDirectory: '.coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
