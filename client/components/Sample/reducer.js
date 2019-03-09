export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_COMMENT_MODAL":
      return { ...state, commentModalIsOpen: !state.commentModalIsOpen };
    case "TOGGLE_LANGUAGE_HIGHLIGHT":
      return { ...state, languageHighlight: action.data };
    default:
      return state;
  }
}
