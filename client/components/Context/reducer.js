export default function reducer(state, action, args) {
  switch (action.type) {
    case "LOGGED_IN":
      return { ...state, loggedIn: true, me: args };
    case "LOGGED_OUT":
      return { ...state, loggedIn: false, me: {} };
    case "USER_IS_LOGGED_IN":
      return { ...state, user: args };
    case "USER_IS_LOGGED_OUT":
      return { ...state, user: null };
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
