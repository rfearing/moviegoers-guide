require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const aliases = require('./aliases');

module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[local]___[hash:base64:10]',
  },
  // Will be available on both server and client as process.env.<the thing>
  env: {
    MOVIE_ACCESS_TOKEN: process.env.MOVIE_ACCESS_TOKEN,
  },
  webpack: (config, { isServer }) => {
    const newConfig = { ...config };
    newConfig.module.rules = [
      ...newConfig.module.rules,
      // this allows us to have mixins and variables in every .scss file
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./base/scss/mixins.scss', './base/scss/variables.scss'],
            },
          },
        ],
      },
    ];
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      newConfig.node = {
        fs: 'empty',
      };
    }

    newConfig.resolve.alias = {
      ...config.resolve.alias,
      ...aliases.absoluteAliases,
    };
    return newConfig;
  },
}));
