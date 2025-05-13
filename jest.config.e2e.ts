export default {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist"],
  testMatch: ["**/__tests__/*.e2e.ts"],
};
