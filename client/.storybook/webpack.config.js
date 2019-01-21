const nextConfig = require("../next.config");

module.exports = storybookBaseConfig =>
  nextConfig("storybook").webpack(storybookBaseConfig, {
    dir: ".",
    dev: true,
    isServer: false,
    buildId: "storybook-build-id",
    config: storybookBaseConfig,
    defaultLoaders: {},
    totalPages: 1,
    isStorybook: true
  });
