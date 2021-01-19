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


// select which view to render for userPage
export const setUserPage = (page) => ({ type: "SET_USER_PAGE", payload: page })