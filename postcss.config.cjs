const autoprefixer = require('autoprefixer');
const postcssCombineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');
const postcssPresetEnv = require('postcss-preset-env');
const postcssSortMediaQueries = require('postcss-sort-media-queries');

const config = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
    }),
    postcssCombineDuplicatedSelectors({
      // Clean up duplicated properties, but allow for conscious duplicates
      // such as fallbacks for custom properties
      removeDuplicatedValues: true,
    }),
    postcssSortMediaQueries({
      sort: 'mobile-first', // default
    }),
    autoprefixer(),
  ],
});

module.exports = config;
