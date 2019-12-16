/* you can run "yarn stylelint-find-rules" to find stylelint rules that are not unused, deprecated or invalid */
const path = require('path'),
  root = path.resolve(__dirname, '../../')

module.exports = {
  extends: [
    // "stylelint-config-recommended-scss",
    // "stylelint-config-standard",
    // "stylelint-config-prettier"
  ],
  plugins: [
    // "stylelint-scss",
    // "stylelint-order",
    // "stylelint-declaration-block-no-ignored-properties",
    // 'stylelint-no-indistinguishable-colors', //need will check
    // "stylelint-high-performance-animation",
    // "stylelint-no-unsupported-browser-features",
    // "stylelint-color-format",
    // 'stylelint-declaration-use-variable',
    // 'stylelint-group-selectors', // only easy cases :(
    // "stylelint-at-rule-no-children"
  ],
  rules: {
    // "plugin/declaration-block-no-ignored-properties": true,
    // 'plugin/stylelint-no-indistinguishable-colors': true,
    /* "plugin/no-low-performance-animation-properties": [
      true,
      { ignoreProperties: ["color", "background-color", "border-color"] }
    ],*/
    /*"plugin/no-unsupported-browser-features": [
      true,
      {
        browsers: require(`${root}/package.json`).browserslist,
        severity: "warning"
      }
    ],*/
    // "color-format/format": { format: "hsl" },
    /*'sh-waqar/declaration-use-variable': [
      ['/color/', 'font-size' /!*"z-index"*!/, { ignoreValues: ['inherit', 'transparent', 'currentColor'] }],
    ],*/
    // 'plugin/stylelint-group-selectors': true,
    // "aditayvm/at-rule-no-children": [{ severity: "warning" }],
    /*"order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "at-rules",
      "rules"
    ],*/
    // "order/properties-alphabetical-order": true,
    // "selector-type-no-unknown": [true, { ignore: ["custom-elements"] }],
    // 'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$', //lowerCamelCase, TODO: need exclude another's classes
    // "block-no-empty": null,
    // "at-rule-no-unknown": null,
    // 'scss/at-rule-no-unknown': true,
    // "max-nesting-depth": null,
    // 'scss/dollar-variable-pattern': null,
    // "no-descending-specificity": null,
    // "no-missing-end-of-source-newline": null,
    // "comment-empty-line-before": null,
    // "comment-whitespace-inside": null
  },
}
