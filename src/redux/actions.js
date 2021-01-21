export const resizeScreen = (pageWidth) => ({ type: "RESIZE_SCREEN", payload: pageWidth })

// update user info and token on sign up, sign in, and user update
export const updateUserInfo = (userInfo) => ({ type: "UPDATE_USER_INFO", payload: userInfo })

// handle logout
export const logout = () => ({ type: "LOGOUT" })

// get user using token from local storage when Home component mounts
export const getUser = () => {
    return function (dispatch) {
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

// add new recipe when submitting recipe form
// export const addNewRecipe = (recipe) => ({ type: "ADD_NEW_RECIPE", payload: recipe})
export const addNewRecipe = (recipe, tags, user_id) => {
    return function (dispatch) {
        fetch('http://localhost:3000/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user_id, recipe, tags })
        })
        .then(res => res.json())
        .then(rec => dispatch({ type: "ADD_NEW_RECIPE", payload: rec}))
    }
}

// edit a recipe
export const editRecipe = (recipe, tags, recipeId) => {
    return function (dispatch) {
        fetch('http://localhost:3000/recipes/' + recipeId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ recipe, tags })
        })
        .then(res => res.json())
        .then(rec => dispatch({ type: "EDIT_RECIPE", payload: { id: recipeId, recipe: rec.recipe, tags: rec.tags }}))
    }
}

export const deleteRecipe = (id) => {
    return function (dispatch) {
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

// select which view to render for userPage
export const setUserPage = (page) => ({ type: "SET_USER_PAGE", payload: page })

// select which view to render for Recipes tab
export const setRecipesPage = (page) => ({ type: "SET_RECIPES_PAGE", payload: page})

// select which view to render for Favorites tab
export const setFavoritesPage = (page) => ({ type: "SET_FAVORITES_PAGE", payload: page})

// select which view to render when entering search term
export const setSearchPage = (page) => ({ type: "SET_SEARCH_PAGE", payload: page })

// get all recipes when allRecipesPage mounts
export const getRecipes = (type, userId) => {
    return function (dispatch) {
        let resource
        if (type === "recipes") {
            resource = 'http://localhost:3000/recipes'
        }
        else if (type === "favorites") {
            resource = 'http://localhost:3000/users/' + userId + '/like_recipes'
        }
        fetch(resource)
        .then(res => res.json())
        .then(recipes => dispatch({ type: "GET_RECIPES", payload: recipes }))   
    }
}

export const getTagRecipes = (tagName) => {
    return function (dispatch) {
        fetch('http://localhost:3000/tags/' + tagName + '/tag_recipes')
        .then(res => res.json())
        .then(recipes => dispatch({ type: "GET_RECIPES", payload: recipes}))
    }
}

// favorite recipes
export const favorite = (recipe_id, user_id) => {
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
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