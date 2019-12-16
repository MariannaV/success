const path = require('path'),
  root = path.resolve(__dirname, '../')

module.exports = {
  plugins: [
    // require("postcss-extend-rule")(),
    require('postcss-advanced-variables')(),
    require('postcss-preset-env')({
      stage: 1,
      preserve: true,
      autoprefixer: {
        grid: 'autoplace',
      },
    }),
    // require("postcss-atroot")(),
    require('postcss-property-lookup')(),
    require('postcss-nested')({ preserveEmpty: true }),
    require('postcss-custom-media')(),
    require('postcss-color-function')(),
    require('postcss-selector-not')(),
    require('postcss-selector-matches')(),
    require('postcss-svg')({ dirs: [`${root}/src/img`], svgo: {} }),
    // require("postcss-aspect-ratio")(),
    require('postcss-line-height-px-to-unitless')(),
    require('postcss-pxtorem')({
      // propList: ["font", "font-size", "line-height", "letter-spacing"]
      rootValue: 16,
      replace: true,
      mediaQuery: false,
    }),
    require('postcss-scale')(),
    require('postcss-assets')({ loadPaths: ['img/'] }),
    require('postcss-sprites')({ spritePath: './public/img' }),
    require('css-mqpacker')({ sort: true }),
  ],
}
