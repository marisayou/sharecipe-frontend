import { combineReducers } from 'redux';

const initialState = {
    // states specific to the user
    user: null,
    token: null,
    myRecipes: [],
    favorites: [], // ids of favorite recipes

    currentRecipe: null,

    // determines which view to render when on profile tab
    userPage: null,
    // determines which view to render when on favorites tab
    favoritesPage: null,
    // determines which view to render when on recipes tab
    allRecipesPage: null,
    recipes: [],

    currentUser: null,

    menuPage: null

}

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    myRecipes: myRecipesReducer,
    favorites: favoritesReducer,
    menuPage: menuPageReducer,
    userPage: userPageReducer,
    currentRecipe: currentRecipeReducer,
    recipes: recipesReducer,
    allRecipesPage: allRecipesPageReducer,
    favoritesPage: favoritesPageReducer
})

function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            console.log(action.payload)
            return { 
                id: action.payload.user.id,
                name: action.payload.user.name, 
                username: action.payload.user.username
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

function myRecipesReducer(state = initialState.myRecipes, action) {
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
        case "LOGOUT":
            return []
        default: 
            return state
    }
}

function favoritesReducer(state = initialState.favorites, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            return action.payload.user.favorites
        case "FAVORITE":
            return [...state, action.payload]
        case "UNFAVORITE":
            return state.filter(recId => recId !== action.payload)
        default:
            return state
    }
}

function menuPageReducer(state = initialState.menuPage, action) {
    switch (action.type) {
        case "SET_MENU_PAGE":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

function userPageReducer(state = initialState.userPage, action) {
    switch (action.type) {
        case "SET_USER_PAGE":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

function currentRecipeReducer(state = initialState.currentRecipe, action) {
    switch (action.type) {
        case "SET_CURRENT_RECIPE":
            console.log(action.payload)
            return action.payload
        case "EDIT_RECIPE":
            return {id: action.payload.id, ...JSON.parse(action.payload.recipe), tags: action.payload.tags}
        case "DELETE_RECIPE":
            return null
        case "LOGOUT":
            return null
        default: 
            return state
    }
}

function recipesReducer(state = initialState.recipes, action) {
    switch (action.type) {
        case "GET_RECIPES":
            const recipes = action.payload.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), tags: rec.tags, user: rec.user}
            })
            return recipes
        case "LOGOUT":
            return []
        default: 
            return state
    }
} 

function allRecipesPageReducer(state = initialState.allRecipesPage, action) {
    switch(action.type) {
        case "SET_RECIPES_PAGE":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

function favoritesPageReducer(state = initialState.favoritesPage, action) {
    switch(action.type) {
        case "SET_FAVORITES_PAGE":
            return action.payload
        default:
            return state
    }
}

export default rootReducer
