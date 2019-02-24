export default function reducer(state, action, args) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, loggedIn: true };
    case "LOG_OUT":
      return { ...state, loggedIn: false };
    case "SET_USERNAME":
      return { ...state, username: args };
    case "SET_EMAIL":
      return { ...state, email: args };
    case "SET_QUERY":
      return { ...state, query: args };
    case "SET_MUTATION":
      return { ...state, mutation: args };
    default:
      return state;
  }
}
