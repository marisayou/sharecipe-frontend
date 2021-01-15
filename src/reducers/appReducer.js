const initialState = {
    page: null,
    user: null,
    token: null,
    name: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    openMenu: false,
}

export default function appReducer(state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
        case "TOGGLE_MENU":
            console.log({ ...state, openMenu: action.payload })
            return { ...state, openMenu: action.payload }
        case "RENDER_PAGE":
            console.log({ ...state, page: action.payload })
            return { ...state, page: action.payload }
        case "HANDLE_INPUT_CHANGE":
            console.log({ ...state, [action.payload.inputField]: action.payload.value })
            return { ...state, [action.payload.inputField]: action.payload.value }
        case "UPDATE_USER_INFO":
            console.log(action.payload)
            return action.payload.token ?
            { ...state, user: action.payload.user, token: action.payload.token, name: action.payload.user.name, password: "", passwordConfirmation: "" } :
            { ...state, user: action.payload.user, name: action.payload.user.name, password: "", passwordConfirmation: "" }
        default:
            return state
    }
}