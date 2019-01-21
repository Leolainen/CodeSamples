const _ = require("lodash");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const cssLoaderConfig = require("@zeit/next-css/css-loader-config");

const nextConfig = {
  webpack: (passedConfig, { dev, isServer, isStorybook = false }) => {
    const config = _.merge(
      {
        // `cssLoaderConfig` expects this structure to exist, but it doesn’t in
        // Storybook.
        optimization: { splitChunks: { cacheGroups: {} }, minimizer: [] }
      },
      passedConfig
    );

    return {
      ...config,
      module: {
        ...config.module,

        rules: [
          ...config.module.rules,
          {
            test: /\.s?css$/,
            use: cssLoaderConfig(config, {
              extensions: ["scss"],
              cssModules: true,
              dev,
              isServer
            })
          },
          {
            test: /\.(jpe?g|png|svg|eot|woff2?|ttf)$/i,
            use: {
              loader: "file-loader",
              options: {
                name: "[path][name].[hash].[ext]",
                publicPath: isStorybook ? "/static" : "/_next/static",
                outputPath: "static",
                emitFile: !isServer
              }
            }
          },
          isStorybook
            ? // Storybook seems to have built-in markdown support.
              undefined
            : {
                test: /\.md$/,
                use: [
                  {
                    loader: "html-loader",
                    options: {
                      minimize: !dev
                    }
                  },
                  {
                    loader: "markdown-loader"
                  }
                ]
              }
        ].filter(Boolean)
      },
      plugins: [
        ...config.plugins,

        !isStorybook && new LodashModuleReplacementPlugin()
      ].filter(Boolean)
    };
  }
};

module.exports = phase => {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  const config = { ...nextConfig };
  return config;
};
