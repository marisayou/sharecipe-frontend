import { combineReducers } from 'redux';

const initialState = {
    screenWidth: window.screen.width,

    // states specific to the user
    user: null,
    token: null,
    subscriptions: [], // users that the logged in user is subscribed to
    favorites: [], // ids of favorited recipes

    recipes: [],

    menuPage: null,
    homePage: null,
    // determines which view to render when on profile tab
    userPage: null,
    // determines which view to render when on favorites tab
    favoritesPage: null,
    // determines which view to render when on recipes tab
    allRecipesPage: null,
    // determines which view to render when in search
    searchPage: null,

    currentRecipe: null,
    currentTag: null,
    currentUser: null,
    
    searchTerm: null,
    searchTags: [],  
}

const rootReducer = combineReducers({
    screenWidth: screenWidthReducer,
    user: userReducer,
    token: tokenReducer,
    subscriptions: subscriptionsReducer,
    favorites: favoritesReducer,
    menuPage: menuPageReducer,
    userPage: userPageReducer,
    currentRecipe: currentRecipeReducer,
    currentUser: currentUserReducer,
    currentTag: currentTagReducer,
    recipes: recipesReducer,
    allRecipesPage: allRecipesPageReducer,
    favoritesPage: favoritesPageReducer,
    homePage: homePageReducer,
    searchPage: searchPageReducer,
    searchTerm: searchTermReducer,
    searchTags: searchTagsReducer
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
                username: action.payload.user.username,
                subscribers: action.payload.user.subscriber_counts
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

function subscriptionsReducer(state = initialState.subscriptions, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            return action.payload.user.subscriptions
        default:
            return state
    }
}

function recipesReducer(state = initialState.recipes, action) {
    switch (action.type) {
        case "GET_USER_RECIPES":
            console.log(action.payload)
            return action.payload.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), comments: rec.comments, tags: rec.tags, user: rec.user}
            })
        case "DELETE_RECIPE":
            const updatedRecipes = [...state]
            const i = updatedRecipes.findIndex(rec => rec.id === action.payload)
            updatedRecipes.splice(i, 1)
            return updatedRecipes
        case "GET_RECIPES":
            const recipes = action.payload.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), comments: rec.comments, tags: rec.tags, user: rec.user}
            })
            return recipes
        case "GET_SEARCH_RESULTS":
            const search_recipes = action.payload.recipes.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), comments: rec.comments, tags: rec.tags, user: rec.user}
            })
            return search_recipes
        case "SET_CURRENT_USER":
            const user_recipes = action.payload.recipes.map(rec => {
                return {id: rec.id, ...JSON.parse(rec.recipe), comments: rec.comments, tags: rec.tags, user: rec.user}
            })
            return user_recipes
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

function homePageReducer(state = initialState.homePage, action) {
    switch (action.type) {
        case "SET_HOME_PAGE":
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
        case "ADD_NEW_RECIPE":
            return action.payload.page
        case "EDIT_RECIPE":
            return action.payload.page
        case "LOGOUT":
            return null
        default:
            return state
    }
}

function currentUserReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            return { 
                id: action.payload.user.id,
                name: action.payload.user.name, 
                username: action.payload.user.username,
                subscribers: action.payload.user.subscriber_count
            }
        case "SET_CURRENT_USER":
            console.log(action.payload.user)
            return { 
                id: action.payload.user.id,
                name: action.payload.user.name, 
                username: action.payload.user.username,
                subscribers: action.payload.user.subscriber_count
            }
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
        case "ADD_NEW_RECIPE":
            return {id: action.payload.recipe.id, ...JSON.parse(action.payload.recipe.recipe), comments: action.payload.recipe.comments, tags: action.payload.recipe.tags}
        case "EDIT_RECIPE":
            return {id: action.payload.recipe.id, ...JSON.parse(action.payload.recipe.recipe), comments: action.payload.recipe.comments, tags: action.payload.recipe.tags}
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

function allRecipesPageReducer(state = initialState.allRecipesPage, action) {
    switch (action.type) {
        case "SET_RECIPES_PAGE":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

function favoritesPageReducer(state = initialState.favoritesPage, action) {
    switch (action.type) {
        case "SET_FAVORITES_PAGE":
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}

function searchPageReducer(state = initialState.searchPage, action) {
    switch (action.type) {
        case "SET_SEARCH_PAGE":
            return action.payload
        default:
            return state
    }
}

function searchTermReducer(state = initialState.searchTerm, action) {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            console.log(action.payload)
            return action.payload
        default: 
            return state
    }
}

function searchTagsReducer(state = initialState.searchTags, action) {
    switch (action.type) {
        case "GET_SEARCH_RESULTS":
            return action.payload.tags
        default:
            return state
    }
}


export default rootReducer
