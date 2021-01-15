const initialState = {
    user: null,
    token: null,
    openMenu: false,
}

export default function appReducer(state = initialState, action) {
    console.log(action.type, action.payload);
    switch (action.type) {
        case "TOGGLE_MENU":
            console.log({ ...state, openMenu: action.payload })
            return { ...state, openMenu: action.payload }
        case "UPDATE_USER_INFO":
            console.log(action.payload)
            return action.payload.token ?
            { ...state, user: action.payload.user, token: action.payload.token } :
            { ...state, user: action.payload.user }
        case "LOGOUT":
            return {...initialState}
        default:
            return state
    }
}