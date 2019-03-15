export default function reducer(state, action, args) {
  switch (action.type) {
    case "LOGGED_IN":
      return { ...state, loggedIn: true, me: args };
    case "LOGGED_OUT":
      return { ...state, loggedIn: false, me: {} };
    case "SET_QUERY":
      return { ...state, query: args };
    case "SET_MUTATION":
      return { ...state, mutation: args };
    default:
      return state;
  }
}
