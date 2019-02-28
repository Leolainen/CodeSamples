import PropTypes from "prop-types";
import React from "react";

import reducer from "./reducer";

export const Context = React.createContext();

export class Provider extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  /* eslint-disable react/no-unused-state */
  state = {
    loggedIn: false,
    me: null,
    username: "",
    email: "",
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

// Provider.propTypes = {
//   children: PropTypes.node.isRequired
// };

// export function Provider({ children }) {
//   const initialState = {
//     wasClicked: false
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   return <Context.Provider value={state}>{children}</Context.Provider>;
// }
