module.exports = {
  extends: ["stylelint-config-recommended"],
  rules: {
    // Avoid complicated CSS quoting.
    "font-family-name-quotes": "always-unless-keyword",
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",

    // Disallow vendor prefixes since we use Autoprefixer.
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,

    // CSS Modules support.
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] }
    ],
    "property-no-unknown": [true, { ignoreProperties: ["composes"] }],

    // Extra.
    "length-zero-no-unit": true,
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "selector-pseudo-element-colon-notation": "double"
  }
};
