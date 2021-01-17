import { combineReducers } from 'redux';

const initialState = {
    user: null,
    token: null,
    recipes: []
}

// const rootReducer = (state = initialState, action) => {
//     console.log(action.type, action.payload);
//     switch (action.type) {
//         case "TOGGLE_MENU":
//             console.log({ ...state, openMenu: action.payload })
//             return { ...state, openMenu: action.payload }
//         case "UPDATE_USER_INFO":
//             console.log(action.payload)
//             return action.payload.token ?
//             { ...state, user: action.payload.user, token: action.payload.token } :
//             { ...state, user: action.payload.user }
//         case "LOGOUT":
//             return {...initialState}
//         default:
//             return state
//     }
// }

function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            return { 
                id: action.payload.user.id,
                name: action.payload.user.name, 
                username: action.payload.user.username,
                likeCount: action.payload.user.like_count
            }
        case "LOGOUT":
            return null
        default:
            return state
    }
}

function tokenReducer(state = initialState.token, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            return action.payload.token ? action.payload.token : state
        case "LOGOUT":
            return null
        default: 
            return state
    }
}

function recipesReducer(state = initialState.recipes, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            const recipes = action.payload.user.recipes.map(rec => JSON.parse(rec.recipe))
            return recipes
        case "ADD_NEW_RECIPE":
            return [...state, JSON.parse(action.payload)]
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    recipes: recipesReducer
})


export default rootReducer
