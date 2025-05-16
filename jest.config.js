const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // กำหนดเส้นทางไปยัง Next.js app
  dir: './',
});

// ค่าการกำหนดค่า Jest ที่กำหนดเอง
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', 
    '<rootDir>/.next/'
  ],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

// createJestConfig มาจาก next/jest ที่จะทำการ merge
// ค่าการกำหนดค่า Next.js และค่าการกำหนดค่า Jest ที่กำหนดเองข้างต้น
module.exports = createJestConfig(customJestConfig); 