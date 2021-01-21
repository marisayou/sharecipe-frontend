import { combineReducers } from 'redux';

const initialState = {
    screenWidth: window.screen.width,

    // states specific to the user
    user: null,
    token: null,
    myRecipes: [],
    favorites: [], // ids of favorited recipes

    currentRecipe: null,
    currentTag: null,
    currentUser: null,

    recipes: [],

    menuPage: null,
    // determines which view to render when on profile tab
    userPage: null,
    // determines which view to render when on favorites tab
    favoritesPage: null,
    // determines which view to render when on recipes tab
    allRecipesPage: null,
    // determines which view to render when in search
    searchPage: null,
    
    searchTerm: null
}

const rootReducer = combineReducers({
    screenWidth: screenWidthReducer,
    user: userReducer,
    token: tokenReducer,
    myRecipes: myRecipesReducer,
    favorites: favoritesReducer,
    menuPage: menuPageReducer,
    userPage: userPageReducer,
    currentRecipe: currentRecipeReducer,
    currentTag: currentTagReducer,
    recipes: recipesReducer,
    allRecipesPage: allRecipesPageReducer,
    favoritesPage: favoritesPageReducer,
    searchPage: searchPageReducer,
    searchTerm: searchTermReducer
})

function screenWidthReducer(state = initialState.screenWidth, action) {
    switch (action.type) {
        case "RESIZE_SCREEN":
            return action.payload
        default:
            return state
    }
}

function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
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
                return {id: rec.id, ...JSON.parse(rec.recipe), comments: rec.comments, tags: rec.tags}
            })
            return recipes
        case "ADD_NEW_RECIPE":
            return [...state, { id: action.payload.id, ...JSON.parse(action.payload.recipe), comments: action.payload.comments, tags: action.payload.tags}]
        case "EDIT_RECIPE":
            const editedRecipes = [...state]
            const i = editedRecipes.findIndex(rec => rec.id === action.payload.id)
            editedRecipes[i] = {id: action.payload.id, ...JSON.parse(action.payload.recipe), comments: action.payload.comments, tags: action.payload.tags}
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
            return action.payload
        case "EDIT_RECIPE":
            return {id: action.payload.id, ...JSON.parse(action.payload.recipe), comments: action.payload.comments, tags: action.payload.tags}
        case "DELETE_RECIPE":
            return null
        case "ADD_COMMENT":
            return {...state, comments: [...state.comments, action.payload]}
        case "LOGOUT":
            return null
        default: 
            return state
    }
}

function currentTagReducer(state = initialState.currentTag, action) {
    switch (action.type) {
        case "SET_CURRENT_TAG":
            return action.payload
        default:
            return state
    }
}

function recipesReducer(state = initialState.recipes, action) {
    switch (action.type) {
        case "GET_RECIPES":
            const recipes = action.payload.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), comments: rec.comments, tags: rec.tags, user: rec.user}
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

function searchPageReducer(state = initialState.searchPage, action) {
    switch(action.type) {
        case "SET_SEARCH_PAGE":
            return action.payload
        default:
            return state
    }
}

function searchTermReducer(state = initialState.searchTerm, action) {
    switch(action.type) {
        case "SET_SEARCH_TERM":
            return action.payload
        default: 
            return state
    }
}

export default rootReducer
