import React from "react";
// import brace from "brace";

// import "brace/mode/java";
// import "brace/theme/github";

export default function Editor({ ...rest }) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-undef
    const Ace = require("react-ace").default;
    // require("brace/mode/javascript");
    // require("brace/theme/github");

    return <Ace {...rest} />;
  }

  return null;
}
