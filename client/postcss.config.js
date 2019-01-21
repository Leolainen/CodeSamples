const blue = "#17b1e7";
const yellow = "#f2d011";
const red = "#f84443";
const pink = "#ff8988";

const globals = {
  "g-blue": blue,
  "g-yellow": yellow,
  "g-red": red,
  "g-pink": pink
};

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
