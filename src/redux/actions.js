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
