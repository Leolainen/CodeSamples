import PropTypes from "prop-types";
import React, { useReducer } from "react";

import reducer from "./reducer";

export const Context = React.createContext();

export class Provider extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = {
    wasClicked: false,
    dispatch: action => {
      this.setState(state => reducer(state, action));
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