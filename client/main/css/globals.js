import config from "../../postcss.config";

// This allows you to use CSS globals in JS.
export default config().plugins["postcss-simple-vars"].variables;
