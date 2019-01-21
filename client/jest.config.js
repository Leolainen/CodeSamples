module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  setupTestFrameworkScriptFile: "<rootDir>/setupTests.js"
};
