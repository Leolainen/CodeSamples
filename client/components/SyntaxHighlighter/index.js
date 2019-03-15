import PropTypes from "prop-types";
import React from "react";
import dynamic from "next/dynamic";

import Spinner from "../Spinner";

const SyntaxHighlighter = dynamic({
  ssr: false,
  modules: () => {
    const components = {
      Highlighter: () =>
        import("react-syntax-highlighter").then(
          highlighter => highlighter.Prism
        ),
      AtomDark: () =>
        import("react-syntax-highlighter/dist/esm/styles/prism").then(
          style => style.atomDark
        )
    };

    return components;
  },
  loading: () => <Spinner />,
  /* eslint-disable react/prop-types */
  render: (props, { Highlighter, AtomDark }) => (
    <Highlighter showLineNumbers language={props.language} style={AtomDark}>
      {props.children}
    </Highlighter>
  )
  /* eslint-enable */
});

SyntaxHighlighter.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default SyntaxHighlighter;
