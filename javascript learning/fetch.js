// JSONPlaceholder is a free fake API for practice: https://jsonplaceholder.typicode.com

// Write an async function called loadUser. Inside it:
//   1. await fetch the URL https://jsonplaceholder.typicode.com/users/2
//   2. await response.json() to parse the body into a user object
//   3. print the user's name
// Then call loadUser() on its own line below the function.
//   Expected: Ervin Howell

async function loadUser(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users/2")
    const user = await response.json()
    console.log(user.name)
}

loadUser()