import { combineReducers } from 'redux';

const initialState = {
    user: null,
    token: null,
    recipes: [],

    userPage: "profile",
    currentUser: null,
    currentRecipe: null
}

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
            const recipes = action.payload.user.recipes.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), tags: rec.tags}
            })
            return recipes
        case "ADD_NEW_RECIPE":
            return [...state, { id: action.payload.id, ...JSON.parse(action.payload.recipe), tags: action.payload.tags}]
        case "EDIT_RECIPE":
            const editedRecipes = [...state]
            const i = editedRecipes.findIndex(rec => rec.id === action.payload.id)
            editedRecipes[i] = {id: action.payload.id, ...JSON.parse(action.payload.recipe), tags: action.payload.tags}
            return editedRecipes
        case "DELETE_RECIPE":
            const updatedRecipes = [...state]
            const j = updatedRecipes.findIndex(rec => rec.id === action.payload)
            updatedRecipes.splice(j, 1)
            return updatedRecipes
        default: 
            return state
    }
}

function userPageReducer(state = initialState.userPage, action) {
    switch (action.type) {
        case "SET_USER_PAGE":
            return action.payload
        default:
            return state
    }
}

function currentRecipeReducer(state = initialState.currentRecipe, action) {
    switch (action.type) {
        case "SET_CURRENT_RECIPE":
            return action.payload
        case "EDIT_RECIPE":
            return {id: action.payload.id, ...JSON.parse(action.payload.recipe), tags: action.payload.tags}
        case "DELETE_RECIPE":
            return null
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    recipes: recipesReducer,
    userPage: userPageReducer,
    currentRecipe: currentRecipeReducer
})


export default rootReducer
