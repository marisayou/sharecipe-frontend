export const resizeScreen = (pageWidth) => ({ type: "RESIZE_SCREEN", payload: pageWidth })

// update user info and token on sign up, sign in, and user update
export const updateUserInfo = (userInfo) => ({ type: "UPDATE_USER_INFO", payload: userInfo })

// handle logout
export const logout = () => ({ type: "LOGOUT" })

// get user using token from local storage when Home component mounts
export const getUser = () => {
    return function(dispatch) {
        fetch('http://localhost:3000/get_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => res.json())
        .then(user => dispatch({ type: "UPDATE_USER_INFO", payload: user }))
    }
}

// get logged in user's recipes in profile page
export const getUserRecipes = (id) => {
    return function(dispatch) {
        fetch('http://localhost:3000/users/' + id + '/recipes')
        .then(res => res.json())
        .then(recipes => dispatch({ type: "GET_USER_RECIPES", payload: recipes }))
    }
}

// edit a recipe
export const editRecipe = (recipe, tags, recipeId) => {
    return function(dispatch) {
        fetch('http://localhost:3000/recipes/' + recipeId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ recipe, tags })
        })
        .then(res => res.json())
        .then(rec => dispatch({ type: "EDIT_RECIPE", payload: { id: recipeId, recipe: rec.recipe, comments: rec.comments, tags: rec.tags }}))
    }
}

export const deleteRecipe = (id) => {
    return function(dispatch) {
        fetch('http://localhost:3000/recipes/' + id, { method: 'DELETE' })
        .then(() => dispatch({ type: "DELETE_RECIPE", payload: id }))
    }
}

// determine which recipe page to render using its id 
export const setCurrentRecipe = (recipe) => {
    return ({ type: "SET_CURRENT_RECIPE", payload: recipe })
}

export const setCurrentTag = (tag) => {
    return ({ type: "SET_CURRENT_TAG", payload: tag})
}

// select page from side menu
export const setMenuPage = (page) => ({ type: "SET_MENU_PAGE", payload: page})

export const setHomePage = (page) => ({ type: "SET_HOME_PAGE", payload: page})

// select which view to render for userPage
export const setUserPage = (page) => ({ type: "SET_USER_PAGE", payload: page })

// select which view to render for Recipes tab
export const setRecipesPage = (page) => ({ type: "SET_RECIPES_PAGE", payload: page})

// select which view to render for Favorites tab
export const setFavoritesPage = (page) => ({ type: "SET_FAVORITES_PAGE", payload: page})

// select which view to render when entering search term
export const setSearchPage = (page) => ({ type: "SET_SEARCH_PAGE", payload: page })

// get all recipes when allRecipesPage mounts
export const getRecipes = (type, param) => {
    return function(dispatch) {
        let resource
        switch (type) {
            case "home":
                resource = 'http://localhost:3000/recipes/newest'
                break
            case "recipes":
                resource = 'http://localhost:3000/recipes'
                break
            case "favorites": // param = user id 
                resource = 'http://localhost:3000/users/' + param + '/like_recipes'
                break
            case "search": // param = search term
                resource = 'http://localhost:3000/search_recipes/' + param
                break
            default:
                return
        }
        fetch(resource)
        .then(res => res.json()) 
        .then(recipes => dispatch({ type: "GET_RECIPES", payload: recipes }))   
    }
}

// when a tag is clicked, get recipes that have that tag
export const getTagRecipes = (tagName) => {
    return function(dispatch) {
        fetch('http://localhost:3000/tags/' + tagName + '/tag_recipes')
        .then(res => res.json())
        .then(recipes => dispatch({ type: "GET_RECIPES", payload: recipes}))
    }
}

// favorite recipes
export const favorite = (recipe_id, user_id) => {
    return function(dispatch) {
        fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ recipe_id, user_id })
        })
        .then(() => dispatch({ type: "FAVORITE", payload: recipe_id }))
    }   
}

// unfavorite recipes
export const unfavorite = (recipe_id, user_id) => {
    return function(dispatch) {
        fetch('http://localhost:3000/likes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ recipe_id, user_id })
        })
        .then(() => dispatch({ type: "UNFAVORITE", payload: recipe_id }))
    }
}

// add a comment to a recipe
export const addComment = (user_id, recipe_id, text) => {
    return function(dispatch) {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user_id, recipe_id, text })
        })
        .then(res => res.json())
        .then(comment => dispatch({ type: "ADD_COMMENT", payload: comment}))
    }
}

// set search term
export const setSearchTerm = (searchTerm) => ({ type: "SET_SEARCH_TERM", payload: searchTerm })

// get tags that contain the search term
export const getSearchTags = (searchTerm) => {
    return function(dispatch) {
        fetch('http://localhost:3000/search_tags/' + searchTerm)
        .then(res => res.json())
        .then(tags => dispatch({ 
            type: "GET_SEARCH_TAGS", 
            payload: tags.filter(tag => tag.recipes.length !== 0) 
        }))
    }
}

// get recipes whose titles contain the search term
export const getSearchRecipes = (searchTerm) => {
    return function(dispatch) {
        fetch('http://localhost:3000/search_recipes/' + searchTerm)
        .then(res => res.json())
        .then(recipes => dispatch({ 
            type: "GET_SEARCH_RECIPES", 
            payload: recipes
        }))
    }
}