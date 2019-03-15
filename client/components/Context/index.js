import PropTypes from "prop-types";
import React from "react";

import reducer from "./reducer";

export const Context = React.createContext();

export class Provider extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = {
    loggedIn: false,
    me: {},
    query: {},
    mutation: {},
    dispatch: (action, args) => {
      this.setState(state => reducer(state, action, args));
    }
  };
  /* eslint-enable react/no-unused-state */

  static propTypes = {
    children: PropTypes.PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return <Context.Provider value={this.state}>{children}</Context.Provider>;
  }
}
