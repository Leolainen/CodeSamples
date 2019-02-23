const black = "#2e2e2e";
const white = "#f8f8f8";
const blue = "#17b1e7";
const softBlue = "#3e77f1";
const yellow = "#f2d011";
const red = "#f84443";
const pink = "#ff8988";

// greyscales
const grey100 = "#ccc";
const grey500 = "#474747";
const grey700 = "#555555";
const grey800 = "#4b4b4b";
const grey900 = "#3d3d3d";

// Breakpoints.
const deviceMaxWidths = {
  mobile: 413,
  phablet: 900,
  tablet: 991,
  desktop: 1199,
  desktopBig: 1500
};

const globals = {
  "g-black": black,
  "g-white": white,
  "g-softBlue": softBlue,
  "g-blue": blue,
  "g-yellow": yellow,
  "g-red": red,
  "g-pink": pink,

  // greyscales
  "g-grey-100": grey100,
  "g-grey-500": grey500,
  "g-grey-700": grey700,
  "g-grey-800": grey800,
  "g-grey-900": grey900,

  // Font stuff.
  "g-fontSizeLarger": "1.8rem",
  "g-fontSizeSmaller": "1.6rem",
  "g-lineHeightLarger": `${27 / 18}`,
  "g-lineHeightSmaller": `${21 / 16}`,

  "g-fontFamily": [
    "Open sans",
    "-apple-system",
    "BlinkMacSystemFont",
    "Helvetica",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
    "Apple Color Emoji"
  ].join(", "),

  // font weights
  "g-light": "300",
  "g-bold": "700",

  // Common values
  "g-gutter": "20px",
  "g-animationSpeed": "200ms",

  // Breakpoints
  "g-maxWidthMobile": deviceMaxWidths.mobile,
  "g-maxWidthPhablet": deviceMaxWidths.phablet,
  "g-maxWidthTablet": deviceMaxWidths.tablet,
  "g-maxWidthDesktop": deviceMaxWidths.desktop,
  "g-maxWidthDesktopBig": deviceMaxWidths.desktopBig,

  // Usage example: `@media $mobileDown {}`.
  mobileDown: maxWidth(deviceMaxWidths.mobile),
  phabletDown: maxWidth(deviceMaxWidths.phablet),
  tabletDown: maxWidth(deviceMaxWidths.tablet),
  desktopDown: maxWidth(deviceMaxWidths.desktop),
  desktopBigDown: maxWidth(deviceMaxWidths.desktopBig),
  phabletUp: minWidth(deviceMaxWidths.mobile),
  tabletUp: minWidth(deviceMaxWidths.phablet),
  desktopUp: minWidth(deviceMaxWidths.tablet),
  desktopBigUp: minWidth(deviceMaxWidths.desktop),
  desktopHugeUp: minWidth(deviceMaxWidths.desktopBig),

  // border stuff
  "g-borderRadius-default": "4px",

  // box shadow
  "g-boxShadow-default": ""
};

function maxWidth(width) {
  return `(max-width: ${width}px)`;
}

function minWidth(width) {
  return `(min-width: ${width + 1}px)`;
}

module.exports = {
  parser: "postcss-scss",
  syntax: "postcss-scss",
  plugins: {
    "postcss-for": {},
    "postcss-nested": { preserveEmpty: true },
    "postcss-simple-vars": { variables: globals },
    "postcss-calc": { preserve: true },
    autoprefixer: {},
    cssnano: {}
  }
};
