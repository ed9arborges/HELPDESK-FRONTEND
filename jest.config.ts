import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^../utils/get-avatar-url$": "<rootDir>/src/__mocks__/get-avatar-url.ts",
    "^./utils/get-avatar-url$": "<rootDir>/src/__mocks__/get-avatar-url.ts",
    // Special-case Vite SVG import style: @assets/...svg?react -> mock as React component
    "^@assets/(.*)\\.svg\\?react$": "<rootDir>/__mocks__/svgMock.js",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@core-components/(.*)$": "<rootDir>/src/core-components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@tests/(.*)$": "<rootDir>/src/__tests__/$1",
    "\\.svg\\?react$": "<rootDir>/__mocks__/svgMock.js",
    // Generic mapping for get-avatar-url (matches relative imports like ../utils/get-avatar-url)
    "(^|.*/)(get-avatar-url)(\\.(ts|tsx))?$":
      "<rootDir>/src/__mocks__/get-avatar-url.ts",
    // Mock Vite-specific util that uses import.meta so ts-jest doesn't need to compile it
    "^@/utils/get-avatar-url$": "<rootDir>/src/__mocks__/get-avatar-url.ts",
    "^src/utils/get-avatar-url$": "<rootDir>/src/__mocks__/get-avatar-url.ts",
  },
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
}

export default config
