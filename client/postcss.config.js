const black = "#2e2e2e";
const blue = "#17b1e7";
const softBlue = "#3e77f1";
const yellow = "#f2d011";
const red = "#f84443";
const pink = "#ff8988";

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
  "g-softBlue": softBlue,
  "g-blue": blue,
  "g-yellow": yellow,
  "g-red": red,
  "g-pink": pink,

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
  desktopHugeUp: minWidth(deviceMaxWidths.desktopBig)
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
    "postcss-nested": { preserveEmpty: true },
    "postcss-simple-vars": { variables: globals },
    "postcss-calc": { preserve: true },
    autoprefixer: {},
    cssnano: {}
  }
};
